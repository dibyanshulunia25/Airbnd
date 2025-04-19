// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";

// export default function IndividualPage() {
//     const { id } = useParams();
//     const [place,setPlace]=useState(null);
//     useEffect(()=>{
//         if(!id) return;
//         axios.get('/places/'+id).then(({data})=>{
//             setPlace(data);
//         })
//     },[id])
//     return (
//         <div className="mt-6 ">
//             {/* <h1>Individual Page {id}</h1> */}
//             {place && (
//                 <div className="flex flex-col gap-4">
//                     <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
//                         {place.addedPhotos?.map(photo => (
//                             <img  key={photo} src={'http://localhost:4000/uploads/' + photo} alt="" className="object-cover rounded-lg" />
//                         ))}
//                     </div>
//                     <h2 className="text-2xl">{place.title}</h2>
//                     <p className="text-sm mt-2 text-gray-500">{place.description}</p>
//                 </div>
//             )}
//         </div>
//     )
// }

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BookingWidget from "../BookingWidget";
import PlaceGallery from "../PlaceGallery";

export default function IndividualPage() {
    const { id } = useParams();
    const [place, setPlace] = useState(null);
    const [showAllPhotos, setShowAllPhotos] = useState(false);

    useEffect(() => {
        if (!id) return;
        axios.get('/places/' + id).then(({ data }) => {
            setPlace(data);
        });
    }, [id]);

    if (!place) return <div>Loading...</div>;
  

    return (
        <div className="mt-8 py-5 border-t-2 border-opacity-5 px-2 lg:px-5 bg-opacity-10 bg-slate-300" >
            {/* Photo Gallery */}
           <PlaceGallery place={place} />
            {/* Title and Address */}
            <div className="mt-6">
                <h1 className="text-3xl font-bold">{place.title}</h1>
                <a target="_blank" href={'https://maps.google.com/?q=' + place.address} className="text-gray-500 hover:text-blue-400 mt-2 underline">{place.address}</a>
            </div>

            {/* Description */}
            <div className="mt-6">
                <h2 className="text-2xl font-semibold">About this place</h2>
                <p className="text-gray-600 mt-2">{place.description}</p>
            </div>

            {/* Amenities */}
            <div className="mt-6">
                <h2 className="text-2xl font-semibold">What this place offers</h2>
                <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
                    {place.perks?.map(perk => (
                        <li key={perk} className="flex items-center gap-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-6 h-6 text-green-500"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10.293 15.707a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L10 13.586l5.293-5.293a1 1 0 011.414 1.414l-6 6z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            {perk}
                        </li>
                    ))}
                </ul>
            </div>

         <BookingWidget place={place} />
            {/* Additional Information */}
            <div className="mt-6 text-justify">
                <h2 className="text-2xl font-semibold">Additional Information</h2>
                <p className="text-gray-600 mt-2">{place.extraInfo}</p>
            </div>
        </div>
    );
}