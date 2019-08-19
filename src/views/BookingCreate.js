import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import BookingForm from "../components/BookingForm";
import { Link } from "react-router-dom";


const Booking = (props) => {
  const [showResult, setShowResult] = useState({});
  const { getTokenSilently, user } = useAuth0();

  const callCreateApi = async (b) => {
    try {
      setShowResult({});
      const token = await getTokenSilently();
      const body = {...b};
      body.user_name = user.nickname;
      body.user_email = user.email;
      const response = await fetch("/api/create", {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
      });

      const responseData = await response.json();
      setShowResult(responseData);
      if (responseData.success) props.history.push('/bookings');
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <>
      <h1>New Booking</h1>
      <Link to="/bookings" >{`<< Cancel`}</Link>
      { !showResult.success && <BookingForm onSubmit={(b) => callCreateApi(b) } /> }
      { !showResult.success && (<div>{showResult.error}</div>)}
    </>
  );
};

export default Booking;