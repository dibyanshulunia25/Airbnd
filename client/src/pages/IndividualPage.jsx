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
    if (showAllPhotos) {
        return (
            <div className="mt-6 flex flex-col gap-4">
                <h1 className="flex justify-between items-center text-3xl font-bold">{place.title}
                    <button
                        onClick={() => setShowAllPhotos(false)}
                        className="flex gap-2 items-center mt-4 bg-primary text-white py-2 px-4 rounded-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>

                        Back
                    </button>
                </h1>

                <div className="grid grid-cols-1 gap-4">
                    {place.addedPhotos?.map(photo => (
                        <img 
                            key={photo}
                            src={'http://localhost:4000/uploads/' + photo}
                            alt=""
                            z style={{ width: "90rem", height: "35rem", objectFit: "cover", alignItems: "center", justifyContent: "center", display: "flex", margin: "auto" }}
                        />
                    ))}
                </div>

            </div>
        );
    }

    return (
        <div className="mt-8 py-5 border-t-2 border-opacity-5 px-2 lg:px-5 bg-opacity-10 bg-slate-300" >
            {/* Photo Gallery */}
            <div className="realtive" style={{ height: "30rem" }}>
                <div className="grid grid-cols-[2fr_1fr] gap-2 rounded-3xl" style={{ height: "30rem", overflow: "hidden" }}>
                    <div className="">
                        {
                            place.addedPhotos?.[0] && (
                                <img onClick={()=>setShowAllPhotos(true)}  style={{ height: "30rem", width: "100%",cursor:"Pointer", objectFit: "cover" }} src={'http://localhost:4000/uploads/' + place.addedPhotos[0]} alt="" />
                            )
                        }
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                        {
                            place.addedPhotos?.[1] && (
                                <img onClick={()=>setShowAllPhotos(true)}  style={{ height: "15rem", width: "100%",cursor:"Pointer", objectFit: "cover" }} src={'http://localhost:4000/uploads/' + place.addedPhotos[1]} alt="" />
                            )
                        }
                        {
                            place.addedPhotos?.[2] && (
                                <img onClick={()=>setShowAllPhotos(true)}  style={{ height: "15rem", width: "100%",cursor:"Pointer", objectFit: "cover" }} src={'http://localhost:4000/uploads/' + place.addedPhotos[2]} alt="">
                                </img>
                            )
                        }
                    </div>
                </div>
                <button onClick={() => setShowAllPhotos(true)} className="flex gap-2  absolute right-16 bottom-40 bg-white bg-opacity-50 hover:bg-opacity-100 px-4 py-2 rounded-2xl shadow-black">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>


                    More</button>
            </div>

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