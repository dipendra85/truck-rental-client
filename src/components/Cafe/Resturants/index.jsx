import { useState, useEffect } from "react";
import Axios from "./../../../api/server";
import configuration from "./../../../helper/config";
import { Link, useNavigate } from "react-router-dom";
import "./../../../css/Wrapper.scss";
import { AddCircle, Delete, Edit } from "@mui/icons-material";
import DeleteModal from "../../../components/Modal/DeleteModal";

const Index = () => {
  const [resturants, setResturants] = useState([]);
  const [config, setConfig] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [id, setId] = useState(0);
  const navigate = useNavigate();
  let sn = 1;

  const handleDelete = (id) => {
    setId(id);
    setIsDeleteOpen(true);
  };

  const handleEdit = (id) => {
    navigate(`/admin/cafe/resturants/create/${id}`);
  };

  useEffect(() => {
    setConfig(configuration);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("/admin/cafe/resturants", config);
        setResturants(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [config]);

  return (
    <>
      {isDeleteOpen && (
        <DeleteModal
          id={id}
          title="Do you want to delete this resturant ?"
          route="/admin/cafe/resturants/"
          setIsDeleteOpen={setIsDeleteOpen}
        />
      )}
      <div className="wrapper">
        <div className="heading">
          <Link to="/resturants/create" className="icon-wrapper">
            <AddCircle className="add-icon" />
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>SN</th>
              <th>Image</th>
              <th>Name</th>
              <th>Active Status</th>
              <th>Featured Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {resturants.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{sn++}</td>
                  <td>
                    <img src={item.image} alt={item.name} />
                  </td>
                  <td>
                    <p>{item.name}</p>
                  </td>
                  <td>
                    <p>Active</p>
                  </td>
                  <td>
                    <p>Featured</p>
                  </td>
                  <td className="actions">
                    <Edit
                      className="edit-icon"
                      onClick={() => {
                        handleEdit(item.id);
                      }}
                    />{" "}
                    <Delete
                      className="delete-icon"
                      onClick={() => {
                        handleDelete(item.id);
                      }}
                    />{" "}
                    <AddCircle
                      className="add-icon"
                      onClick={() => {
                        navigate(`/menus/${item.id}`);
                      }}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Index;
