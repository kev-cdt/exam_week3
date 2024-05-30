import Home from "../page/Home/home";
import Cart from "../page/Cart/cart";
import UserProfile from "../page/UserProfile/userProfile";


export const routes = {
    home: {
        label: "Home",
        path: '/',
        element: <Home />,
    },
    cart: {
        label: 'Cart',
        path: '/cart',
        element: <Cart />,
    },
    userProfile: {
        label: 'userProfile',
        path: '/user',
        element: <UserProfile />,
    },
    redirect: {
        label: "Home",
        path: '*',
        element: <Home />,
    },
}

export const generatePath = (name, params = null) => {
    if (!params) {
        return routes[name].path
    }
    let path = routes[name].path
    params.forEach(({name, value}) => {
        path = path.replace(`:${name}`, value)
    })
    return path;
}