import React, { useState, useEffect } from "react";
import { useAuth0 } from "../react-auth0-spa";
import { Link } from "react-router-dom";
import BookingForm from "../components/BookingForm";
// import "../App.css";

const Booking = (props) => {
  const [showResult, setShowResult] = useState(false);
  const [showSubmitResult, setShowSubmitResult] = useState({});
  const [booking, setBooking] = useState(null);
  const { getTokenSilently } = useAuth0();

  useEffect(() => {

    const callDetailsApi = async () => {
      try {

        const token = await getTokenSilently();
        console.log('call callDetailsApi', token);

        const response = await fetch("/api/" + props.match.params.id, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        const responseData = await response.json();
        console.log('callDetailsApi, response', responseData);
        setBooking(responseData.data);
        setShowResult(responseData.success);
      } catch (error) {
        console.error(error);
      }
    };

    callDetailsApi();
  }, [getTokenSilently, showResult]);

  const callUpdateApi = async (b) => {
    try {
      setShowSubmitResult({});
      const token = await getTokenSilently();
      console.log('call callUpdateApi', token);
      const body = {...b};
      const response = await fetch("/api/" + props.match.params.id + "/update", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      const responseData = await response.json();
      setShowSubmitResult(responseData);
      if (responseData.success) props.history.push('/bookings');
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <>
      <h1>Booking</h1>
      <Link to="/bookings" >{`<< Cancel`}</Link>&nbsp;
      {/*<button onClick={callDetailsApi}>Details</button>&nbsp;*/}
      { showResult && !showSubmitResult.success && <BookingForm booking={booking} onSubmit={(b)=> callUpdateApi(b)} /> }

      <div>{ showSubmitResult.error }</div>
    </>
  );
};

export default Booking;