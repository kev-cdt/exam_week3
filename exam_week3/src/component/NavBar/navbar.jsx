import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { generatePath } from "../../config/routes.config.jsx";
import { user, itemsCounter } from "../../store/selector/selector";
import { totalItems } from "../../store/slice/cartSlice.jsx";
import ThemeSwitcher from "../ThemeSwitcher/themeSwitcher.jsx";
import { FaUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { BsBasket2Fill } from "react-icons/bs";

const NavBar = () => {
  const userData = useSelector(user);
  const totalProducts = useSelector(itemsCounter);
  const dispatch = useDispatch();

  const closeMenu = () => {
    document.getElementById("menu-toggle").checked = false;
  };

  const handleClickOutside = (event) => {
    const menuToggle = document.getElementById("menu-toggle");
    const burgerMenu = document.getElementById("burger-menu");

    if (menuToggle.checked && !burgerMenu.contains(event.target)) {
      menuToggle.checked = false;
    } else {
      return;
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    dispatch(totalItems());
  });

  return (
    <>
      <section id="burger-menu">
        <input id="menu-toggle" type="checkbox" />
        <label className="menu-button-container" htmlFor="menu-toggle">
          <div className="menu-button"></div>
        </label>
        <ul className="menu">
          <li>
            <Link
              className="navlink"
              to={generatePath("home")}
              onClick={closeMenu}
            >
              <IoHome className="icon" />
              Home
            </Link>
          </li>
          <li>
            <Link
              className="navlink"
              to={generatePath("userProfile")}
              onClick={closeMenu}
            >
              <FaUser size={15} />
              {userData.username}
            </Link>
          </li>
          <li>
            <Link
              className="navlink"
              to={generatePath("cart")}
              onClick={closeMenu}
            >
              <BsBasket2Fill className="icon" />
              {totalProducts > 0 ? totalProducts : ""} Items
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
  );
};

export default NavBar;