import {useState} from 'react';
const Box=({t,children,res})=><div className="glass p-6"><h2 className="font-display text-2xl">{t}</h2><div className="mt-3 grid gap-2">{children}</div>{res&&<p className="mt-4 rounded-xl bg-emerald/20 p-3 font-semibold">{res}</p>}</div>;
const Num=({l,v,s})=><label className="text-sm">{l}<input className="inp" type="number" min="0" value={v} onChange={e=>s(e.target.value)}/></label>;
export default function Tools(){const [w,setW]=useState(60),[h,setH]=useState(165),[a,setA]=useState(21),[sex,setSex]=useState('f'),[act,setAct]=useState(1.375),[g,setG]=useState(.8);
 const ok=+w>0&&+h>0&&+a>0;const bmi=ok&&w/((h/100)**2);const cat=b=>b<18.5?'Underweight':b<23?'Normal (Asian cut-off <23)':b<25?'Overweight risk':'Overweight/Obese range';
 const bmr=ok&&10*w+6.25*h-5*a+(sex==='m'?5:-161);
 return <section className="mx-auto max-w-5xl px-4 py-12"><h1 className="font-display text-4xl font-bold">Nutrition Tools</h1>
 <p className="mt-2 rounded-xl bg-accent/15 p-3 text-sm">These calculators give general estimates only. They are not medical diagnoses. Consult a doctor or registered dietitian for personal advice.</p>
 <div className="glass mt-6 grid gap-3 p-6 sm:grid-cols-4"><Num l="Weight (kg)" v={w} s={setW}/><Num l="Height (cm)" v={h} s={setH}/><Num l="Age" v={a} s={setA}/>
 <label className="text-sm">Sex<select className="inp" value={sex} onChange={e=>setSex(e.target.value)}><option value="f">Female</option><option value="m">Male</option></select></label></div>
 <div className="mt-6 grid gap-5 md:grid-cols-2">
 <Box t="BMI" res={ok&&`BMI ${bmi.toFixed(1)} — ${cat(bmi)}`}><p className="text-sm">BMI = weight ÷ height². Not accurate for athletes, children or pregnancy.</p></Box>
 <Box t="Daily calories (Mifflin-St Jeor)" res={ok&&`≈ ${Math.round(bmr*act)} kcal/day to maintain weight`}><label className="text-sm">Activity<select className="inp" value={act} onChange={e=>setAct(+e.target.value)}><option value={1.2}>Sedentary</option><option value={1.375}>Light</option><option value={1.55}>Moderate</option><option value={1.725}>Very active</option></select></label></Box>
 <Box t="Water intake" res={ok&&`≈ ${(w*0.035).toFixed(1)} litres/day (more in heat or exercise)`}><p className="text-sm">Rule of thumb: about 35 ml per kg body weight.</p></Box>
 <Box t="Protein requirement" res={ok&&`≈ ${Math.round(w*g)} g protein/day`}><label className="text-sm">Goal<select className="inp" value={g} onChange={e=>setG(+e.target.value)}><option value={.8}>General adult (0.8 g/kg)</option><option value={1.2}>Active (1.2 g/kg)</option><option value={1.6}>Strength training (1.6 g/kg)</option></select></label></Box>
 </div></section>}
