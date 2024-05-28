import { FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";

import { BsBasket2Fill } from "react-icons/bs";
import ThemeSwitcher from "../ThemeSwitcher/themeSwitcher.jsx";
import { user, cart } from "../../store/selector/selector";

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
                <ul>
                    <FaUser />
                    {userData.username}
                </ul>
                <ul>
                    <BsBasket2Fill />
                    <h4>{totalProducts() > 0 ? totalProducts() : ''} Items</h4>
                </ul>
                <ul>
                    <ThemeSwitcher/>
                </ul>
            </nav>
        </>
    )
}

export default NavBar