import { UserInfo } from "./UserInfo";

import { auth } from "../config/firebase";
import { signInWithRedirect, GoogleAuthProvider, signOut } from "firebase/auth";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import logo from "../assets/logo-light.webp"

export const Login = ({ user, setUser }) => {

    const provider = new GoogleAuthProvider()

    const login = () => {
        signInWithRedirect(auth, provider)
        .then((result) => {
            setUser(result.user)
        })
        .catch((error) => {
            const errorMsg = error.message
            alert(errorMsg)
        })
    }

    const logout = () => {
        signOut(auth).then(() => {
            setUser()
          }).catch((error) => {
            const errorMsg = error.message
            alert(errorMsg)
          })
    }

    return (
        <div className="container">

            <div className="logo">
                <img src={ logo } alt="Logo" />
                <h1>Jot-It</h1>
            </div>

            {
                !user ?
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