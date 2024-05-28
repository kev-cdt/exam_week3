import { generatePath } from "../../config/routes.config";
import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";
import NavBar from "../NavBar/navbar";

const Header = () => {
    return (
        <>
        <header>
            <Link to={generatePath("home")}>
            <h1>EZ Shopping</h1>
            </Link>
            <NavBar />
        </header>
        <Outlet />
        </>
    );
};

export default Header;
