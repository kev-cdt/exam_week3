import ProductsList from "../../component/ProductsList/productsList"
import { useSelector } from "react-redux";
import { fecthErrors } from "../../store/selector/selector";

const Home = () => {
    const errors = useSelector(fecthErrors);

    return (
        <div>
            <h2 className="error-message">{errors}</h2>
            <ProductsList/>
        </div>
    )
}
export default Home