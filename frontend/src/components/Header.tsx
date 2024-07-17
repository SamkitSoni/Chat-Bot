import {AppBar} from "@mui/material";
import {Toolbar} from "@mui/material";
import Logo from "./shared/logo";
import { useAuth } from "../context/AuthContext";
import NavigationLink from "./shared/NavigationLink";

function Header() {
    const auth = useAuth();
    return (
        <AppBar sx={{ backgroundColor: "transparent", position: "static", boxShadow: "none" }}>
            <Toolbar sx={{ display: "flex" }}>
                <Logo />
                <div>
                    {auth?.isLoggedIn? (
                    <>
                    <NavigationLink bg="#00fffc" to="/chat" text="Go to Chat" textColor="black"/>
                    <NavigationLink bg="#51538f" to="/" text="Logout" textColor="white" onClick={auth.logout}/>
                    </>) : (
                        <>
                        <NavigationLink bg="#00fffc" to="/login" text="Login" textColor="black"/>
                        <NavigationLink bg="#51538f" to="/signup" text="Signup" textColor="white"/>
                        </>)}
                </div>
            </Toolbar>
        </AppBar>
    );
}

export default Header;