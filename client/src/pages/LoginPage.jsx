import axios from "axios";
import { useContext, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "../UserContext";
export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const [redirect, setRedirect] = useState(false);

    const { setUser } = useContext(UserContext);
    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            const { data } = await axios.post('/login', {
                email,
                pass,
            }, { withCredentials: true });
            setUser(data);
            alert('Logged in successfully');
            setRedirect(true);
        } catch (e) {
            alert('Failed to login');
        }
    }

    if (redirect) {
        return <Navigate to={'/'} />
    }

    return (
        <div className="mt-4 grow flex items-center justify-center">
            <div className="mb-48">
                <h1 className="text-4xl text-center">Login</h1>
                <form className="max-w-md mx-auto mt-4" onSubmit={handleLoginSubmit}>
                    <input type="email" placeholder="your@email.com" value={email} onChange={ev => setEmail(ev.target.value)} required />
                    <input type="password" placeholder="password" value={pass} onChange={ev => setPass(ev.target.value)} required />
                    <button className="login">Login</button>
                    <div className="text-center mt-1 text-gray-500">
                        Don't have an account yet? <Link to={'/register'}><span className="underline hover:text-primary">Register now</span></Link>
                    </div>
                </form>
            </div>
        </div>
    );
}