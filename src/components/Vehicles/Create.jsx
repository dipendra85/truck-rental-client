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
  const [categoryId, setCategoryId] = useState(null);
  const [subCategoryId, setSubCategoryId] = useState(null);
  const [img, setImg] = useState([]);
  const [displayImg, setDisplayImg] = useState([]);
  const image = [];

  const formik = useFormik({
    initialValues: {
      name: "",
      price: "",
      discountedPrice: 0,
      stock: "",
      description: "",
      categoryId: "",
      subCategoryId: "",
      images: [],
      isTodaysDeal: false,
      isFeatured: false,
      isFreeDelivery: false,
      isCleared: false,
      // deliveryCharge: 0,
    },
  });

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    files.forEach((img) => {
      img = URL.createObjectURL(img);
      image.push(img);
    });
    setImg(files);
    setDisplayImg(image);
  };

  const handleRemoveImage = (newImg) => {
    setDisplayImg(displayImg.filter((image) => image !== newImg));
    newImg = [newImg];
    const updatedImg = newImg.filter(
      (image) => img.indexOf(image) !== displayImg.indexOf(img)
    );
    setImg(updatedImg);
  };

  const mappedDisplayImage = displayImg?.map((img, index) => {
    return (
      <img
        key={index}
        src={img}
        alt=""
        onClick={() => {
          handleRemoveImage(img);
        }}
      />
    );
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
        const res = await Axios.get(`/products/${id}`, config);
        formik.setValues(res.data.data);
        setCategoryId(res.data.data.categoryId);
        setSubCategoryId(res.data.data.subCategoryId);
        setDisplayImg(res.data.data.images);
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
    const formData = new FormData();
    formData.append("name", formik.values.name);
    formData.append("stock", formik.values.stock);
    formData.append("discountedPrice", formik.values.discountedPrice);
    formData.append("price", formik.values.price);
    formData.append("categoryId", categoryId);
    formData.append("subCategoryId", subCategoryId);
    formData.append("description", formik.values.description);
    formData.append("isFeatured", formik.values.isFeatured);
    formData.append("isTodaysDeal", formik.values.isTodaysDeal);
    formData.append("isFreeDelivery", formik.values.isFreeDelivery);
    formData.append("isCleared", formik.values.isCleared);
    if (id) {
      displayImg.forEach((image) => {
        formData.append("image", image);
      });
    }
    if (img) {
      for (let i = 0; i < img.length; i++) {
        formData.append("images", img[i]);
      }
    }
    try {
      if (id) {
        await Axios.patch(`/admin/products/${id}`, formData, config);
        toast.success("Product updated successfully ", {
          theme: "colored",
        });
      } else {
        await Axios.post(`/admin/products`, formData, config);
        formik.resetForm();
        setCategoryId("");
        setSubCategoryId("");
        setDisplayImg([]);
        toast.success("Product added successfully ", {
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
        <Form
          formik={formik}
          id={id}
          setCategoryId={setCategoryId}
          categoryId={categoryId}
          subCategoryId={subCategoryId}
          setSubCategoryId={setSubCategoryId}
          img={img}
          setImg={setImg}
          displayImg={displayImg}
          setDisplayImg={setDisplayImg}
          handleFileChange={handleFileChange}
        />
        <div className="imageWrapper">
          {displayImg.length > 0 && mappedDisplayImage}
        </div>
        <div className="btn">
          <Button isEdit={id ? true : false} isLoading={isLoading} />
        </div>
      </form>
    </>
  );
};

export default Create;
