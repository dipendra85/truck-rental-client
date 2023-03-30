import "./index.scss";
import { Button } from "@mui/material";
import ReactDOM from "react-dom";
import Axios from "../../api/server";

const DeleteModel = (props) => {
  const config = {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
    },
  };
  const handleDelete = async () => {
    const res = await Axios.delete(props.route + props.id, config);
    if (res.status === 200) {
      window.location.reload();
    } else {
      alert("Task Failed");
    }
  };
  return ReactDOM.createPortal(
    <>
      <div className="overlay">
        <div className="model-wrapper">
          <h2>{props.title}</h2>
          <div className="btn-wrapper">
            <Button
              variant="contained"
              className="btn cancel"
              disableElevation
              onClick={() => {
                props.setIsDeleteOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              color="error"
              variant="contained"
              className="btn"
              disableElevation
              onClick={handleDelete}
            >
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
};

export default DeleteModel;
