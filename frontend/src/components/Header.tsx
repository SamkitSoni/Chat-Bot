import {AppBar} from "@mui/material";
import {Toolbar} from "@mui/material";
import Logo from "./shared/logo";

function Header() {
    return (
        <AppBar sx={{ backgroundColor: "transparent", position: "static", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex" }}>
                <Logo />
            </Toolbar>
        </AppBar>
    );
}

export default Header;