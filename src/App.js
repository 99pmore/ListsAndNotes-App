import { useState, useEffect } from "react";

import { Form } from "./components/Form";
import { Content } from "./components/Content";
import { Login } from "./components/Login";
import { Loader } from "./components/Loader";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";

function App() {

    const [user, setUser] = useState()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        onAuthStateChanged(auth, user => {
            if (user) {
                setUser(user);
            } else {
                setUser();
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
            <Login user={user} setUser={setUser} />
            <Form user={user} />
            <Content user={user} loading={loading} setLoading={setLoading} />
        </div>
    )
}

export default App;
