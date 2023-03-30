import { useState, useEffect } from "react";
import Axios from "./../../api/server";
import { Link, useNavigate } from "react-router-dom";
import "./../../css/Wrapper.scss";
import { AddCircle, Delete, Edit } from "@mui/icons-material";
import DeleteModal from "../../components/Modal/DeleteModal";
import { Chip } from "@mui/material";
import { logout } from "./../../helper/auth";

const Index = () => {
  const [categories, setBanners] = useState([]);
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
    navigate(`/banners/create/${id}`);
  };

  useEffect(() => {
    setConfig({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }, []);

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await Axios.get("/admin/banners", config);
        setBanners(res.data.data);
      } catch (err) {
        console.log(err);
        if (err.response.status === 401) {
          logout();
          navigate("/login");
        }
      }
    };
    config && fetchBanners();
  }, [config]);

  return (
    <>
      {isDeleteOpen && (
        <DeleteModal
          id={id}
          title="Do you want to delete the banner ?"
          route="/admin/banners/"
          setIsDeleteOpen={setIsDeleteOpen}
        />
      )}
      <div className="wrapper">
        <div className="heading">
          <Link to="/banners/create" className="icon-wrapper">
            <AddCircle className="add-icon" />
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>SN</th>
              <th>Image</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category, index) => {
              return (
                <tr key={index}>
                  <td>{sn++}</td>
                  <td>
                    <img src={category.image} alt="" />
                  </td>
                  <td>
                    {category.isActive ? (
                      <Chip
                        label="Active"
                        color="success"
                        variant="contained"
                      />
                    ) : (
                      <Chip
                        label="Inactive"
                        color="error"
                        variant="contained"
                      />
                    )}
                  </td>
                  <td className="actions">
                    <Edit
                      className="edit-icon"
                      onClick={() => {
                        handleEdit(category.id);
                      }}
                    />{" "}
                    <Delete
                      className="delete-icon"
                      onClick={() => {
                        handleDelete(category.id);
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
