import { TextField, TextareaAutosize } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Form = ({ formik, id, menuId }) => {
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div className="heading">
          <div className="title">
            <h3>{id ? "Update Food" : "Create Food"}</h3>
          </div>
          <Link to={`/foods/${menuId}`} className="link">
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
          <div className="doubleInputWrapper">
            <TextareaAutosize
              className="textarea"
              aria-label="empty textarea"
              placeholder="Empty"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
