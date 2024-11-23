import { useEffect, useRef } from "react";
import "../src/styles/App.css"

//Pages
import LoginPage from './pages/LoginPage'
import LandingPage from "./pages/LandingPage";
import Cadastro from "./pages/Cadastro";
import MembrosPontuacao from './pages/MembrosPontuacao'; 


//Utiliza apenas a pagina de login no momento
function App() {
  const blobRef = useRef(null);

  useEffect(() => {
    const moveBlob = (event) => {
        if(blobRef.current){
            blobRef.current.animate({
                left: `${event.clientX}px`,
                top: `${event.clientY}px`
            }, {duration: 3000, fill: "forwards"});
        }
    };

    document.body.addEventListener("pointermove", moveBlob);

    return () => {
        document.body.removeEventListener("pointermove", moveBlob);
    };
}, []);

  return (
    <>
      <div className="bodyContainer">
        <div className="blur"></div>
        <div ref={blobRef} className="backgroundBlob" id="backgroundBlob"></div>
      </div>
      
      
      
      
      <LandingPage/>

    </>
  )
}
//<LandingPage/>
//<Cadastro/>
//<MembrosPontuacao />
export default App