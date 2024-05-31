import { Routes, Route } from 'react-router-dom'
import { routes } from './config/routes.config'
import Header from './component/Header/header'
import './index.scss'

function App() {
  const routeKeys = Object.keys(routes)

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
