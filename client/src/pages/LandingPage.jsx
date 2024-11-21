import { useEffect, useRef, useState } from "react";
import "../styles/LandingPage.css";

//logos
import mainLogo from "../assets/logos/MAIN.png";
import GDLogo from "../assets/logos/GD.png";
import GMLogo from "../assets/logos/GM.png";
import PGLogo from "../assets/logos/PG.png";
import AVLogo from "../assets/logos/AV.png";

export default function LandingPage(){
    const display = useRef(null);
    const imagesContainer = useRef(null);
    const background = useRef(null);

    //Image Slider Variables
    let initialPos, mousePos, maxPos;
    let percentage = -50, lastPercentage = -50;
    let mouseDown = false;

    //Background Movement Variables
    let offset = 0, lastOffset = 0;

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

            percentage = Math.max(-75, Math.min(-25, (mousePos / maxPos) * 100 + lastPercentage));

            if(percentage > -25)
                percentage = -25;
            else if(percentage < -75)
                percentage = -75;

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

        document.body.addEventListener("pointerdown", savePos);
        document.body.addEventListener("pointerup", releasePosition);
        document.body.addEventListener("pointermove", moveContainer);

        return () => {
            document.body.removeEventListener("pointerdown", savePos);
            document.body.removeEventListener("pointerup", releasePosition);
            document.body.removeEventListener("pointermove", moveContainer);
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
                <img src={mainLogo} alt="" />
                <h1>DEVELOPS YOU!</h1>

                <h2>Desenvolvimento de Jogos - UNIFEI</h2>
            </div>

            <div className="infoText">
                <div className="subContainer1">
                    <h2>Quem Somos</h2>
                    <p>A Dev-U foi criada em 2018 por alunos da UNIFEI pelo interesse comum de desenvolver jogos e evoluir juntos!</p>
                </div>

                <div className="subContainer2">
                    <h2>O que Fazemos</h2>
                    <p>Nossa missão conta com o desenvolvimento de jogos, participação em Game Jams, desenvolvimento e pesquisas direcionadas para jogos educativos, e também na capacitação dos membros para o crescente mercado no Brasil!</p>
                </div>
                <div className="infoTextBackground"></div>
            </div>

            <div className="areas">
                <h2>Nossas Áreas</h2>

                <div className="areaRight">
                    <div className="areaText">
                        <h2>Programação</h2>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, ullam? Nostrum eveniet culpa delectus facere at, consequatur quo hic atque officia corrupti corporis fugiat? Sed incidunt eaque consequuntur sequi quo.</p>
                    </div>
                    <div className="areaImage">
                        <img src={PGLogo} alt="" />
                    </div>
                </div>

                <div className="areaLeft">
                    <div className="areaImage">
                        <img src={GDLogo} alt="" />
                    </div>
                    <div className="areaText">
                        <h2>Game Desing</h2>
                        <p>Fazer design dos jogos seila kkkk Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi suscipit inventore, sequi doloremque quaerat quisquam quia nam laborum. Error asperiores ab consequatur porro magnam accusamus ex corporis neque quibusdam facere.</p>
                    </div>
                </div>

                <div className="areaRight">
                    <div className="areaText">
                        <h2>Audiovisual</h2>
                        <p>Fazer audio e visual aj falei q nsei Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus fugit cumque ad est quasi iusto iure? Deleniti ex quos blanditiis, nostrum distinctio doloribus! Placeat beatae porro sequi dignissimos, laborum numquam.</p>
                    </div>
                    <div className="areaImage">
                        <img src={AVLogo} alt="" />
                    </div>
                </div>

                <div className="areaLeft">
                    <div className="areaImage">
                        <img src={GMLogo} alt="" />
                    </div>
                    <div className="areaText">
                        <h2>Gestão e Marketing</h2>
                        <p>Faz nada kkkkkkkkkkkkkk Lorem ipsum dolor sit, amet consectetur adipisicing elit. Tempore, officiis incidunt vitae fugiat laboriosam, voluptatum temporibus repudiandae eum doloribus porro odio iusto assumenda deserunt quasi pariatur fuga quae omnis nemo?</p>
                    </div>
                </div>
            </div>
            
            <div className="gamesDisplay">
                <div className="displayTitle">
                    <h2>Nossos Jogos</h2>
                    <p>Aqui estão alguns destaques dos muitos jogos que já produzimos</p>
                </div>
                
                <div ref={display} className="display">
                    <button className="buttonLeft" name="Ver catálogo completo" onMouseEnter={mouseHoverEnter} onMouseLeave={mouseHoverLeave}>
                        <h3>&lt;</h3>
                    </button>

                    <div ref={imagesContainer} className="imagesContainer">
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
                    </div>

                    <button className="buttonRight" name="Ver catálogo completo" onMouseEnter={mouseHoverEnter} onMouseLeave={mouseHoverLeave}>
                        <h3>&gt;</h3>
                    </button>
                    
                </div>

                <div className="imageNameText">
                    <h3>{imageName}</h3>
                </div>
            </div>            
        </>
    )
}