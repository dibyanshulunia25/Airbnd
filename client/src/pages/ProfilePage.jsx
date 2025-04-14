import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";
import PlacesPage from "./PlacesPage";
import AccountNavigation from "../AccountNavigation";

export default function Account() {
    const { ready, user, setUser } = useContext(UserContext);
    const [toHome, setToHome] = useState(null);
    let { subpage } = useParams();

    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout() {
        await axios.post('/logout');
        setToHome('/');
        setUser(null);
    }

    // let logout = async () => {
    //     await axios.post('/logout');
    //     setToHome('/');
    // }

    if (!ready) {
        return 'Loading...'
    }

    if (ready && !user && !toHome) {
        return <Navigate to={'/login'} />
    }


   

    if (toHome) {
        return <Navigate to={toHome} />
    }
    return (
        <div>
           <AccountNavigation />
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto mt-6">
                    <h2 className="text-2xl font-semibold">Your Profile</h2>
                    <p className="mt-2 text-gray-600">Name: {user.name}</p>
                    <p className="mt-1 text-gray-600">Email: {user.email}</p>
                    <button onClick={logout} className="bg-primary px-10 py-2 mt-8 rounded-full">Logout</button>
                </div>
            )}

            {subpage === 'places' && (
                <PlacesPage />

            )}
        </div>
    )
}