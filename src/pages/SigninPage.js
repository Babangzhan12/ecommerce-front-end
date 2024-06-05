import React, { useState } from "react";
import { useAuth } from "../auth/useAuth";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import { Button } from "primereact/button";

const SigninPage = () => {

    const [username, setUsername] = useState("");
    const [password, setPassworrd] = useState("");

    const {signin} = useAuth();

    const isValidForm = () => {
        return username.length > 0 && password.length > 0;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        await signin(username,password);
    }

    return(
        <div className="login-panel">
            <form onSubmit={handleSubmit}>
                <h1>Login</h1>
                <p>Masukan username dan password anda</p>

                <div className="mb-2">
                    <InputText value={username}
                        onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
                </div>

                <div className="mb-2">
                    <Password value={password} onChange={(e) => setPassworrd(e.target.value)} toggleMask feedback={false}
                    />
                </div>

                <div>
                    <Button type="submit" disabled={!isValidForm}>Sign In</Button>
                </div>
            </form>
        </div>
    )
}

export default SigninPage;