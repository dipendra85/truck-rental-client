import {
  TextField,
  FormGroup,
  FormControlLabel,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const Form = ({ formik, id }) => {
  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <div className="heading">
          <div className="title">
            <h3>{id ? "Update User" : "Create User"}</h3>
          </div>
          <Link to={`/users/`} className="link">
            <CancelOutlined className="icon" />
          </Link>
        </div>
        <div className="form">
          <div className="doubleInputWrapper">
            <TextField
              id="outlined-basic-1"
              label="First Name"
              variant="outlined"
              className="input"
              name="firstName"
              onChange={formik.handleChange}
              value={formik.values.firstName}
            />
            <TextField
              id="outlined-basic-1"
              label="Last Name"
              variant="outlined"
              className="input"
              name="lastName"
              onChange={formik.handleChange}
              value={formik.values.lastName}
            />
          </div>

          <div className="doubleInputWrapper">
            <TextField
              id="outlined-basic-1"
              label="Email"
              variant="outlined"
              className="input"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
            <TextField
              id="outlined-basic-1"
              label="Phone Number"
              variant="outlined"
              className="input"
              name="phone"
              onChange={formik.handleChange}
              value={formik.values.phone}
            />
          </div>

          <FormControl className="input">
            <InputLabel id="role">Role</InputLabel>
            <Select
              className="input"
              labelId="role"
              id="role"
              label="Role"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
            >
              <MenuItem value={"user"}>User</MenuItem>
              <MenuItem value={"admin"}>Admin</MenuItem>
            </Select>
          </FormControl>
          <div className="input">
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isBanned"
                    value={formik.values.isBanned}
                    onChange={formik.handleChange}
                    checked={formik.values.isBanned}
                  />
                }
                label="Banned"
              />
            </FormGroup>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    name="isActivated"
                    value={formik.values.isActivated}
                    onChange={formik.handleChange}
                    checked={formik.values.isActivated}
                  />
                }
                label="Activated"
              />
            </FormGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Form;
