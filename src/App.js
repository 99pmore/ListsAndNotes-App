import { useState } from "react";

import { Form } from "./components/Form";
import { Content } from "./components/Content";
import { Login } from "./components/Login";

function App() {

    const [user, setUser] = useState()

    return (
        <div className="App">
            <Login setUser={ setUser } />
            <Form user={ user } />
            <Content user={ user } />
        </div>
    )
}

export default App;
