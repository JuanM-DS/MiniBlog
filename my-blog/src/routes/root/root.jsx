import React, { useState, useEffect } from 'react';
import '../hojas.css'; 
import { Link, Outlet} from 'react-router-dom';
import "../hojas.css"
import {signOut, getAuth, onAuthStateChanged} from "firebase/auth"
import auth from "../../firebase/auth"

export default function Menu() {

  const [user, setUsuario] = useState(null);

  const cerrarSesion = async() =>{
    await signOut(auth);
  }

  useEffect(()=>{
    onAuthStateChanged(auth, (usuario)=>{
      setUsuario(usuario);
    })
  },[])

    return (
      <>
      <nav id="main-nav">
        <ul className="nav-list">
            <li className="nav-item"><Link to="/home">Home</Link></li>
            {!user?(
              <>
                <li className="nav-item"><Link to="/">Iniciar Sesión</Link></li>
                <li className="nav-item"><Link to="/registro">Registrarse</Link></li>
              </>
            ):(
              <>
                <li className="nav-item"><Link to="/crearPublicacion">Crear Publicación</Link></li>
                <li className="nav-item"><Link onClick={cerrarSesion}>Cerrar Sesión</Link></li>
              </>
            )}
        </ul>
      </nav>
      <div id="contenedor">
        <Outlet />
      </div>
      </>
    );
}
