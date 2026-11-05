import {motion} from 'framer-motion';
const N=[['Carbohydrates','Main energy source for the body and brain.','Rice, wheat, millets, potatoes, fruits','Low energy and fatigue.'],
['Proteins','Build and repair tissue; make enzymes and hormones.','Pulses, eggs, milk, fish, meat, nuts','Stunted growth, muscle wasting; protein-energy malnutrition.'],
['Fats','Concentrated energy; help absorb vitamins A, D, E, K.','Oils, nuts, seeds, ghee, fish','Poor vitamin absorption, dry skin.'],
['Vitamins','Regulate metabolism and protect health (A, B-complex, C, D, E, K).','Fruits, vegetables, dairy, eggs, sunlight (D)','Night blindness (A), scurvy (C), rickets (D), anaemia (B12/folate).'],
['Minerals','Bones, blood, nerves and fluid balance (iron, calcium, zinc, iodine…).','Leafy greens, ragi, milk, iodised salt','Anaemia (iron), weak bones (calcium), goitre (iodine).'],
['Water','Transports nutrients, regulates temperature.','Water, buttermilk, fruits, soups','Dehydration, headache, tiredness.'],
['Dietary fibre','Supports digestion and gut health.','Whole grains, millets, vegetables, pulses','Constipation.']];
export default ()=><section className="mx-auto max-w-5xl px-4 py-12"><h1 className="font-display text-4xl font-bold">Essential Nutrients</h1>
<p className="mt-2 opacity-80">Nutrition is how the body uses food for growth, energy and health. A balanced diet supplies all nutrients in the right amounts.</p>
<div className="mt-8 grid gap-5 md:grid-cols-2">{N.map(([t,f,s,d],i)=><motion.div key={t} initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*.05}} className="glass p-6">
<h2 className="font-display text-2xl">{t}</h2><p className="mt-2"><b>Function:</b> {f}</p><p><b>Sources:</b> {s}</p><p><b>Deficiency:</b> {d}</p></motion.div>)}</div>
<p className="mt-8 text-sm opacity-70">General education only. See the ICMR-NIN Dietary Guidelines for Indians and FSSAI for authoritative guidance.</p></section>;
