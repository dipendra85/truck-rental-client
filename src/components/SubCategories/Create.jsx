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
  const { id, subId } = useParams();
  const [config, setConfig] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: "",
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
        const res = await Axios.get(
          `/categories/sub_category/${subId}`,
          config
        );
        formik.setValues(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    if (subId && config) {
      fetchData();
    }
  }, [config, subId]);

  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const data = {
      name: formik.values.name,
      categoryId: id,
    };
    try {
      if (subId) {
        await Axios.patch(
          `/admin/categories/sub_categories/${subId}`,
          data,
          config
        );
        toast.success("Sub Category updated successfully ", {
          theme: "colored",
        });
      } else {
        await Axios.post(`/admin/categories/sub_categories`, data, config);
        formik.resetForm();
        toast.success("Sub Category added successfully ", {
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
        <Form formik={formik} id={id} subId={subId} />
        <div className="btn">
          <Button isEdit={id ? true : false} isLoading={isLoading} />
        </div>
      </form>
    </>
  );
};

export default Create;
