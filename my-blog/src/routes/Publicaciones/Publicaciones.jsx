import React, { useEffect, useState } from 'react';
import Publicacion from './Publicacion';
import {collection, getDocs } from "firebase/firestore"
import db from "../../firebase/db"
import "../hojas.css"

export default function Publicaciones() {
    const [publicaciones, setPublicaciones] = useState([]);

    useEffect(()=>{
        const publicacionesRef = collection(db, "Post")

        getDocs(publicacionesRef)
        .then((res)=>{
            setPublicaciones(
                res.docs.map((doc)=>{
                    return {...doc.data(), id: doc.id}
                })
            )
        })
    },[])

    return (
        <div id='publicaciones'>
            {publicaciones.map((item)=> <Publicacion publicacion={item} key={item.id}/>)}
        </div>
    );
}
