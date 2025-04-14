import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function IndexPage() {
    const [places, setPlaces] = useState([]);
    useEffect(() => {
        axios.get('/places').then((response) => {
            setPlaces(response.data);
        })
    }, [])
    return (
        <div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 cursor-pointer gap-x-6 gap-y-10">
            {
                places.length > 0 && places.map(place => (
                    <Link to={'/place/'+place._id} key={place._id} className=" bg-gray-50 p-4 rounded-3xl mt-4 " >
                        <div className="flex w-42 h-42 shrink-0">
                            {place.addedPhotos?.[0] && (
                                <img className="object-cover rounded-2xl" src={'http://localhost:4000/uploads/' + place.addedPhotos?.[0]} alt="" />
                            )}
                        </div>
                        <div className="px-3 grow-0 shrink">
                            <h2 className="text-xl text-center pt-2">{place.title}</h2>
                            <p className="text-sm mt-2 text-gray-400 truncate">{place.description}</p>
                        </div>
                        <div className="text-center mt-2 text-gray-600 font-bold">
                            ${place.price} per night
                        </div>
                    </Link>
                ))
            }
            </div>
        </div>
    );
}