// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useParams } from "react-router-dom"

// export default function BookingPage() {
//     const {id}=useParams();
//     const [booking, setBooking] = useState(null);
//     useEffect(()=>{
//         if(id){
//             axios.get('/bookings', {withCredentials: true})
//             .then(({data})=>{
//                 const foundBooking=data.find(({_id})=> _id===id)
//                 setBooking(foundBooking);
//         })
//         }
// },[id])


//     if (!booking) return '';

//     return (
//         <div className="mt-6 py-5 border-t-2 border-opacity-5 px-2 lg:px-5 bg-opacity-10 bg-slate-300" >
            
//             <h1 className="text-3xl">{booking.place.title}</h1>
//         </div>
//     )
// }

import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceGallery from "../PlaceGallery";

export default function BookingPage() {
    const { id } = useParams();
    const [booking, setBooking] = useState(null);

    useEffect(() => {
        if (id) {
            axios.get('/bookings', { withCredentials: true })
                .then(({ data }) => {
                    const foundBooking = data.find(({ _id }) => _id === id);
                    setBooking(foundBooking);
                });
        }
    }, [id]);

    if (!booking) return <div>Loading...</div>;

    return (
        <div className="">
            {/* Title and Address */}
            <div className="mb-6 mt-6">
                <h1 className="text-3xl font-bold">{booking.place.title}</h1>
                <a
                    target="_blank"
                    href={'https://maps.google.com/?q=' + booking.place.address}
                    className="text-gray-500 hover:text-blue-400 mt-2 underline"
                >
                    {booking.place.address}
                </a>
            </div>

            {/* Photo Gallery */}
                          <PlaceGallery place={booking.place} />
            

            {/* Booking Details */}
            <div className="mb-6 mt-6">
                <h2 className="text-2xl font-semibold">Booking Details</h2>
                <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                        <h3 className="text-lg font-semibold">Check-In</h3>
                        <p className="text-gray-600">{booking.checkIn}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Check-Out</h3>
                        <p className="text-gray-600">{booking.checkOut}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Guests</h3>
                        <p className="text-gray-600">{booking.numberOfGuests}</p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold">Total Price</h3>
                        <p className="text-gray-600">${booking.price}</p>
                    </div>
                </div>
            </div>

            {/* Description */}
            <div className="mb-6">
                <h2 className="text-2xl font-semibold">About this place</h2>
                <p className="text-gray-600 mt-2">{booking.place.description}</p>
            </div>
        </div>
    );
}