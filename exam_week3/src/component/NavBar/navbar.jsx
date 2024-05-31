import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsBasket2Fill } from "react-icons/bs";
import ThemeSwitcher from "../ThemeSwitcher/themeSwitcher.jsx";
import { user, itemsCounter } from "../../store/selector/selector";
import { generatePath } from "../../config/routes.config.jsx";
import { useEffect } from "react";
import { totalItems } from "../../store/slice/cartSlice.jsx";

const NavBar = () => {
    const userData = useSelector(user);
    const totalProducts = useSelector(itemsCounter);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(totalItems());
    });

    const handleClickOutside = (event) => {
        const menuToggle = document.getElementById("menu-toggle");
        const burgerMenu = document.getElementById("burger-menu");

        if (menuToggle.checked && !burgerMenu.contains(event.target)) {
            menuToggle.checked = false;
        }
        else{
            return
        }
    };

    useEffect(() => {
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, []);

    const closeMenu = () => {
        document.getElementById("menu-toggle").checked = false;
    };
    return (
        <>
            <section id="burger-menu">
                <input id="menu-toggle" type="checkbox" />
                <label className='menu-button-container' htmlFor="menu-toggle">
                    <div className='menu-button'></div>
                </label>
                <ul className="menu">
                    <li>
                        <Link className="navlink" to={generatePath("userProfile")} onClick={closeMenu}>
                            <FaUser className="icon" />
                            {userData.username}
                        </Link>
                    </li>
                    <li>
                        <Link className="navlink" to={generatePath("cart")} onClick={closeMenu}>
                            <BsBasket2Fill className="icon"/>
                            {totalProducts > 0 ? totalProducts : ''} Items
                        </Link>
                    </li>
                    <li>
                        <div className="navlink" onClick={closeMenu}>
                            <ThemeSwitcher />
                        </div>
                    </li>
                </ul>
            </section>
        </>
    )
}

export default NavBar