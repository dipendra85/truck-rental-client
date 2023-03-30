import { TextField, Button } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Form = ({ formik, id, subId }) => {
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div className="heading">
          <div className="title">
            <h3>{subId ? "Update Sub Category" : "Create Sub Category"}</h3>
          </div>
          <Link to={`/sub-categories/${id}`} className="link">
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
        </div>
      </div>
    </div>
  );
};

export default Form;
