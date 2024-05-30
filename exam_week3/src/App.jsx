import { Routes, Route } from 'react-router-dom'
import { routes } from './config/routes.config'
import Header from './component/Header/header'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import './index.scss'
import { fetchProducts } from './store/slice/productsSlice'

function App() {
  const routeKeys = Object.keys(routes)

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts())
  }, []);

  return (
    <Routes>
      <Route element={<Header/>}>
      {
            routeKeys.map(key => {
              return <Route key={key} path={routes[key].path} element={routes[key].element} />
            })
          }
      </Route>
    </Routes>
  )
}

export default App
