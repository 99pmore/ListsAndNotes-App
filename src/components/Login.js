import { useState } from "react";
import { UserInfo } from "./UserInfo";

import { auth } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";

export const Login = ({ user, setUser }) => {

    const [isLogged, setIsLogged] = useState()

    const provider = new GoogleAuthProvider()

    const login = () => {
        signInWithPopup(auth, provider)
        .then((result) => {
            setUser(result.user)
            setIsLogged(true)
        })
        .catch((error) => {
            const errorMsg = error.message
            alert(errorMsg)
        })
    }

    const logout = () => {
        signOut(auth).then(() => {
            setUser()
            setIsLogged(false)
          }).catch((error) => {
            const errorMsg = error.message
            alert(errorMsg)
          })
    }

    return (
        <div className="container">

        {
            !isLogged ?
                <div className="not-logged">
                    <button onClick={ login }>Iniciar sesión</button>
                </div>
            : 
                <div className="logged">
                    <UserInfo user={ user } />
                    <button onClick={ logout }><FontAwesomeIcon icon={ faArrowRightToBracket } /></button>
                </div>
        }

        </div>
    )
}