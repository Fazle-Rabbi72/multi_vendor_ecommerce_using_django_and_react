import React from "react";

const CardID = () => {
  const generateRandomStiring = () => {
    const length = 30;
    const characters = "ABCDEFGHIJKL1234567";
    let randomString = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
    localStorage.setItem("randomString", randomString);
  };
  const existingRandomString = localStorage.getItem("randomString");
  if (!existingRandomString) {
    generateRandomStiring();
  } else {
    // log the existing random string
  }
  return existingRandomString;
};

export default CardID;
