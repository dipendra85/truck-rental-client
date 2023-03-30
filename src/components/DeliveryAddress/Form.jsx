import { TextField, Button } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Form = ({ formik, id }) => {
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div className="heading">
          <div className="title">
            <h3>
              {id ? "Update Delivery Address" : "Create Delivery Address"}
            </h3>
          </div>
          <Link to={`/deliveryAddresses/`} className="link">
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
              label="Price"
              variant="outlined"
              className="input"
              name="price"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
