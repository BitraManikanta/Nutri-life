import {useEffect,useState,useRef} from 'react';
import {Upload,Trash2,Download,Search,X,FileText,Info} from 'lucide-react';
import {all,put,del} from '../lib/db.js';
const fmt=b=>b>1048576?(b/1048576).toFixed(1)+' MB':Math.ceil(b/1024)+' KB';
async function validate(f,isPdf,maxMB){
 if(f.size>maxMB*1048576)return `${f.name}: larger than ${maxMB} MB limit.`;
 if(isPdf){const h=new TextDecoder().decode(await f.slice(0,5).arrayBuffer());
  if(f.type!=='application/pdf'||h!=='%PDF-')return `${f.name}: not a valid PDF file.`;}
 else if(!['image/jpeg','image/png','image/webp','image/gif'].includes(f.type))return `${f.name}: only JPG, PNG, WEBP or GIF images are allowed.`;
 return null;}
export default function FileLibrary({store,isPdf,title,cats,maxMB}){
 const [items,setItems]=useState([]),[q,setQ]=useState(''),[cat,setCat]=useState('All'),[upCat,setUpCat]=useState(cats[0]),
 [err,setErr]=useState([]),[open,setOpen]=useState(null),[usage,setUsage]=useState(''),[urls,setUrls]=useState({}),inp=useRef();
 const load=async()=>{const l=(await all(store)).sort((a,b)=>b.date-a.date);setItems(l);
  if(navigator.storage?.estimate){const e=await navigator.storage.estimate();setUsage(`${fmt(e.usage||0)} used of ~${fmt(e.quota||0)} browser quota`)}};
 useEffect(()=>{load().catch(e=>setErr(['Storage unavailable (private mode?): '+e.message]))},[]);
 useEffect(()=>{const u={};items.forEach(i=>{u[i.id]=URL.createObjectURL(i.blob)});setUrls(u);return()=>Object.values(u).forEach(URL.revokeObjectURL)},[items]);
 const add=async files=>{const errs=[];
  for(const f of files){const m=await validate(f,isPdf,maxMB);if(m){errs.push(m);continue}
   try{await put(store,{id:crypto.randomUUID(),title:f.name.replace(/\.[^.]+$/,''),desc:'',cat:upCat,size:f.size,date:Date.now(),name:f.name,blob:f})}
   catch{errs.push(`${f.name}: could not save (storage may be full).`)}}
  setErr(errs);load()};
 const edit=async(i,k,v)=>{await put(store,{...i,[k]:v});load()};
 const list=items.filter(i=>(cat==='All'||i.cat===cat)&&(i.title+i.desc).toLowerCase().includes(q.toLowerCase()));
 return <section className="mx-auto max-w-6xl px-4 py-12">
  <h1 className="font-display text-4xl font-bold">{title}</h1>
  <p className="mt-3 flex gap-2 rounded-2xl bg-accent/15 p-4 text-sm"><Info className="shrink-0" size={18}/>Files are stored only in this browser on this device (IndexedDB). They are not uploaded to a server and other visitors cannot see them. Download files to move them elsewhere. Max {maxMB} MB per file.</p>
  <div onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();add([...e.dataTransfer.files])}} className="glass mt-6 flex flex-col items-center gap-3 border-2 border-dashed p-8 text-center">
   <Upload/><p>Drag & drop {isPdf?'PDFs':'images'} here or</p>
   <div className="flex flex-wrap justify-center gap-2"><select aria-label="Category" className="inp w-auto" value={upCat} onChange={e=>setUpCat(e.target.value)}>{cats.map(c=><option key={c}>{c}</option>)}</select>
   <button className="btn bg-emerald text-white" onClick={()=>inp.current.click()}>{isPdf?'Upload PDF':'Upload images'}</button></div>
   <input ref={inp} hidden type="file" multiple={!isPdf} accept={isPdf?'application/pdf':'image/jpeg,image/png,image/webp,image/gif'} onChange={e=>{add([...e.target.files]);e.target.value=''}}/>
   <p className="text-xs opacity-70">{usage}</p></div>
  {err.map(e=><p key={e} role="alert" className="mt-2 text-sm text-red-600">{e}</p>)}
  <div className="mt-6 flex flex-wrap gap-2"><div className="relative flex-1"><Search size={16} className="absolute left-3 top-3"/><input className="inp pl-9" placeholder="Search…" value={q} onChange={e=>setQ(e.target.value)}/></div>
   <select aria-label="Filter" className="inp w-auto" value={cat} onChange={e=>setCat(e.target.value)}>{['All',...cats].map(c=><option key={c}>{c}</option>)}</select></div>
  {!list.length&&<p className="mt-10 text-center opacity-70">Nothing here yet.</p>}
  <div className={isPdf?'mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3':'mt-6 columns-1 gap-4 sm:columns-2 lg:columns-3'}>
   {list.map(i=><div key={i.id} className="glass mb-4 break-inside-avoid overflow-hidden p-3">
    {isPdf?<FileText className="text-accent" size={36}/>:<img src={urls[i.id]} alt={i.title} onClick={()=>setOpen(i)} className="w-full cursor-zoom-in rounded-2xl transition hover:scale-[1.03]"/>}
    <input aria-label="Title" className="mt-2 w-full bg-transparent font-semibold" defaultValue={i.title} onBlur={e=>edit(i,'title',e.target.value)}/>
    <input aria-label="Description" placeholder="Add description" className="w-full bg-transparent text-sm opacity-80" defaultValue={i.desc} onBlur={e=>edit(i,'desc',e.target.value)}/>
    <p className="mt-1 text-xs opacity-70">{i.cat} · {fmt(i.size)} · {new Date(i.date).toLocaleDateString()}</p>
    <div className="mt-2 flex gap-3">
     {isPdf&&<button className="text-sm underline" onClick={()=>setOpen(i)}>Preview</button>}
     <a aria-label="Download" download={i.name} href={urls[i.id]}><Download size={18}/></a>
     <button aria-label="Delete" onClick={()=>confirm('Delete this file?')&&del(store,i.id).then(load)}><Trash2 size={18}/></button></div></div>)}
  </div>
  {open&&<div role="dialog" className="fixed inset-0 z-50 flex flex-col bg-black/90 p-4" onClick={()=>setOpen(null)}>
   <button aria-label="Close" className="self-end text-white"><X/></button>
   {isPdf?<iframe title={open.title} src={urls[open.id]} className="mt-2 flex-1 rounded-xl bg-white" onClick={e=>e.stopPropagation()}/>
   :<div className="flex-1 overflow-auto"><img src={urls[open.id]} alt={open.title} onClick={e=>{e.stopPropagation();e.currentTarget.classList.toggle('max-w-none')}} className="mx-auto max-h-full max-w-full cursor-zoom-in"/><p className="text-center text-xs text-white/70">Click image to zoom</p></div>}
  </div>}
 </section>}
