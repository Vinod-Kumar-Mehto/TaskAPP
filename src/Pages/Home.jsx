import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { server } from "../main";
import { toast } from "react-toastify";
import TodoItem from "../Components/TodoItem";
import { useContext } from "react";
import { Context } from "../main";
import { Navigate } from "react-router-dom";

const Home = () => {
  const [loading, setLoading] = useState(false);
  const [task, setTask] = useState([]);
  const [refresh, setrefresh] = useState(false);
  const { isAuthenticated } = useContext(Context);

  const updateHandler = async (id) => {
    console.log(id);
    try {
      const { data } = await axios.put(
        `${server}/task/${id}`,
        {},
        {
          withCredentials: true,
        }
      );

      toast.success(data.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setrefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };
  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `${server}/task/${id}`,

        {
          withCredentials: true,
        }
      );
      toast.success(data.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
      setrefresh((prev) => !prev);
    } catch (error) {
      toast.error(error.response.data.message, {
        position: toast.POSITION.BOTTOM_CENTER,
      });
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const { data } = await axios.post(
          `${server}/task/new`,
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
        toast.success(data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setLoading(false);
        resetForm({
          values: "",
        });
        setrefresh((prev) => !prev);
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
        setLoading(false);
      }
    },
  });

  useEffect(() => {
    axios
      .get(`${server}/task/getAll`, {
        withCredentials: true,
      })
      .then((res) => {
        setTask(res.data.task);
      })
      .catch((error) => {
        toast.error(error.response.data.message, {
          position: toast.POSITION.BOTTOM_CENTER,
        });
      });
  }, [refresh]);
  if (!isAuthenticated) return <Navigate to={"/login"} />;
  return (
    <div className="container">
      <div className="login">
        <section>
          <form onSubmit={formik.handleSubmit}>
            <input
              type="text"
              placeholder="Title"
              id="title"
              name="title"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            <input
              type="text"
              placeholder="Description"
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
            <button disabled={loading} type="submit">
              Add Task
            </button>
          </form>
        </section>
      </div>

      <section className="todosContainer">
        {task.map((ele) => {
          return (
            <TodoItem
              title={ele.title}
              description={ele.description}
              isCompleted={ele.isCompleted}
              updateHandler={updateHandler}
              deleteHandler={deleteHandler}
              id={ele._id}
              key={ele._id}
            />
          );
        })}
      </section>
    </div>
  );
};

export default Home;
