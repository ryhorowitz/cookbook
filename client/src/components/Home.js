import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../AppContext";

function Home() {
  const { user } = useContext(UserContext)

  return (
    <>
      <h1>Home</h1>
      <h1>Welcome {user.username}</h1>
    </>
  )
}

export default Home