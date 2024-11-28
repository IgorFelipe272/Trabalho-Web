import { useEffect, useRef } from "react";
import "../styles/Blob.css"

function Blob(){
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

    return(
        <>
            <div className="bodyContainer">
            <div className="blur"></div>
            <div ref={blobRef} className="backgroundBlob" id="backgroundBlob"></div>
            </div>
        </> 
    )
}

export default Blob