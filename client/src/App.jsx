import { useEffect, useRef, useState } from "react";
import "../src/styles/App.css";

// Pages
import LoginPage from './pages/LoginPage';
import LandingPage from "./pages/LandingPage";
import Cadastro from "./pages/Cadastro";
import MembrosPontuacao from './pages/MembrosPontuacao';

function App() {
  const blobRef = useRef(null);
  const [currentPage, setCurrentPage] = useState("home");

  useEffect(() => {
    const moveBlob = (event) => {
      if (blobRef.current) {
        blobRef.current.animate(
          {
            left: `${event.clientX}px`,
            top: `${event.clientY}px`,
          },
          { duration: 3000, fill: "forwards" }
        );
      }
    };

    document.body.addEventListener("pointermove", moveBlob);

    return () => {
      document.body.removeEventListener("pointermove", moveBlob);
    };
  }, []);

  const renderPage = () => {
    switch (currentPage) {
      case "home":
        return <LandingPage />;
      case "cadastro":
        return <Cadastro />;
      case "pontuacao":
        return <MembrosPontuacao />;
      default:
        return <LandingPage />;
    }
  };

  return (
    <>
      <div className="bodyContainer">
        <div className="blur"></div>
        <div ref={blobRef} className="backgroundBlob" id="backgroundBlob"></div>
      </div>

      {/* Header with navigation buttons */}
      <header className="header2">
        <button onClick={() => setCurrentPage("home")}>Home</button>
        <button onClick={() => setCurrentPage("cadastro")}>Cadastro</button>
        <button onClick={() => setCurrentPage("pontuacao")}>Pontuação</button>
      </header>

      {/* Render the selected page */}
      <main>{renderPage()}</main>
    </>
  );
}

export default App;
