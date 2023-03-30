import { useState, useEffect } from "react";
import Axios from "../../api/server";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./../../css/Wrapper.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { logout } from "./../../helper/auth";

import Button from "./../Button/";
import Form from "./Form";

const Create = () => {
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { id } = useParams();
  const [displayImage, setDisplayImage] = useState("");
  const [config, setConfig] = useState(null);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      link: "",
      image: null,
      isActive: true,
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
    const fetchBanner = async () => {
      try {
        const res = await Axios.get(`/banners/${id}`, config);
        formik.setValues(res.data.data);
        setDisplayImage(res.data.data.image);
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          logout();
          navigate("/login");
        }
      }
    };
    if (id && config) {
      fetchBanner();
    }
  }, [config, id]);

  const handleFormSubmit = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("link", formik.values.link);
    formData.append("image", formik.values.image);
    formData.append("isActive", formik.values.isActive);
    try {
      if (id) {
        await Axios.patch(`/admin/banners/${id}`, formData, config);
        toast.success("Banner updated successfully ", {
          theme: "colored",
        });
      } else {
        await Axios.post(`/admin/banners`, formData, config);
        formik.resetForm();
        setDisplayImage("");
        toast.success("Banner added successfully ", {
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
        <Form formik={formik} id={id} setDisplayImage={setDisplayImage} />
        {displayImage && (
          <div className="display-img">
            <img
              src={displayImage}
              alt="school"
              onClick={() => {
                formik.values.image = null;
                setDisplayImage("");
              }}
            />
          </div>
        )}
        <div className="btn">
          <Button isEdit={id ? true : false} isLoading={isLoading} />
        </div>
      </form>
    </>
  );
};

export default Create;
