import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import Moment from 'react-moment';


const Bookings = () => {
  const [showResult, setShowResult] = useState(false);
  const [action, setAction] = useState(0);
  const [bookings, setBookings] = useState(null);
  const { getTokenSilently } = useAuth0();

  const callDeleteApi = async (id) => {
    try {

      setShowResult(false);
      const token = await getTokenSilently();

      const response = await fetch("/api/" + id + "/delete", {
        method: 'Delete',
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const responseData = await response.json();
      setAction(action + responseData.success);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {

    const callApi = async () => {
      try {
        const token = await getTokenSilently();

        const response = await fetch("/api", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const { success , data} = await response.json();
        setShowResult(success);
        setBookings(data);
      } catch (error) {
        console.error(error);
      }
    };
    callApi();

   }, [getTokenSilently, action]);

  return (
    <>
      <h1>Bookings</h1>
      &nbsp;<Link to="/booking/create"> +Create</Link>&nbsp;

      {showResult && <ul className="bookings">
        {bookings && bookings.map(b => (
            <li key={b._id} className={`room${b.room}`}>
              <Link to={`/booking/${b._id}`}>
                <h6>
                  {b.user_name}
                </h6>
                <p>Start: <Moment format="YYYY-MM-DD HH:mm">{b.start_date}</Moment></p>
                <p>End: <Moment format="YYYY-MM-DD HH:mm">{b.end_date}</Moment></p>
                <h6>Room: {b.room}</h6>
              </Link>
              <button className="delete" onClick={()=> callDeleteApi(b._id)}>-</button>
            </li>
          ))
        }
      </ul>}
    </>
  );
};

export default Bookings;