import { Box, useMediaQuery , useTheme } from "@mui/material";
import React from "react";
import TypingAnim from "../components/typer/TypingAnim";

const Home = () => {
    const theme = useTheme();
    const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));
    return <Box width={"100%"} height={"100%"}>
        <Box sx={{display: "flex", width: "100%", flexDirection: "column", alignItems: "center", mx: "auto", mt: 3}}>
            <Box>
                <TypingAnim/>
            </Box>
            <Box sx={{width: "100%", display: "flex", flexDirection: {md: "row" , sx: "column" , sm: "column"}, gap: 5, my: 10 }}>
                <img src="robot.png" alt="Robot Image" style={{width: "200px", margin: "auto"}}/>
                <img className="image-inverted rotate" src="openai.png" alt="OpenAi Image" style={{width: "200px", margin: "auto"}}/>
            </Box>
            <Box sx={{display: "flex", width: "100%", mx: "auto"}}>
                <img src="chat.png" alt="chatbot" style={{display: "flex", margin: "auto", width: isBelowMd ? "80%" : "60%", borderRadius: 20, boxShadow: "-5px -5px 105px #64f3d5", marginTop: 20, marginBottom: 20}}/>
            </Box>
        </Box>
    </Box>
};

export default Home;