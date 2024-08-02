import React, { useEffect, useState } from 'react';
import "../hojas.css";
import { useForm } from "react-hook-form";
import { collection, addDoc, getDocs, query, where } from "firebase/firestore";
import db from '../../firebase/db';
import { useNavigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import auth from "../../firebase/auth";

export default function CrearPublicacion() {
    const navegarTo = useNavigate();
    const [user, setUsuario] = useState(null);
    const [currentUserId, setcurrentUserId] = useState(null);
    const { register, handleSubmit } = useForm();

    const enviar = async (data) => {
        if (currentUserId) {
            data.IdUsuario = currentUserId;

            const referencia = collection(db, "Post");
            
            try {
                await addDoc(referencia, data);
                navegarTo("/home");
            } catch (error) {
                alert(error.message);
            }
        } else {
            alert("No se pudo obtener el ID del usuario");
        }
    };

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (usuario) => {
            if (usuario) {
                setUsuario(usuario);
            } else {
                setUsuario(null);
            }
        });

        return () => unsub(); 
    }, []);

    useEffect(() => {
        if (user) {
            const referencia = collection(db, "Users");
            const q = query(referencia, where("Email", "==", user.email));

            getDocs(q)
                .then((res) => {
                    if (res.docs.length > 0) {
                        const id = res.docs[0].id;
                        setcurrentUserId(id);
                    } else {
                        alert("No se encontró el usuario en la base de datos");
                    }
                })
                .catch((error) => {
                    console.error("Error al buscar el usuario: ", error);
                });
        }
    }, [user]);

    return (
        <div id="login-form">
            <div id="login-header">
                <h2>Crear publicación</h2>
            </div>
            <hr />
            <form onSubmit={handleSubmit(enviar)}>
                <div className="form-group">
                    <label htmlFor="titulo">Título</label>
                    <input type="text" id="titulo" required {...register("Titulo")} />
                </div>
                <div className="form-group">
                    <label htmlFor="descripcion">Descripción</label>
                    <textarea type="text" id="descripcion" required {...register("Descripción")} ></textarea>
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
