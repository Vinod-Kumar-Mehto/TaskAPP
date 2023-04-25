import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { server } from "../main";
import { useContext } from "react";
import { Context } from "../main";

const Register = () => {
  const { isAuthenticated, setIsAuthenticated, loading, setLoading } =
    useContext(Context);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      setLoading(true);
      let data = {};

      try {
        const { data } = await axios.post(
          `${server}/users/new`,
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

  if (isAuthenticated) return <Navigate to={"/"}></Navigate>;

  return (
    <div className="login">
      <section>
        <form onSubmit={formik.handleSubmit}>
          <input
            id="name"
            name="name"
            type="text"
            required
            placeholder="Name"
            value={formik.values.name}
            onChange={formik.handleChange}
          />
          {formik.errors.name ? <div>{formik.errors.name}</div> : null}

          <input
            id="email"
            name="email"
            type="email"
            required
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
          />
          {formik.errors.email ? <div>{formik.errors.email}</div> : null}
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
          />
          {formik.errors.password ? <div>{formik.errors.password}</div> : null}
          <button type="submit">Sign Up</button>
          <h2>Or</h2>
          <Link to={"/login"}>Login</Link>
        </form>
      </section>
    </div>
  );
};

export default Register;
