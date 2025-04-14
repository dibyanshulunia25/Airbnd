import { Link } from "react-router-dom";
import AccountNavigation from "../AccountNavigation";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PlacesPage() {
    const [places, setPlaces] = useState([]);
    useEffect(()=>{
        axios.get('/user-places', {withCredentials: true})
        .then(({data})=>{
            setPlaces(data);
        })
    },[])
    return (
        <div>
            <AccountNavigation />
                <div className="text-center mt-6 " style={{ marginRight: "75px" }}>
                    <Link to={'/account/places/new'} className="inline-flex bg-primary text-white py-2 px-4 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 mr-2">
                            <path fillRule="evenodd" d="M12 3.75a.75.75 0 0 1 .75.75v6.75h6.75a.75.75 0 0 1 0 1.5h-6.75v6.75a.75.75 0 0 1-1.5 0v-6.75H4.5a.75.75 0 0 1 0-1.5h6.75V4.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
                        </svg>
                        Add new place
                    </Link>
                </div>
                <div>
                    {places.length>0 && places.map(place => (
                        <Link to={'/account/places/'+place._id} key={place._id} className="flex cursor-pointer bg-gray-100 p-4 rounded-2xl mt-4 gap-4">
                            <div className="flex w-32 h-32 shrink-0">
                                {place.addedPhotos?.[0] && (
                                    <img className="object-cover rounded-2xl" src={'http://localhost:4000/uploads/'+place.addedPhotos?.[0]} alt="" />
                                )}
                            </div>
                            <div className="grow-0 shrink">
                                <h2 className="text-xl">{place.title}</h2>
                                <p className="text-sm mt-2 text-gray-500">{place.description}</p>
                            </div>
                        </Link>
                    ))}
                </div>
        </div>
    )
}