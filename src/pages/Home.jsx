import {motion} from 'framer-motion';import {Link} from 'react-router-dom';import {useEffect,useState} from 'react';
const tips=['Fill half your plate with vegetables and fruits.','Choose whole grains and millets like ragi, jowar and bajra.','Drink water regularly through the day.','Wash fruits and vegetables before eating.','Pair pulses with cereals for better protein quality.','Limit sugary drinks and heavily fried snacks.','Include a source of iron and vitamin C together.'];
const Count=({to,label})=>{const [n,setN]=useState(0);useEffect(()=>{let s=0;const t=setInterval(()=>{s+=Math.ceil(to/40);if(s>=to){s=to;clearInterval(t)}setN(s)},30);return()=>clearInterval(t)},[to]);return <div className="glass p-5"><p className="text-4xl font-bold">{n}</p><p className="text-sm">{label}</p></div>};
export default function Home(){const tip=tips[new Date().getDate()%tips.length];
 return <>
 <section className="relative flex min-h-[90vh] items-center justify-center overflow-hidden bg-gradient-to-br from-forest via-emerald to-lime px-4 text-center text-white">
  {['🥑','🍎','🥕','🍊','🌾','🥦'].map((e,i)=><motion.span key={e} className="absolute text-5xl" style={{left:`${10+i*15}%`,top:`${15+(i%3)*25}%`}} animate={{y:[0,-25,0],rotate:[0,10,0]}} transition={{duration:5+i,repeat:Infinity}}>{e}</motion.span>)}
  <div className="relative max-w-3xl"><motion.p initial={{opacity:0}} animate={{opacity:1}} className="mb-3 tracking-widest">NUTRILIFE</motion.p>
   <motion.h1 initial={{opacity:0,y:40}} animate={{opacity:1,y:0}} transition={{duration:.9}} className="font-display text-5xl font-bold md:text-7xl">Your Health Begins With What’s on Your Plate.</motion.h1>
   <p className="mx-auto mt-5 max-w-xl text-lg">Learn about nutrition, balanced diets and food safety — Eat Better. Live Healthier. Build a Better Future.</p>
   <div className="mt-8 flex flex-wrap justify-center gap-3"><Link to="/nutrients" className="btn bg-accent text-white">Explore Nutrition</Link><Link to="/foods" className="btn bg-white text-forest">Discover Healthy Foods</Link></div></div>
 </section>
 <section className="mx-auto grid max-w-5xl gap-4 px-4 py-14 text-center sm:grid-cols-3"><Count to={7} label="essential nutrient groups covered"/><Count to={18} label="Indian foods in the database"/><Count to={4} label="working calculators"/></section>
 <section className="mx-auto max-w-3xl px-4"><div className="glass p-8"><h2 className="font-display text-2xl">Daily nutrition tip</h2><p className="mt-2 text-lg">{tip}</p></div></section>
 </>}
