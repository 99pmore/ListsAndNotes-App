import { useState, useEffect } from "react";

import { Form } from "./components/Form";
import { Content } from "./components/Content";
import { Login } from "./components/Login";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

function App() {

    const [user, setUser] = useState()

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser(null);
            }
        })
    }, [])

    useEffect(() => {
        if (user) {
            localStorage.setItem("user", JSON.stringify(user));
        } else {
            localStorage.removeItem("user");
        }
    }, [user])

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        setUser(user);
    }, [])

    return (
        <div className="App">
            <Login user={ user } setUser={ setUser } />
            <Form user={ user } />
            <Content user={ user } />
        </div>
    )
}

export default App;
