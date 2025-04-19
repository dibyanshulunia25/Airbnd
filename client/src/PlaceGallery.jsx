import { useState } from "react";

export default function PlaceGallery({ place }) {
    const [showAllPhotos, setShowAllPhotos] = useState(false);
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
                            style={{ width: "90rem", height: "35rem", objectFit: "cover", alignItems: "center", justifyContent: "center", display: "flex", margin: "auto" }}
                        />
                    ))}
                </div>

            </div>
        );
    }
    return (
        <div className="realtive" style={{ height: "30rem" }}>
            <div className="grid grid-cols-[2fr_1fr] gap-2 rounded-3xl" style={{ height: "30rem", overflow: "hidden" }}>
                <div className="">
                    {
                        place.addedPhotos?.[0] && (
                            <img onClick={() => setShowAllPhotos(true)} style={{ height: "30rem", width: "100%", cursor: "Pointer", objectFit: "cover" }} src={'http://localhost:4000/uploads/' + place.addedPhotos[0]} alt="" />
                        )
                    }
                </div>
                <div className="grid grid-cols-1 gap-2">
                    {
                        place.addedPhotos?.[1] && (
                            <img onClick={() => setShowAllPhotos(true)} style={{ height: "15rem", width: "100%", cursor: "Pointer", objectFit: "cover" }} src={'http://localhost:4000/uploads/' + place.addedPhotos[1]} alt="" />
                        )
                    }
                    {
                        place.addedPhotos?.[2] && (
                            <img onClick={() => setShowAllPhotos(true)} style={{ height: "15rem", width: "100%", cursor: "Pointer", objectFit: "cover" }} src={'http://localhost:4000/uploads/' + place.addedPhotos[2]} alt="">
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
    )
}