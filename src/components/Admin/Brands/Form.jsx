import {
  TextField,
  Button,
} from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Form = ({ formik, id, setDisplayImage }) => {
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div className="heading">
          <div className="title">
            <h3>{id ? "Update Brand" : "Create Brand"}</h3>
          </div>
          <Link to="/admin/brands" className="link">
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
        </div>
      </div>
    </div>
  );
};

export default Form;
