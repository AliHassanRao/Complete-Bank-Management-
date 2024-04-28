import React from "react";
import Layout from "./Layout.jsx";

const About = () => {
  const containerStyle = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  };

  const imageStyle = {
    width: "100%",
    borderRadius: "8px", // Add border-radius for a more aesthetic look
  };

  const textContainerStyle = {
    flex: "0 0 48%", // Adjust the width of the text container as needed
    marginTop: "2rem",
  };

  const textStyle = {
    textAlign: "justify",
  };

  return (
    <>
      <div className="row contactus container" style={containerStyle}>
        <div className="col-md-6">
          <img src="bank.jpg" alt="contactus" style={imageStyle} />
        </div>
        <div className="col-md-4" style={textContainerStyle}>
          <p style={textStyle}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum ape Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam sit commodi neque ducimus nemo facere beatae delectus maiores quae ratione nam dolore veniam consectetur, recusandae cumque architecto rem, inventore blanditiis.riam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam.
          </p>
        </div>
      </div>
    </>
  );
};

export default About;
