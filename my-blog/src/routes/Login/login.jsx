import "../hojas.css"
import React from 'react'
import {signInWithEmailAndPassword} from "firebase/auth"
import auth from "../../firebase/auth"
import {useForm} from "react-hook-form"
import {useNavigate} from "react-router-dom"

export default function login() {
    const navegarTo = useNavigate();
    const {register, handleSubmit} = useForm();

    const enviar = async (data) => {
        try {
            await signInWithEmailAndPassword(auth, data.email, data.password);
            navegarTo("/home")
        } catch (error) {
            if (error.code === 'auth/wrong-password') {
                alert("La contraseña es incorrecta");
            } else if (error.code === 'auth/user-not-found') {
                alert("El usuario no fue encontrado");
            } else {
                alert("Error desconocido: " + error.message);
            }
        }
    };
    
    return (
        <div id="login-form">
            <div id="login-header">
                <h2>Login</h2>
            </div>
            <hr />
            <form onSubmit={handleSubmit(enviar)}>
                <div className="form-group">
                    <label htmlFor="email">Correo Electrónico</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        {...register("email")}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="password">Contraseña</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        {...register("password")}
                    />
                </div>
                <button type="submit">Enviar</button>
            </form>
        </div>
    );
}
