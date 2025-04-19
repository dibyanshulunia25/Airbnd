import {use, useContext, useEffect, useState } from "react"
import { differenceInCalendarDays } from "date-fns"
import axios from "axios";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";
export default function BookingWidget({ place }) {
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [numberOfGuests, setNumberOfGuests] = useState(1);
    const [name, setName] = useState('');
    const [phone, setphone] = useState('');
    const [redirect, setRedirect] = useState('');

    const {user} = useContext(UserContext);

    useEffect(() => {
        if (user) {
            setName(user.name);
            setphone(user.phone);
        }
    },[user])

    let numberOfNights = 0;
    if (checkIn && checkOut) {
        numberOfNights = differenceInCalendarDays(new Date(checkOut), new Date(checkIn));
    }

    async function handleBooking() {
        const response = await axios.post('/bookings', {
            place: place._id,
            price: numberOfNights * place.price,
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            phone
        }, { withCredentials: true });

        const bookingId = response.data._id;
        console.log(bookingId);
        setRedirect(`/account/bookings/${bookingId}`);
    }

    if (redirect) 
        return <Navigate to={redirect} />

    return (<>
        {/* Booking Section */}
        <div className="mt-6 bg-gray-100 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold">Book your stay</h2>
            <div className="flex justify-between items-center mt-4">
                <div>
                    <p className="text-xl font-bold">${place.price} <span className="text-gray-500">/ night</span></p>
                    <p className="text-gray-500 mt-1">Max guests: {place.maxGuests}</p>
                </div>
                <div>
                    Total Price:
                    {
                        numberOfNights > 0 && (
                            <span className="text-gray-500 font-bold">${numberOfNights * place.price}</span>
                        )
                    }
                </div>
                <button onClick={handleBooking} className="bg-primary text-white py-2 px-6 rounded-lg hover:bg-primary-dark">
                    Reserve
                </button>
            </div>
            <div>
                <div className="flex justify-around mt-3">

                    <label className="border-4 p-2 px-4 rounded-2xl" >
                        Check-In: &nbsp;
                        <input className="bg-transparent" type="date" value={checkIn} onChange={ev => setCheckIn(ev.target.value)} min={new Date().toISOString().split('T')[0]} />
                    </label>
                    <label className="border-4 p-2 rounded-2xl">
                        Check-Out: &nbsp;
                        <input className="bg-transparent" type="date" value={checkOut} onChange={ev => setCheckOut(ev.target.value)} min={checkIn || new Date().toISOString().split('T')[0]} />
                    </label>
                </div>
                <div>
                    <label className="font-bold">No. of guests</label>
                    <input type="text" value={numberOfGuests} onChange={ev => setNumberOfGuests(ev.target.value)} />
                </div>
            </div>
            {numberOfNights > 0 && (
                <div>
                    <label className="font-bold">Your Full Name</label>
                    <input type="text" value={name} onChange={ev => setName(ev.target.value)} />
                    <label className="font-bold">Your Mobile Number</label>
                    <input type="tel" value={phone} onChange={ev => setphone(ev.target.value)} />
                </div>
            )}

            {/* Check-in and Check-out */}
            <div className="mt-6 grid grid-cols-2 justify-items-center gap-4">
                <div>
                    <h3 className="text-lg font-semibold">Check-in</h3>
                    <p className="text-gray-600">{place.checkIn}:00 AM</p>
                </div>
                <div>
                    <h3 className="text-lg font-semibold">Check-out</h3>
                    <p className="text-gray-600">{place.checkOut}:00 PM</p>
                </div>

            </div>
        </div>
    </>
    )
}