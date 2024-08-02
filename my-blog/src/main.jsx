import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
//routes
import Route from "./routes/root/root.jsx"
import ErrorPage from './error-page.jsx'
import Login from "./routes/Login/login.jsx"
import Registro from './routes/Registro/registro.jsx'
import CrearPublicacion from './routes/CrearPublicacion/crearPublicacion.jsx'
import Home from "./routes/Home/home.jsx"

//router
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Route />,
    errorElement: <ErrorPage />,
    children:[
      {
        path: "/",
        element: <Login />
      },
      {
        path: "/registro",
        element: <Registro />
      },
      {
        path: "/crearPublicacion",
        element: <CrearPublicacion />
      },
      {
        path: "/home",
        element: <Home />
      },
    ],
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router= {router}/>
  </React.StrictMode>,
)
