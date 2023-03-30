import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { CancelOutlined, Check } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Axios from "./../../api/server";
import ReactQuill from "react-quill/dist/react-quill";
import { DefaultEditor } from "react-simple-wysiwyg";

const Form = ({
  formik,
  id,
  setCategoryId,
  categoryId,
  subCategoryId,
  setSubCategoryId,
  handleFileChange,
}) => {
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await Axios.get("/categories");
        setCategories(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubCategories = async () => {
      try {
        const res = await Axios.get(`/categories/sub_categories/${categoryId}`);
        setSubCategories(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    if (categoryId) {
      fetchSubCategories();
    }
  }, [categoryId]);

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div className="heading">
          <div className="title">
            <h3>{id ? "Update Post" : "Create Post"}</h3>
          </div>
          <Link to="/posts" className="link">
            <CancelOutlined className="icon" />
          </Link>
        </div>
        <div className="form">
          <div className="doubleInputWrapper">
            <TextField
              id="outlined-basic-1"
              label="Name"
              variant="outlined"
              className="input"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            <TextField
              id="outlined-basic-1"
              label="Stock"
              variant="outlined"
              className="input"
              name="stock"
              onChange={formik.handleChange}
              value={formik.values.stock}
            />
          </div>
          <div className="doubleInputWrapper">
            <TextField
              id="outlined-basic-1"
              label="Discounted Price"
              variant="outlined"
              className="input"
              name="discountedPrice"
              onChange={formik.handleChange}
              value={formik.values.discountedPrice || ""}
            />
            <TextField
              id="outlined-basic-1"
              label="Price"
              variant="outlined"
              className="input"
              name="price"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
          </div>

          {/* <div className="doubleInputWrapper">
            <TextField
              id="outlined-basic-1"
              label="Delivery Charge"
              variant="outlined"
              className="input"
              name="deliveryCharge"
              onChange={formik.handleChange}
              value={formik.values.deliveryCharge}
            />
          </div> */}

          <div className="doubleInputWrapper">
            <FormControl className="input">
              <InputLabel id="category">Category</InputLabel>
              <Select
                labelId="category"
                id="category"
                label="Category"
                value={categoryId || ""}
                onChange={(e) => {
                  setCategoryId(e.target.value);
                }}
              >
                {categories.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>

            <FormControl className="input">
              <InputLabel id="subCategory">Sub Category</InputLabel>
              <Select
                className="input"
                labelId="subCategoryId"
                id="subCategory"
                label="Sub Category"
                value={subCategoryId || ""}
                onChange={(e) => {
                  setSubCategoryId(e.target.value);
                }}
              >
                {subCategories.map((item) => {
                  return (
                    <MenuItem key={item.id} value={item.id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </div>
          <div className="descriptionWrapper">
            <DefaultEditor
              value={formik.values.description}
              name="description"
              onChange={(e) => {
                formik.handleChange(e);
              }}
              style={{
                backgroundColor: "#fff",
                height: "20rem",
              }}
            />
          </div>

          <div className="input">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isFeatured"
                    value={formik.values.isFeatured}
                    onChange={formik.handleChange}
                    checked={formik.values.isFeatured}
                  />
                }
                label="Featured"
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isTodaysDeal"
                    value={formik.values.isToadysDeal}
                    onChange={formik.handleChange}
                    checked={formik.values.isTodaysDeal}
                  />
                }
                label="Today's Deal"
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isFreeDelivery"
                    value={formik.values.isFreeDelivery}
                    onChange={formik.handleChange}
                    checked={formik.values.isFreeDelivery}
                  />
                }
                label="Free Delivery"
              />
            </FormGroup>

            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isCleared"
                    value={formik.values.isCleared}
                    onChange={formik.handleChange}
                    checked={formik.values.isCleared}
                  />
                }
                label="Is Cleared"
              />
            </FormGroup>
          </div>

          <div>
            <input
              accept="image/*"
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              name="img"
              multiple
              onChange={(e) => {
                handleFileChange(e);
              }}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
