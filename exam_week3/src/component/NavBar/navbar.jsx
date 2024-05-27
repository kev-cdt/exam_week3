import { FaUser } from "react-icons/fa";
import { BsBasket2Fill } from "react-icons/bs";
import ThemeSwitcher from "../ThemeSwitcher/themeSwitcher.jsx";

const NavBar = () => {
    return (
        <>
            <nav className="navlinks-container">
                <ul>
                    <FaUser />
                    UserName
                </ul>
                <ul>
                    <BsBasket2Fill />
                    Items
                </ul>
                <ul>
                   <ThemeSwitcher/>
                </ul>
            </nav>
        </>
    )
}

export default NavBar