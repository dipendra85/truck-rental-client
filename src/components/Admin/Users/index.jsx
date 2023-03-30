import { useState, useEffect } from "react";
import Axios from "./../../../api/server";
import { Link, useNavigate } from "react-router-dom";
import "./../../../css/Wrapper.scss";
import { AddCircle, Delete, Edit, Key } from "@mui/icons-material";
import DeleteModal from "../../../components/Modal/DeleteModal";

const Index = () => {
  const [users, setUsers] = useState([]);
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
    navigate(`/users/create/${id}/`);
  };

  useEffect(() => {
    setConfig({
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await Axios.get(`/admin/users/`, config);
        console.log(res);
        setUsers(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    config && fetchUsers();
  }, [config]);

  return (
    <>
      {isDeleteOpen && (
        <DeleteModal
          id={id}
          title="Do you want to delete the user ?"
          route="/admin/users/"
          setIsDeleteOpen={setIsDeleteOpen}
        />
      )}
      <div className="wrapper">
        <div className="heading">
          <Link to={`/users/create`} className="icon-wrapper">
            <AddCircle className="add-icon" />
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => {
              return (
                <tr key={index}>
                  <td>{sn++}</td>
                  <td>
                    <p>
                      {user.firstName} {user.lastName}
                    </p>
                  </td>
                  <td className="actions">
                    <Edit
                      className="edit-icon"
                      onClick={() => {
                        handleEdit(user.id);
                      }}
                    />{" "}
                    <Delete
                      className="delete-icon"
                      onClick={() => {
                        handleDelete(user.id);
                      }}
                    />
                    <Key
                      className="add-icon"
                      onClick={() => {
                        navigate(`/users/password/${user.id}`);
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
