import { auth } from "../config/firebase";
import { signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

export const Login = ({ setUser }) => {

    const provider = new GoogleAuthProvider()

    const login = () => {
        signInWithPopup(auth, provider)
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
            <button onClick={ login }>Iniciar sesión</button>
            <button onClick={ logout }>Cerrar sesión</button>
        </div>
    )
}