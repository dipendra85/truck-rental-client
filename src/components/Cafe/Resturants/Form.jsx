import {
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Form = ({ formik, id, setDisplayImage }) => {
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div className="heading">
          <div className="title">
            <h3>{id ? "Update Resturant" : "Create Resturant"}</h3>
          </div>
          <Link to="/resturants" className="link">
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
          </div>

          <div>
            <input
              style={{ display: "none" }}
              id="contained-button-file"
              type="file"
              name="image"
              onChange={(e) => {
                const img = URL.createObjectURL(e.target.files[0]);
                setDisplayImage(img);
                formik.values.image = e.target.files[0];
              }}
            />
            <label htmlFor="contained-button-file">
              <Button variant="contained" color="primary" component="span">
                Upload
              </Button>
            </label>
          </div>

          <FormGroup>
            <FormControlLabel
              control={
                <Checkbox
                  name="isActive"
                  value={formik.values.isActive}
                  onChange={formik.handleChange}
                  checked={formik.values.isActive}
                />
              }
              label="Is Active"
            />
            <FormControlLabel
              control={
                <Checkbox
                  name="isFeatured"
                  value={formik.values.isFeatured}
                  onChange={formik.handleChange}
                  checked={formik.values.isFeatured}
                />
              }
              label="Is Featured"
            />
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default Form;
