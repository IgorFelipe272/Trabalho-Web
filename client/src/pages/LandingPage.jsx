import { useEffect, useRef, useState } from "react";
import "../styles/LandingPage.css";

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

        const moveBackground = () => {
            console.log("movendo background");
    
            const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
            offset = Math.ceil(
                (scrollTop / (scrollHeight - clientHeight)) * 100
            );

            const images = background.current.querySelectorAll("img");

            for(const image of images){
                if(image){
                    image.animate({
                        transform: `translate(0%, ${-offset * 0.3}%)`
                    }, {duration: 2000, fill: "forwards"});
                }
            }

            console.log("A posição do scroll é: " + offset);

            lastOffset = offset;
        };

        document.body.addEventListener("pointerdown", savePos);
        document.body.addEventListener("pointerup", releasePosition);
        document.body.addEventListener("pointermove", moveContainer);
        window.addEventListener("scroll", moveBackground);

        return () => {
            document.body.removeEventListener("pointerdown", savePos);
            document.body.removeEventListener("pointerup", releasePosition);
            document.body.removeEventListener("pointermove", moveContainer);
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
                <img src="https://dev-unifei.github.io/assets/dev-u%20nova%20logo.png" alt="" />
                <h1>DEVELOPS YOU!</h1>

                <h2>Desenvolvimento de Jogos - UNIFEI</h2>
                </div>

            <div className="infoText">
                <h2>Quem Somos</h2>
                <p>A Dev-U foi criada em 2018 por alunos da UNIFEI pelo interesse comum de desenvolver jogos e evoluir juntos!</p>
                <p>Nossa missão conta com o desenvolvimento de jogos, participação em Game Jams, desenvolvimento e pesquisas direcionadas para jogos educativos, e também na capacitação dos membros para o crescente mercado no Brasil!</p>

                <h2>O que Fazemos</h2>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            
                <div className="infoTextBackground"></div>
            </div>
            
            
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

            <div ref={background} className="backgroundImages">
                <img className="img1" src="https://dev-unifei.github.io/assets/Dev_art_v2.png" alt="" />
                <img className="img2" src="https://dev-unifei.github.io/assets/Dev_GD.png" alt="" />
                <img className="img3" src="https://dev-unifei.github.io/assets/Dev_marketing.png" alt="" />
                <img className="img4" src="https://dev-unifei.github.io/assets/Dev_Code.png" alt="" />
            </div>
        </>
    )
}