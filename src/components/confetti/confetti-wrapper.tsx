import React, {useEffect} from "react";
import Confetti from "./confetti";

const CANVAS_ID = 'confetti-canvas';

interface ConfettiWrapperProps {

}

const ConfettiWrapper: React.FC<ConfettiWrapperProps> = () => {

    useEffect(() => {
        (new Confetti(CANVAS_ID)).main();
    }, []);

    return (
        <canvas id={CANVAS_ID} />
    )
};

export default ConfettiWrapper