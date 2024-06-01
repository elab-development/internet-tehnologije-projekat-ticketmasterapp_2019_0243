import React from "react";
import "./AboutUs.css";

const AboutUsPage: React.FC = () => {
  return (
    <div className="about-us">
      <div className="about-us-text">
        <div className="about-us-header">
          <h1>About Us</h1>
          <p>
            Welcome to TicketMasterApp, your go-to destination for purchasing
            tickets to the hottest events around the globe!
          </p>
        </div>
        <div className="about-us-content">
          <p>
            At TicketMasterApp, we're passionate about connecting people with
            unforgettable experiences. Whether you're looking for tickets to
            concerts, sports events, theater performances, or any other live
            entertainment, we've got you covered.
          </p>
          <p>
            Our platform offers a seamless and secure ticket-buying experience,
            allowing you to browse, select, and purchase tickets with ease. With
            a wide range of events to choose from and convenient payment
            options, finding and purchasing tickets has never been easier.
          </p>
          <p>
            Customer satisfaction is our top priority, and we're dedicated to
            providing exceptional service every step of the way. Our team is
            here to assist you with any questions or concerns you may have,
            ensuring that your ticket-buying experience is stress-free and
            enjoyable.
          </p>
        </div>
      </div>
      <div className="about-us-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.301518336937!2d20.434251976887314!3d44.815421671070695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a6561b07e996d%3A0x9cbd91b38965be24!2sTicket%20Vision%20d.o.o.!5e0!3m2!1sen!2srs!4v1715883734478!5m2!1sen!2srs"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default AboutUsPage;
