import React, { useEffect, useState } from 'react';
import "../hojas.css";
import { doc, getDoc } from "firebase/firestore";
import db from '../../firebase/db';

export default function Publicacion({ publicacion }) {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    if (publicacion.IdUsuario) {
      const docRef = doc(db, "Users", publicacion.IdUsuario);
      getDoc(docRef)
        .then((res) => {
          setUsuario({ ...res.data(), id: res.id });
          setLoading(false); 
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          setLoading(false);
        });
    }
  }, [publicacion.IdUsuario]); 

  if (loading) {
    return <div>Cargando...</div>; 
  }

  return (
    <div id="publicacion">
      <div id='usuario'>
        <h5>Usuario:</h5>
        <h4>{usuario ? usuario.Nombre : 'Usuario no disponible'}</h4>
      </div>
      <div id='titulo'>
        <h5>Título:</h5>
        <h4>{publicacion.Titulo}</h4>
      </div>
      <div id='descripcion'>
        <h5>Descripción:</h5>
        <p>{publicacion.Descripción}</p>
      </div>
    </div>
  );
}
