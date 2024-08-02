import React from 'react'
import "../hojas.css"
import {useForm} from "react-hook-form"
import {collection, addDoc} from "firebase/firestore"
import {createUserWithEmailAndPassword} from "firebase/auth"
import db from "../../firebase/db"
import auth from '../../firebase/auth'
import {useNavigate} from "react-router-dom"

export default function registro() {
    
    const navegarTo = useNavigate();

    const {register, handleSubmit} = useForm();

    const enviar = async(data)=>{
        const referencia = collection(db, "Users");

        try{
            await createUserWithEmailAndPassword(auth, data.Email, data.Contraseña)
            await addDoc(referencia, data);
            navegarTo("/home")
        }
        catch{
            alert("Algo salio mal al registrar el usuario")
        }
    }

  return (
    <div id="login-form">
        <div id="login-header">
            <h2>Registro</h2>
        </div>
        <hr />
        <form onSubmit={handleSubmit(enviar)}>
            <div className="form-group">
                <label htmlFor="nombre">Nombre</label>
                <input type="text" id="nombre" required {...register("Nombre")}/>
            </div>
            <div className="form-group">
                <label htmlFor="apellido">Apellido</label>
                <input type="text" id="apellido" required {...register("Apellido")}/>
            </div>
            <div className="form-group">
                <label htmlFor="email">Correo Electrónico</label>
                <input type="email" id="email" required {...register("Email")}/>
            </div>
            <div className="form-group">
                <label htmlFor="password">Contraseña</label>
                <input type="password" id="password" required {...register("Contraseña")}/>
            </div>
            <button type="submit">Enviar</button>
        </form>
    </div>
  )
}
