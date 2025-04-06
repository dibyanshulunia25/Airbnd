import { useContext, useState } from "react";
import { UserContext } from "../UserContext";
import { Link, Navigate, useParams } from "react-router-dom";
import axios from "axios";

export default function Account() {
    const {ready, user , setUser} = useContext(UserContext);
    const [toHome, setToHome] = useState(null);
    let { subpage } = useParams();

    if (subpage === undefined) {
        subpage = 'profile';
    }

    async function logout(){
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
        

    function LinkClasses(type = null) {
        let classes = "py-2 px-6 rounded-full";
        if (type === subpage) {
            classes += " bg-primary text-white";
        } else {
            classes += " bg-gray-200 text-gray-700";
        }
        return classes;
    }

    if (toHome) {
        return <Navigate to={toHome} />
    }
    return (
        <div>
            <nav className="w-full flex mt-8 gap-4 justify-center" style={{ paddingRight: "5.25rem" }}>
                <Link className={LinkClasses("profile")} to={'/account'}>My Profile</Link>
                <Link className={LinkClasses("bookings")} to={'/account/bookings'}>My Bookings</Link>
                <Link className={LinkClasses("places")} to={'/account/places'}>My Accommodations</Link>
            </nav>
            {subpage === 'profile' && (
                <div className="text-center max-w-lg mx-auto mt-6">
                    <h2 className="text-2xl font-semibold">Your Profile</h2>
                    <p className="mt-2 text-gray-600">Name: {user.name}</p>
                    <p className="mt-1 text-gray-600">Email: {user.email}</p>
                    <button onClick={logout} className="bg-primary px-10 py-2 mt-8 rounded-full">Logout</button>
                </div>
            )}
        </div>
    )
}