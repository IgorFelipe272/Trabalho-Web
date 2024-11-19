import { useEffect } from "react";

export default function backgroundBlob(blobRef){
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
    }, [blobRef]);
}