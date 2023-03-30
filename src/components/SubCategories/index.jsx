import { useState, useEffect } from "react";
import Axios from "./../../api/server";
import configuration from "./../../helper/config";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./../../css/Wrapper.scss";
import { AddCircle, Delete, Edit } from "@mui/icons-material";
import DeleteModal from "../../components/Modal/DeleteModal";

const Index = () => {
  const [categories, setCategories] = useState([]);
  const [config, setConfig] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [id, setId] = useState(0);
  const params = useParams();
  const navigate = useNavigate();
  let sn = 1;

  const handleDelete = (id) => {
    setId(id);
    setIsDeleteOpen(true);
  };

  const handleEdit = (id) => {
    navigate(`/sub-categories/create/${params.id}/${id}`);
  };

  useEffect(() => {
    setConfig(configuration);
  }, []);

  useEffect(() => {
    const fetchcategory = async () => {
      try {
        const res = await Axios.get(
          `/categories/sub_categories/${params.id}`,
          config
        );
        setCategories(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchcategory();
  }, [config, params.id]);

  return (
    <>
      {isDeleteOpen && (
        <DeleteModal
          id={id}
          title="Do you want to delete the sub-category ?"
          route="/admin/categories/sub_categories/"
          setIsDeleteOpen={setIsDeleteOpen}
        />
      )}
      <div className="wrapper">
        <div className="heading">
          <Link
            to={`/sub-categories/create/${params.id}`}
            className="icon-wrapper"
          >
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
            {categories.map((category, index) => {
              return (
                <tr key={index}>
                  <td>{sn++}</td>
                  <td>
                    <p>{category.name}</p>
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
