import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../store/slice/productsSlice';
import { products } from '../../store/selector/selector';
import Product from '../Product/product';

const ProductsList = () => {
    const dispatch = useDispatch()
    const productList = useSelector(products);
    // const productLoadingState = useSelector(selectPostLoadingState)
    // console.log(productList);

    useEffect(()=> {
        dispatch(fetchProducts());
    }, [])

    // return (
    //     <>
    //         {
    //             productLoadingState === 'pending' ?
    //             <Loader />
    //             :
    //             productLoadingState === "error" ?
    //                 <div>Oups</div>
    //                 :
    //                 <ul>
    //                     {products.map(product => (
    //                     <li key={product.id}>
    //                         <h3>{product.title} </h3>
    //                         <h4>{product.price} </h4>
    //                         <p>{product.description}</p>
    //                         <img src={product.image}/>
    //                         <button onClick={() => {}}>Add to cart</button>
    //                     </li>
    //                     ))}
    //                 </ul>
    //         }
    //     </>
    // )

    return (
        <div className='productlist-container'>
            <ul className='product-grid'>
                {productList.map(product => (
                    <Product key={product.id} {...product} />
                ))}
            </ul>
        </div>
        );
}

export default ProductsList;