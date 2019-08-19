import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Container } from "reactstrap";

import PrivateRoute from "./components/PrivateRoute";
import Loading from "./components/Loading";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import Home from "./views/Home";
import Bookings from "./views/Bookings";
import Calendar from "./views/Calendar";
import Booking from "./views/Booking";
import BookingCreate from "./views/BookingCreate";
import Profile from "./views/Profile";
import { useAuth0 } from "./react-auth0-spa";

// styles
import "./App.css";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

const App = () => {
  const { loading } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  return (
    <Router>
      <div id="app" className="d-flex flex-column h-100">
        <NavBar />
        <Container className="flex-grow-1 mt-5">
          <Switch>
            <Route path="/" exact component={Home} />
            <PrivateRoute path="/profile" component={Profile} />
            <PrivateRoute path="/bookings" component={Bookings} />
            <PrivateRoute path="/calendar" component={Calendar} />
            <PrivateRoute path="/booking/create" exact component={BookingCreate} />
            <PrivateRoute path="/booking/:id" component={Booking} />
          </Switch>
        </Container>
        <Footer />
      </div>
     </Router>
   );
 };

 export default App;