import { useEffect, useRef } from "react";
import "../src/styles/App.css"

//Pages
import LoginPage from './pages/LoginPage'
import LandingPage from "./pages/LandingPage";

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

    window.history.scrollRestoration = "manual";

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

      <div className="footer">
        <div className="subContainer1">
          <h2>ENDEREÇO</h2>
          <p>Av. BPS, 1303, Bairro Pinheirinho</p>
          <p>Itajubá- MG</p>
        </div>

        <div className="subContainer2">
          <h2>EMAIL DE CONTATO</h2>
          <p>devunifei@gmail.com</p>
        </div>
      </div>
    </>
  )
}

export default App