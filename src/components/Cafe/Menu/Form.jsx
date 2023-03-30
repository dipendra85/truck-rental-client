import {
  TextField,
  TextareaAutosize,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { TimePicker } from "@mui/x-date-pickers";

const Form = ({ formik, id, resturantId }) => {
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div className="heading">
          <div className="title">
            <h3>{id ? "Update Menu" : "Create Menu"}</h3>
          </div>
          <Link to={`/menus/${resturantId}`} className="link">
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
            {/* <TimePicker
              label="Time"
              // value={value}
              // onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            /> */}
            <div className="">
              <label htmlFor="opening">Opening Time</label>
              <input
                className="input"
                id="opening"
                type="time"
                name="openingTime"
                value={formik.values.openingTime}
                onChange={formik.handleChange}
              />
            </div>
            <div className="">
              <label htmlFor="closing">Closing Time</label>
              <input
                className="input"
                id="closing"
                type="time"
                name="closingTime"
                value={formik.values.closingTime}
                onChange={formik.handleChange}
              />
            </div>
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
          </FormGroup>
        </div>
      </div>
    </div>
  );
};

export default Form;
