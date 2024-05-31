import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../../store/slice/productsSlice";
import { products } from "../../store/selector/selector";
import Product from "../Product/product";

const ProductsList = () => {
  const dispatch = useDispatch();
  const productList = useSelector(products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  return (
    <div className="productlist-container">
      <ul className="product-grid">
        {productList.map((product) => (
          <Product key={product.id} {...product} />
        ))}
      </ul>
    </div>
  );
};

export default ProductsList;