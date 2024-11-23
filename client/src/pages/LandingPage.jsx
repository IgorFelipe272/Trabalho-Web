import { useEffect, useRef, useState } from "react";
import "../styles/LandingPage.css";

//logos
import mainLogo from "../assets/logos/MAIN.png";
import GDLogo from "../assets/logos/GD.png";
import GMLogo from "../assets/logos/GM.png";
import PGLogo from "../assets/logos/PG.png";
import AVLogo from "../assets/logos/AV.png";

export default function LandingPage(){
    const imagesDisplay = useRef(null);
    const display = useRef(null);
    const imagesContainer = useRef(null);
    const dynamicBackground = useRef(null);

    //Variáveis do slider de imagens
    let initialPos, mousePos, maxPos;
    let percentage = -50, lastPercentage = -50;
    let mouseDown = false;

    //Variáveis do background dinâmico
    let lastPos = 0;

    const [imageName, setImageName] = useState("");

    useEffect(() => {
        const savePos = (event) => {
            initialPos = event.clientX;
            
            mouseDown = true;
        };

        const releasePosition = () => {
            lastPercentage = percentage;

            mouseDown = false;
        };

        const moveContainer = (event) => {
            if(!mouseDown)
                return;
            
            mousePos = event.clientX - initialPos;
            maxPos = window.innerWidth / 2; 

            percentage = Math.max(-100, Math.min(0, (mousePos / maxPos) * 100 + lastPercentage));
            
            if(display.current){
                display.current.animate({
                    transform: `translate(${percentage}%, 0%)`
                }, {duration: 1200, fill: "forwards"});
            }

            const images = imagesContainer.current.querySelectorAll("img");

            for(const image of images){
                if(image){
                    image.animate({
                        objectPosition: `${percentage + 100}% 50%`
                    }, {duration: 1200, fill: "forwards"});
                }
            }
        };

        const moveBackground = () => {
            if(dynamicBackground.current){
                console.log("Movendo o background");

                const newPos = ((lastPos + window.scrollY) / document.documentElement.scrollHeight) * 300;

                dynamicBackground.current.style.backgroundPosition = `${newPos}% 0%`;
                
                lastPos = newPos;
            }
        };

        const observer = new IntersectionObserver(elements => {
            elements.forEach(element => {
                element.target.classList.toggle("show", element.isIntersecting);
            })
        }, {threshold: 0});

        const animatedElements = document.querySelectorAll(".hidden");
        animatedElements.forEach((element) => observer.observe(element));

        if(imagesDisplay.current){
            imagesDisplay.current.addEventListener("pointerdown", savePos);
            imagesDisplay.current.addEventListener("pointerup", releasePosition);
            imagesDisplay.current.addEventListener("pointermove", moveContainer);
        }

        window.addEventListener("scroll", moveBackground);

        return () => {
            imagesDisplay.current.removeEventListener("pointerdown", savePos);
            imagesDisplay.current.removeEventListener("pointerup", releasePosition);
            imagesDisplay.current.removeEventListener("pointermove", moveContainer);

            animatedElements.forEach((element) => observer.unobserve(element));

            window.removeEventListener("scroll", moveBackground);
        };
    }, []);

    const mouseHoverEnter = (event) => {
        const imageName = event.target.name;

        setImageName(imageName);
    };

    const mouseHoverLeave = () => {
        setImageName("");
    };

    return(
        <>
            <div className="header">  
                <img src={mainLogo} alt="mainLogo" className="hidden"/>
                <h1 className="hidden">DEVELOPS YOU!</h1>

                <h2 className="hidden">Desenvolvimento de Jogos - UNIFEI</h2>
            </div>

            <div className="infoText">
                <div className="subContainer1">
                    <h2 className="hidden">Quem Somos</h2>
                    <p className="hidden">A Dev-U foi criada em 2018 por alunos da UNIFEI pelo interesse comum de desenvolver jogos e evoluir juntos!</p>
                </div>

                <div className="subContainer2">
                    <h2 className="hidden">O que Fazemos</h2>
                    <p className="hidden">Nossa missão conta com o desenvolvimento de jogos, participação em Game Jams, desenvolvimento e pesquisas direcionadas para jogos educativos, e também com a capacitação dos membros para o crescente mercado de jogos no Brasil!</p>
                </div>

                <div ref={dynamicBackground} className="infoTextBackground"></div>
            </div>

            <div className="areas">
                <h2 className="hidden">Nossas Áreas</h2>

                <div className="areaRight">
                    <div className="areaText">
                        <h2 className="hidden">Programação</h2>
                        <p className="hidden">A área de Programação trabalha para dar vida aos planos desenvolvidos pelas demais áreas. Os programadores transformam uma coleção de ideias inanimadas em um conjunto de dados que por sua vez podem ser interpretados e executados por qualquer tipo de maquina moderna, fazendo disso, então, um jogo digital / videogame.</p>
                    </div>

                    <div className="areaImage">
                        <img className="hidden" src={PGLogo} alt="PGLogo" />
                    </div>
                </div>

                <div className="areaLeft">
                    <div className="areaImage">
                        <img className="hidden" src={GDLogo} alt="PGLogo" />
                    </div>

                    <div className="areaText">
                        <h2 className="hidden">Game Design</h2>
                        <p className="hidden">Game Design é a arte de criar uma experiência, visando tornar o jogo interessante e divertido para o jogador. Game Designers criam mecânicas, montam e apresentam o pitch dos games, tratam do balanceamento, planejam como a gameplay vai ser executada e muito mais.</p>
                    </div>
                </div>

                <div className="areaRight">
                    <div className="areaText">
                        <h2 className="hidden">Audiovisual</h2>
                        <p className="hidden">A área de Audiovisual é responsável por transmitir para o jogador emoções, ideias e informações. Artistas procuram apelar para os sentidos do jogador com imagens, interfaces de usuário, sprites, modelos 3D, música, efeitos sonoros e dublagem para transmitir a sensação do jogo.</p>
                    </div>

                    <div className="areaImage">
                        <img className="hidden" src={AVLogo} alt="AVLogo" />
                    </div>
                </div>

                <div className="areaLeft">
                    <div className="areaImage">
                        <img className="hidden" src={GMLogo} alt="GMLogo" />
                    </div>

                    <div className="areaText">
                        <h2 className="hidden">Gestão e Marketing</h2>
                        <p className="hidden">Gestão & Marketing é a área responsável por se comunicar com o público do projeto, organizar eventos, firmar parcerias, fazer divulgação e tesouraria. Os gestores lidam com as questões burocráticas e financeiras do projeto.</p>
                    </div>
                </div>
            </div>
            
            <div ref={imagesDisplay} className="gamesDisplay">
                <div className="displayTitle">
                    <h2 className="hidden">Nossos Jogos</h2>
                    <p className="hidden">Aqui estão alguns destaques dos muitos jogos que já produzimos</p>
                </div>
                
                <div ref={display} className="display">
                    <div ref={imagesContainer} className="imagesContainer">
                        <img 
                            src="https://img.itch.zone/aW1nLzE4NDE5NDg0LnBuZw==/315x250%23c/Y4xZfm.png" 
                            name="Mass Flux: Fuga Espacial" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                            className="hidden"
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE2NDExMDMwLnBuZw==/315x250%23c/Wvoxhq.png" 
                            name="Embriamago" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                            className="hidden"
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE1NzgxNjY5LnBuZw==/315x250%23c/7CT8J4.png" 
                            name="Dark Mage" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                            className="hidden"
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE0MTQwNDU0LmdpZg==/315x250%23cm/%2F2zTyb.gif" 
                            name="Cat UP" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                            className="hidden"
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE0MDAyNDIyLnBuZw==/315x250%23c/G5bLt9.png" 
                            name="AlwayZ Up" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                            className="hidden"
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE3ODk1NDIzLnBuZw==/315x250%23c/4QbRCR.png" 
                            name="Schrödinger's Cat" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                            className="hidden"
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE3ODkzMzYwLmpwZWc=/315x250%23c/xricDe.jpeg" 
                            name="The Random Adventures of Boxbox" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                            className="hidden"
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE2NDA5ODE3LnBuZw==/315x250%23c/HEjACm.png" 
                            name="No One Left Behind" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                            className="hidden"
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE0ODQzOTk5LnBuZw==/315x250%23c/Hokm6K.png" 
                            name="Pun and Run" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                            className="hidden"
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzEzODY2ODkyLmdpZg==/315x250%23cm/9s5x4q.gif" 
                            name="UnderBrewed" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                            className="hidden"
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzkyNTEwNzEuanBlZw==/315x250%23c/ExHidf.jpeg" 
                            name="Devmon!" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                            className="hidden"
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzEzMjQ2Mzg3LmpwZWc=/315x250%23c/5UCtyg.jpeg" 
                            name="Bagre in Abyss" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                            className="hidden"
                        />
                    </div>
                </div>

                <div className="imageNameText">
                    <h3>{imageName}</h3>
                </div>
            </div>            
        </>
    )
}