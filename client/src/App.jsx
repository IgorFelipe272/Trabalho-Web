import "../src/styles/App.css"

import { BrowserRouter, Routes, Route} from "react-router-dom";

//Pages
import LoginPage from './pages/LoginPage'
import LandingPage from "./pages/LandingPage";
import UserPage from "./pages/UserPage";
import Blob from './components/Blob';
import Footer from './components/Footer'

//Utiliza apenas a pagina de login no momento
function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={
            <>
              <Blob/>
              <LandingPage/> 
              <Footer/>
            </>
          }
          />
          <Route path="/login" element={<LoginPage/>} />
          <Route path="/user" element={<UserPage/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App