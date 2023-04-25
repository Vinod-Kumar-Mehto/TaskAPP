import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../main";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { server } from "../main";
import axios from "axios";
import Loader from "../Components/Loader";

const Login = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      let data = {};

      try {
        const { data } = await axios.post(
          `${server}/users/login`,
          {
            ...values,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        toast.success(data.message.toUpperCase(), {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setIsAuthenticated(true);
        setLoading(false);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setIsAuthenticated(false);
        setLoading(false);
      }
    },
  });

  if (isAuthenticated) return <Navigate to={"/"} />;
  return loading ? (
    <Loader />
  ) : (
    <div className="login">
      <section>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            id="email"
            name="email"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          <button disabled={loading} type="submit">
            Login
          </button>
          <h2>Or</h2>
          <Link to={"/register"}>Sign Up</Link>
        </form>
      </section>
    </div>
  );
};

export default Login;
