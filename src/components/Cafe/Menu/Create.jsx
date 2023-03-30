import { useState, useEffect } from "react";
import Axios from "../../../api/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../../../css/Wrapper.scss";
import { useParams } from "react-router-dom";
import { useFormik } from "formik";

import Button from "./../../Button/";
import Form from "./Form";

const Create = () => {
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id, resturantId } = useParams();
  const [config, setConfig] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      isActive: true,
      openingTime: "0:00",
      closingTime: "0:00",
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
    const fetchProduct = async () => {
      try {
        const res = await Axios.get(`/menu/${id}`, config);
        formik.setValues(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (id && config) {
      fetchProduct();
    }
  }, [config, id]);

  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      name: formik.values.name,
      isActive: formik.values.isActive,
      resturantId,
      openingTime: formik.values.openingTime,
      closingTime: formik.values.closingTime,
    };

    try {
      if (id) {
        await Axios.patch(`/admin/cafe/menu/${id}`, data, config);
        toast.success("Menu updated successfully ", {
          theme: "colored",
        });
      } else {
        await Axios.post(`/admin/cafe/menu`, data, config);
        formik.resetForm();
        toast.success("Menu added successfully ", {
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
        <Form formik={formik} id={id} resturantId={resturantId} />
        <div className="btn">
          <Button isEdit={id ? true : false} isLoading={isLoading} />
        </div>
      </form>
    </>
  );
};

export default Create;
