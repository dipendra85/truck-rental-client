import { useState, useEffect } from "react";
import Axios from "../../api/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../../css/Wrapper.scss";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";

import Button from "./../Button/";
import Form from "./Form";

const Create = () => {
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [config, setConfig] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
    },
  });

  useEffect(() => {
    setConfig({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }, []);

  useEffect(() => {
    if (err) {
      toast.error(err, {
        theme: "colored",
      });
      setErr(null);
    }
  }, [err]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(`/admin/deliveryAdresses/${id}`, config);
        formik.setValues(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (config) {
      fetchData();
    }
  }, [config]);

  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      name: formik.values.name,
      price: formik.values.price,
    };
    try {
      if (id) {
        await Axios.patch(`/admin/deliveryAdresses/${id}`, data, config);
        toast.success("Delivery address updated successfully ", {
          theme: "colored",
        });
      } else {
        await Axios.post(`/admin/deliveryAdresses`, data, config);
        formik.resetForm();
        toast.success("Delivery Address added successfully ", {
          theme: "colored",
        });
      }
      setIsLoading(false);
      window.moveTo(0, 0);
    } catch (err) {
      console.log(err);
      console.log(err.response);
      setErr(err.response.data.err);
      setIsLoading(false);
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleFormSubmit}>
        <Form formik={formik} id={id} />
        <div className="btn">
          <Button isEdit={id ? true : false} isLoading={isLoading} />
        </div>
      </form>
    </>
  );
};

export default Create;
