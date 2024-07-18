import React from "react";
import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
    return (
        <TypeAnimation
        sequence={[
    // Same substring at the start will only be typed once, initially
    'Chat with your Own AI',
    2000,
    'Built with the Help of OpenAI',
    1000,
    'Your Own customized Chat-Bot',
    1500,
    
    ]}
    speed={50}
    style={{ fontSize: "60px", color: "white", display: "inline-block", textShadow: "1px 1px 20px #000" }}
    repeat={Infinity}
/>
    )
};

export default TypingAnim;