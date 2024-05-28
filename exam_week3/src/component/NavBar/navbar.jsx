import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BsBasket2Fill } from "react-icons/bs";
import ThemeSwitcher from "../ThemeSwitcher/themeSwitcher.jsx";
import { user, cart } from "../../store/selector/selector";
import { generatePath } from "../../config/routes.config.jsx";

const NavBar = () => {
    const userData = useSelector(user);
    const cartProducts = useSelector(cart);

    const totalProducts = () => {
        let total = 0;
        cartProducts.map(product => (total += product.quantity))
        return total;
    }

    return (
        <>
            <nav className="navlinks-container">

                <Link className="navlink" to={generatePath("userProfile")}>
                    <FaUser className="icon" />
                    {userData.username}
                </Link>
                <Link className="navlink" to={generatePath("cart")}>
                    <BsBasket2Fill className="icon"/>
                    <h4>{totalProducts() > 0 ? totalProducts() : ''} Items</h4>
                </Link>

                <div className="navlink">
                    <ThemeSwitcher />
                </div>
            </nav>
        </>
    )
}

export default NavBar