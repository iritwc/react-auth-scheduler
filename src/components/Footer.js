import React from "react";

const Footer = () => (
  <footer className="bg-light p-3 text-center">
    {/*<div className="logo" />*/}
    <h1>Scheduler built with React</h1>
    <p>
      Data base used: MongoDB with Mongoose ORM
    </p>
    <p>
      Authentication provided by third party <a href="https://auth0.com">Auth0</a>
    </p>
  </footer>
);

export default Footer;
