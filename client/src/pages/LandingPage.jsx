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

    //Image Slider Variables
    let initialPos, mousePos, maxPos;
    let percentage = -50, lastPercentage = -50;
    let mouseDown = false;

    const [imageName, setImageName] = useState("");

    useEffect(() => {
        const savePos = (event) => {
            initialPos = event.clientX;

            console.log("Posição salva em: " + initialPos);
            
            mouseDown = true;
        };

        const releasePosition = () => {
            lastPercentage = percentage;

            console.log("Porcentegem salv: " + lastPercentage);

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

        const observer = new IntersectionObserver(elements => {
            elements.forEach(element => {
                if(element.isIntersecting){
                    element.target.classList.add("show");
                    return;
                }

                element.target.classList.remove("show");
            })
        });

        const animatedElements = document.querySelectorAll(".hidden");
        animatedElements.forEach((element) => observer.observe(element));

        if(imagesDisplay.current){
            imagesDisplay.current.addEventListener("pointerdown", savePos);
            imagesDisplay.current.addEventListener("pointerup", releasePosition);
            imagesDisplay.current.addEventListener("pointermove", moveContainer);
        }

        return () => {
            imagesDisplay.current.removeEventListener("pointerdown", savePos);
            imagesDisplay.current.removeEventListener("pointerup", releasePosition);
            imagesDisplay.current.removeEventListener("pointermove", moveContainer);

            animatedElements.forEach((element) => observer.unobserve(element));
        };g
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
                    <p className="hidden">Nossa missão conta com o desenvolvimento de jogos, participação em Game Jams, desenvolvimento e pesquisas direcionadas para jogos educativos, e também na capacitação dos membros para o crescente mercado no Brasil!</p>
                </div>

                <div className="infoTextBackground"></div>
            </div>

            <div className="areas">
                <h2 className="hidden">Nossas Áreas</h2>

                <div className="areaRight">
                    <div className="areaText">
                        <h2>Programação</h2>
                        <p>A área de Programação trabalha para dar vida aos planos desenvolvidos pelas demais áreas. Sem os programadores o jogo é basicamente uma coleção de ideias inanimadas, por isso os programadores as transformam em um conjunto de dados que por sua vez podem ser interpretados e executados por qualquer tipo maquina moderna, fazendo disso então, um jogo digital / videogame.</p>
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
                        <h2>Game Desing</h2>
                        <p>Game Design é a arte de criar uma experiencia! Nosso único trabalho é tornar o game interessante e divertido para o player, utilizando todas as ferramentas possíveis para isso. Aqui nós criamos mecânicas, montamos e apresentamos o pitch dos games, fazemos balanceamento, planejamos como o gameplay vai ser executado e muito mais.</p>
                    </div>
                </div>

                <div className="areaRight">
                    <div className="areaText">
                        <h2>Audiovisual</h2>
                        <p>A área de Audiovisual é responsável por transmitir para o jogador emoções, ideias e informação. Nós procuramos apelar para os sentidos do jogador com imagens, Interfaces de Usuário, sprites, modelos 3D, música, efeitos sonoros e dublagem para transmitir o que o jogo precisa.</p>
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
                        <h2>Gestão e Marketing</h2>
                        <p>Gestão & Marketing é a área responsável por se comunicar com o público do projeto, organizar eventos, firmar parcerias, fazer divulgação e tesouraria. Eles lidam com as questões burocráticas e financeiras do projeto.</p>
                    </div>
                </div>
            </div>
            
            <div ref={imagesDisplay} className="gamesDisplay">
                <div className="displayTitle">
                    <h2 className="hidden">Nossos Jogos</h2>
                    <p className="hidden">Aqui estão alguns destaques dos muitos jogos que já produzimos</p>
                </div>
                
                <div ref={display} className="display">
                    <div ref={imagesContainer} className="imagesContainer hidden">
                        <img 
                            src="https://img.itch.zone/aW1nLzE4NDE5NDg0LnBuZw==/315x250%23c/Y4xZfm.png" 
                            name="Mass Flux: Fuga Espacial" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE2NDExMDMwLnBuZw==/315x250%23c/Wvoxhq.png" 
                            name="Embriamago" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE1NzgxNjY5LnBuZw==/315x250%23c/7CT8J4.png" 
                            name="Dark Mage" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE0MTQwNDU0LmdpZg==/315x250%23cm/%2F2zTyb.gif" 
                            name="Cat UP" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE0MDAyNDIyLnBuZw==/315x250%23c/G5bLt9.png" 
                            name="AlwayZ Up" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE3MTA5MTg5LnBuZw==/315x250%23c/rJX3P9.png" 
                            name="Vigilante Noturno" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE1NTI3ODEwLnBuZw==/315x250%23c/6EGlge.png" 
                            name="Quem é?" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE3ODk1NDIzLnBuZw==/315x250%23c/4QbRCR.png" 
                            name="Schrödinger's Cat" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE3ODkzMzYwLmpwZWc=/315x250%23c/xricDe.jpeg" 
                            name="The Random Adventures of Boxbox" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE2NDA5ODE3LnBuZw==/315x250%23c/HEjACm.png" 
                            name="No One Left Behind" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzE0ODQzOTk5LnBuZw==/315x250%23c/Hokm6K.png" 
                            name="Pun and Run" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzEzODY2ODkyLmdpZg==/315x250%23cm/9s5x4q.gif" 
                            name="UnderBrewed" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzkyNTEwNzEuanBlZw==/315x250%23c/ExHidf.jpeg" 
                            name="Devmon!" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzEzMjQ2Mzg3LmpwZWc=/315x250%23c/5UCtyg.jpeg" 
                            name="Bagre in Abyss" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
                        />
                        <img 
                            src="https://img.itch.zone/aW1nLzEwNzAzNjY1LnBuZw==/315x250%23c/YIzRTz.png" 
                            name="Bafo Tycoon" 
                            draggable="false"
                            onMouseEnter={mouseHoverEnter}
                            onMouseLeave={mouseHoverLeave}
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