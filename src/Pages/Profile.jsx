import React, { useEffect } from "react";
import { useContext } from "react";
import { Context } from "../main";
import Loader from "../Components/Loader";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { isAuthenticated, users, loading } = useContext(Context);

  if (!isAuthenticated) return <Navigate to={"/login"} />;

  return loading ? (
    <Loader />
  ) : (
    <div className="profile">
      <h1>Your Name: {users?.name} </h1> <p> Your Email: {users?.email}</p>
    </div>
  );
};

export default Profile;
