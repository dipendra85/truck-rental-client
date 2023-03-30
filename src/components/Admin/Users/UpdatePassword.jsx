import { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import { CancelOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Axios from "./../../../api/server";
import Button from "./../../Button/";
import { useParams } from "react-router-dom";

const Form = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [err, setErr] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [config, setConfig] = useState(null);
  const { id } = useParams();

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

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = { password, confirmPassword };
    try {
      const res = await Axios.patch(
        `/admin/users/password/${id}`,
        data,
        config
      );
      if (res.status === 200) {
        toast.success("Password Updated", {
          theme: "colored",
        });
      }
      setIsLoading(false);
    } catch (err) {
      console.log(err);
      setErr(err.response.data.err);
      setIsLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <ToastContainer />
      <form onSubmit={handleFormSubmit}>
        <div className="form-wrapper">
          <div className="heading">
            <div className="title">
              <h3>{id ? "Update User" : "Create User"}</h3>
            </div>
            <Link to={`/users`} className="link">
              <CancelOutlined className="icon" />
            </Link>
          </div>
          <div className="form">
            <div className="doubleInputWrapper">
              <TextField
                id="outlined-basic-1"
                label="Password"
                type={"password"}
                variant="outlined"
                className="input"
                name="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
              <TextField
                id="outlined-basic-1"
                label="Confirm Password"
                variant="outlined"
                className="input"
                type={"password"}
                name="confirmPassword"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                value={confirmPassword}
              />
            </div>
          </div>
        </div>
        <div className="btn">
          <Button isEdit={id ? true : false} isLoading={isLoading} />
        </div>
      </form>
    </div>
  );
};

export default Form;
