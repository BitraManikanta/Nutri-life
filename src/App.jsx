import {Routes,Route,Link} from 'react-router-dom';
import Layout from './components/Layout.jsx';import Home from './pages/Home.jsx';import Nutrients from './pages/Nutrients.jsx';
import Foods from './pages/Foods.jsx';import Tools from './pages/Tools.jsx';import Csp from './pages/Csp.jsx';import Pdfs from './pages/Pdfs.jsx';import Gallery from './pages/Gallery.jsx';
const NF=()=><div className="py-32 text-center"><h1 className="font-display text-6xl">404</h1><p className="my-4">This plate is empty.</p><Link className="btn bg-emerald text-white" to="/">Back home</Link></div>;
export default ()=><Layout><Routes><Route path="/" element={<Home/>}/><Route path="/nutrients" element={<Nutrients/>}/><Route path="/foods" element={<Foods/>}/>
<Route path="/tools" element={<Tools/>}/><Route path="/csp" element={<Csp/>}/><Route path="/pdfs" element={<Pdfs/>}/><Route path="/gallery" element={<Gallery/>}/><Route path="*" element={<NF/>}/></Routes></Layout>;
