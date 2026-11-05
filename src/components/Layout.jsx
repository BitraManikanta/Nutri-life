import {useState,useEffect} from 'react';import {NavLink,Link} from 'react-router-dom';import {Menu,X,Moon,Sun,ArrowUp} from 'lucide-react';
import {AnimatePresence,motion,useScroll} from 'framer-motion';
const links=[['/','Home'],['/nutrients','Nutrients'],['/foods','Food Database'],['/tools','Nutrition Tools'],['/csp','Community CSP'],['/pdfs','PDF Library'],['/gallery','Image Gallery']];
export default function Layout({children}){
 const [o,setO]=useState(false),[dark,setDark]=useState(()=>localStorage.getItem('nl-dark')==='1'),[top,setTop]=useState(false);const {scrollYProgress}=useScroll();
 useEffect(()=>{document.documentElement.classList.toggle('dark',dark);localStorage.setItem('nl-dark',dark?'1':'0')},[dark]);
 useEffect(()=>{const f=()=>setTop(scrollY>600);addEventListener('scroll',f);return()=>removeEventListener('scroll',f)},[]);
 const cls=({isActive})=>'rounded-full px-3 py-1 text-sm '+(isActive?'bg-emerald text-white':'hover:bg-emerald/20');
 return <>
 <motion.div style={{scaleX:scrollYProgress}} className="fixed left-0 right-0 top-0 z-50 h-1 origin-left bg-lime"/>
 <header className="glass sticky top-2 z-40 mx-2 mt-2 flex items-center justify-between rounded-full px-4 py-2">
  <Link to="/" className="font-display text-xl font-bold">🥗 NutriLife</Link>
  <nav className="hidden gap-1 lg:flex">{links.map(([t,l])=><NavLink key={t} to={t} className={cls}>{l}</NavLink>)}</nav>
  <div className="flex gap-2"><button aria-label="Toggle dark mode" onClick={()=>setDark(!dark)}>{dark?<Sun/>:<Moon/>}</button><button aria-label="Menu" className="lg:hidden" onClick={()=>setO(true)}><Menu/></button></div>
 </header>
 <AnimatePresence>{o&&<motion.aside initial={{x:'100%'}} animate={{x:0}} exit={{x:'100%'}} transition={{type:'spring',damping:26}} className="fixed inset-y-0 right-0 z-50 w-72 bg-forest p-6 text-cream">
  <button aria-label="Close menu" onClick={()=>setO(false)}><X/></button>
  <nav className="mt-6 flex flex-col gap-4 text-lg">{links.map(([t,l])=><NavLink key={t} to={t} onClick={()=>setO(false)}>{l}</NavLink>)}</nav></motion.aside>}</AnimatePresence>
 <main>{children}</main>
 <footer className="mt-20 bg-forest p-10 text-center text-sm text-cream"><p className="font-display text-xl">NutriLife</p><p>Eat Better. Live Healthier. Build a Better Future.</p>
  <p className="mt-2 opacity-70">Educational content only — not medical advice. A college Community Service Project.</p></footer>
 {top&&<button aria-label="Back to top" onClick={()=>scrollTo({top:0,behavior:'smooth'})} className="fixed bottom-5 right-5 z-40 rounded-full bg-accent p-3 text-white shadow-lg"><ArrowUp/></button>}
 </>}
