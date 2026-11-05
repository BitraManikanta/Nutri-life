import {useState} from 'react';
import {BarChart,Bar,XAxis,YAxis,Tooltip,Legend,ResponsiveContainer} from 'recharts';
// Per 100 g (raw/edible portion unless noted). APPROXIMATE values — verify against IFCT 2017 / USDA before citing.
const F=[['Ragi (finger millet)','Millets',328,7.3,72,1.3,3.6],['Jowar (sorghum)','Millets',349,10.4,72,1.9,1.6],['Bajra (pearl millet)','Millets',361,11.6,67,5,1.2],['Oats','Cereals',389,17,66,7,10],
['Moong dal','Pulses',348,24,59,1.2,4.1],['Chana dal','Pulses',372,21,60,5.3,5],['Toor dal','Pulses',343,22,63,1.5,4],['Banana','Fruits',89,1.1,23,.3,2.6],['Guava','Fruits',68,2.6,14,1,5.4],['Papaya','Fruits',43,.5,11,.3,1.7],
['Spinach (palak)','Vegetables',23,2.9,3.6,.4,2.2],['Carrot','Vegetables',41,.9,10,.2,2.8],['Curd','Dairy',61,3.5,4.7,3.3,0],['Milk (cow)','Dairy',61,3.2,4.8,3.3,0],['Egg (boiled)','Eggs',155,13,1.1,11,0],['Peanuts','Nuts',567,26,16,49,8.5],['Almonds','Nuts',579,21,22,50,12.5],['Rice (raw, white)','Cereals',360,6.8,79,.5,.6]];
export default function Foods(){const [q,setQ]=useState(''),[c,setC]=useState('All'),[cmp,setCmp]=useState([]);
 const cats=['All',...new Set(F.map(f=>f[1]))];const L=F.filter(f=>(c==='All'||f[1]===c)&&f[0].toLowerCase().includes(q.toLowerCase()));
 const data=cmp.map(n=>{const f=F.find(x=>x[0]===n);return {name:f[0],Protein:f[3],Carbs:f[4],Fat:f[5],Fibre:f[6]}});
 return <section className="mx-auto max-w-5xl px-4 py-12"><h1 className="font-display text-4xl font-bold">Indian Food Database</h1>
 <p className="mt-2 text-sm opacity-80">All values per 100 g, approximate. Select up to 2 foods to compare.</p>
 <div className="mt-4 flex gap-2"><input className="inp" placeholder="Search foods…" value={q} onChange={e=>setQ(e.target.value)}/><select aria-label="Category" className="inp w-auto" value={c} onChange={e=>setC(e.target.value)}>{cats.map(x=><option key={x}>{x}</option>)}</select></div>
 {data.length>0&&<div className="glass mt-6 h-72 p-4"><ResponsiveContainer><BarChart data={data}><XAxis dataKey="name"/><YAxis/><Tooltip/><Legend/><Bar dataKey="Protein" fill="#10b981"/><Bar dataKey="Carbs" fill="#a3e635"/><Bar dataKey="Fat" fill="#fb923c"/><Bar dataKey="Fibre" fill="#0b3d2e"/></BarChart></ResponsiveContainer></div>}
 <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{L.map(f=><label key={f[0]} className="glass cursor-pointer p-4"><div className="flex justify-between"><b>{f[0]}</b><input type="checkbox" checked={cmp.includes(f[0])} onChange={e=>setCmp(e.target.checked?[...cmp,f[0]].slice(-2):cmp.filter(x=>x!==f[0]))}/></div>
 <p className="text-xs opacity-70">{f[1]}</p><p className="mt-2 text-sm">{f[2]} kcal · P {f[3]}g · C {f[4]}g · F {f[5]}g · Fibre {f[6]}g</p></label>)}</div></section>}
