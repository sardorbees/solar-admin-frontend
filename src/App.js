import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Header from './components/header/Header';
import Topbar from './components/topbar/Topbar';
import Video from './components/video/Video';
import Main from './components/main/Main';
import Footer from './components/footer/Footer';
import About from './components/about/About';
import Contact from './components/contact/Contact';
import Services from './components/services/Services';
import Project from './components/projects/Project';
import Nav from './components/nav/Nav'
import AllCategory from './components/allcategory/AllCategory';
import Navbar from './components/nabvar/Navbar';
import PrivateRoute from './components/privateroute/PrivateRoute';
import Register from './components/pages/Register'
import Login from './components/pages/Login'
import Profile from './components/pages/Profile'
import EditProfile from './components/pages/EditProfile'

import SolnechnyePaneli from './components/solnechnye-paneli/SolnechnyePaneli';
import Invertory from './components/invertory/Invertory';
import Ctabilizatory from './components/ctabilizatory/Ctabilizatory';
import Akkumlyatory from './components/akkumlyatory/Akkumlyatory';
import ColnechnyjOsvesheniya from './components/colnechnyj_osvesheniya/ColnechnyjOsvesheniya';
import DizelGeneratory from './components/dizel-generatory/DizelGeneratory';
import ZaryadnyjStancii from './components/zaryadnyj-stancii/ZaryadnyjStancii';
import VetrovayaElektrostancii from './components/vetrovaya-elektrostancii/VetrovayaElektrostancii';
import IndividualnyjTeplovojPunkt from './components/individualnyj-teplovoj-punkt/IndividualnyjTeplovojPunkt';
import Skidka from './components/skidka/Skidka';
import SkidkaProduct from './components/skidka-product/SkidkaProduct';
import Junko from './components/junko/Junko';
import Andeli from './components/andeli/Andeli';
import Deye from './components/deye/Deye';
import Dyness from './components/dyness/Dyness';
import Edison from './components/edison/Edison';
import EraSolar from './components/era-solar/EraSolar';
import Growat from './components/growat/Growat';
import Gybrid from './components/gybrid/Gybrid'
import HzSolar from './components/hz-solar/HzSolar';
import Invt from './components/invt/Invt';
import Videoss from './components/video_ss/Videoss'
import Comment from './components/comment/Comment';
import ChangePassword from './components/change-password/ChangePassword';

function App() {
  return (
    <>
      <BrowserRouter>
        <Topbar />
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/catalog" element={<Project />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/allcategory" element={<AllCategory />} />
          <Route path="/category/:slug" element={<Nav />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/video-type" element={<Videoss />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route
            path="/profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/solnechnye-paneli" element={<SolnechnyePaneli />} />
          <Route path="/invertory" element={<Invertory />} />
          <Route path="/ctabilizatory" element={<Ctabilizatory />} />
          <Route path="/akkumlyatory" element={<Akkumlyatory />} />
          <Route path="/colnechnyj-osvesheniya" element={<ColnechnyjOsvesheniya />} />
          <Route path="/dizel-generatory" element={<DizelGeneratory />} />
          <Route path="/zaryadnyj-stancii" element={<ZaryadnyjStancii />} />
          <Route path="/vetrovaya-elektrostancii" element={<VetrovayaElektrostancii />} />
          <Route path="/individualnyj-teplovoj-punkt" element={<IndividualnyjTeplovojPunkt />} />
          <Route path="/skidka" element={<Skidka />} />
          <Route path="/skidka-product" element={<SkidkaProduct />} />

          <Route path="/junko" element={<Junko />} />
          <Route path="/andeli" element={<Andeli />} />
          <Route path="/deye" element={<Deye />} />
          <Route path="/dyness" element={<Dyness />} />
          <Route path="/edison" element={<Edison />} />
          <Route path="/era-solar" element={<EraSolar />} />
          <Route path="/growat" element={<Growat />} />
          <Route path="/gybrid" element={<Gybrid />} />
          <Route path="/hz-solar" element={<HzSolar />} />
          <Route path="/invt" element={<Invt />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
