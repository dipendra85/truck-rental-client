import { useState, useEffect } from "react";
import Axios from "./../../../api/server";
import configuration from "./../../../helper/config";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./../../../css/Wrapper.scss";
import { AddCircle, Delete, Edit } from "@mui/icons-material";
import DeleteModal from "../../../components/Modal/DeleteModal";

const Index = () => {
  const [menus, setMenus] = useState([]);
  const [config, setConfig] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [id, setId] = useState(0);
  const navigate = useNavigate();
  const { resturantId } = useParams();
  let sn = 1;

  const handleDelete = (id) => {
    setId(id);
    setIsDeleteOpen(true);
  };

  const handleEdit = (id) => {
    navigate(`/menus/create/${resturantId}/${id}`);
  };

  useEffect(() => {
    setConfig(configuration);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(
          `/admin/cafe/menu/resturant/${resturantId}`,
          config
        );
        setMenus(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    config && fetchData();
  }, [config]);

  return (
    <>
      {isDeleteOpen && (
        <DeleteModal
          id={id}
          title="Do you want to delete this menu ?"
          route="/admin/cafe/menu/"
          setIsDeleteOpen={setIsDeleteOpen}
        />
      )}
      <div className="wrapper">
        <div className="heading">
          <Link to={`/menus/create/${resturantId}`} className="icon-wrapper">
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
            {menus.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{sn++}</td>
                  <td>
                    <p>{item.name}</p>
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
                        navigate(`/foods/${item.id}`);
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
