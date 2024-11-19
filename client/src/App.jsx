import { useEffect, useRef } from "react";
import "../src/styles/App.css"

import backgroundBlob from "../utils/functions/backgroundBlob";

//Pages
import LoginPage from './pages/LoginPage'

//Utiliza apenas a pagina de login no momento
function App() {
  const blobRef = useRef(null);
  backgroundBlob(blobRef);

  return (
    <>
      <div className="bodyContainer">
        <div className="blur"></div>
        <div ref={blobRef} className="backgroundBlob" id="backgroundBlob"></div>
      </div>
      
      <LoginPage/>
    </>
  )
}

export default App