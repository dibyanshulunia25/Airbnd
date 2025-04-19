import { useEffect, useState } from "react";
import AccountNavigation from "../AccountNavigation";
import axios from "axios";
import { differenceInCalendarDays, format } from "date-fns";
import { Link } from "react-router-dom";

export default function BookingsPage() {
    const [bookings, setBookings] = useState([]);
    useEffect(()=>{
        axios.get('/bookings', {withCredentials: true})
        .then(({data})=>{
            setBookings(data);
        })

    },[])
    return (
        <div>
            <AccountNavigation />
            <div>
                {bookings.length > 0 && bookings.map(booking => (
                    <Link to={`/account/bookings/${booking._id}`} key={booking._id} className="flex cursor-pointer bg-gray-100 p-4 rounded-2xl mt-4 gap-4">
                        <div className="flex w-52 h-42">
                            {booking.place?.addedPhotos?.[0] && (
                                <img className="object-cover rounded-2xl" src={'http://localhost:4000/uploads/'+booking.place?.addedPhotos?.[0]} alt="" />
                            )}
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{booking.place.title}</h2>
                            <p className="text-sm mt-2 text-gray-500">{format(new Date(booking.checkIn), 'yyyy.MM.dd')} to {format(new Date(booking.checkOut), 'yyyy.MM.dd')}</p>
                        <div>
                            <p>Number of Nights: {differenceInCalendarDays(new Date(booking.checkOut), new Date(booking.checkIn))}</p>
                            <p className="text-xl font-semibold">${booking.price}</p>
                            <p className="text-sm mt-2 text-gray-500">Total Price</p>
                        </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    )
}