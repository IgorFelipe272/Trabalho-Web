import { useEffect, useRef, useState } from "react";
import "../styles/LandingPage.css";

export default function LandingPage(){
    const display = useRef(null);

    let initialPos, mousePos, maxPos;
    let percentage, lastPercentage = -50;
    let mouseDown = false;

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

            percentage = (mousePos / maxPos) * 100 + lastPercentage;

            if(percentage > -25)
                percentage = -25;
            else if(percentage < -75)
                percentage = -75;

            if(display.current){
                display.current.animate({
                    transform: `translate(${percentage}%, 0%)`
                }, {duration: 1200, fill: "forwards"});
            }

            const images = display.current.querySelectorAll("img");

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

    const [imageName, setImageName] = useState("");

    const mouseHoverEnter = (event) => {
        const imageName = event.target.name;

        console.log(imageName);

        setImageName(imageName);
    };

    const mouseHoverLeave = () => {
        setImageName("");
    };

    return(
        <>

            <div ref={display} className="display">
                <button>
                    <h3>V</h3>
                    <h3>E</h3>
                    <h3>R</h3>
                    <h3> </h3>
                    <h3>M</h3>
                    <h3>A</h3>
                    <h3>I</h3>
                    <h3>S</h3>
                </button>

                <div className="imagesContainer">
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

                <button>
                    <h3>V</h3>
                    <h3>E</h3>
                    <h3>R</h3>
                    <h3> </h3>
                    <h3>M</h3>
                    <h3>A</h3>
                    <h3>I</h3>
                    <h3>S</h3>
                </button>
            </div>

            <h3 className="imageNameText">{imageName}</h3>
        </>
    )
}