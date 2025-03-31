import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function RegisterPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    async function register(ev) {
        ev.preventDefault();
        try{
            await axios.post('/register',{
                name,
                email,
                pass,
            });
            alert('Registered successfully');
        }catch(e){
            alert('Failed to register');
    }}
    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="mb-48">
                <h1 className="text-4xl text-center">Register</h1>
                <form className="max-w-md mx-auto mt-4" onSubmit={register}>
                    <input type="text" placeholder="Enter your name" value={name} onChange={ev => setName(ev.target.value)} />
                    <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)} />
                    <input type="password" placeholder="password" value={pass} onChange={ev => setPass(ev.target.value)} />
                    <button className="login">Register</button>
                    <div className="text-center mt-1 text-gray-500">
                        Already have an account? <Link to={'/login'}><span className="underline hover:text-primary">Login</span></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}