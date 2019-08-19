import React, { useState, useEffect, Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import Moment from 'react-moment';
import moment from 'moment';


const Calendar = () => {
  const [showResult, setShowResult] = useState(false);
  const [action, setAction] = useState(0);
  const [bookings, setBookings] = useState(null);
  const { getTokenSilently } = useAuth0();

  const groupByApply = (key, applyKey) => array =>
    array.reduce((objectsByKeyValue, obj) => {
      const value = applyKey(obj[key]);
      objectsByKeyValue[value] = (objectsByKeyValue[value] || []).concat(obj);
      return objectsByKeyValue;
    }, {});

  const applyDateKey = key => {
    let d = new Date(key);
    return moment(d).format("MMM DD YYYY");
  };

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
      let booking = groupByApply('start_date', applyDateKey)(data);
      setBookings(booking);
    } catch (error) {
      console.error(error);
    }
  };

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

    callApi();

  }, [action]);

  return (
    <>
      <h1>Bookings</h1>
      &nbsp;<Link to="/booking/create"> +Create</Link>&nbsp;

      {showResult && bookings && Object.keys(bookings).map(key => (
        <Fragment key={'fragment' + key}>
          <div>{key}</div>
          <ul key={'ul' + key} className="bookings">
            { bookings[key].map(b => (
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
            ))}
          </ul>
        </Fragment>
        ))}
    </>
  );
};

export default Calendar;