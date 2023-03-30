import { useState, useEffect } from "react";
import Axios from "./../../../api/server";
import configuration from "./../../../helper/config";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./../../../css/Wrapper.scss";
import { AddCircle, Delete, Edit } from "@mui/icons-material";
import DeleteModal from "../../../components/Modal/DeleteModal";

const Index = () => {
  const [foods, setFoods] = useState([]);
  const [config, setConfig] = useState(null);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [id, setId] = useState(0);
  const navigate = useNavigate();
  const { menuId, foodId } = useParams();
  let sn = 1;

  const handleDelete = (id) => {
    setId(id);
    setIsDeleteOpen(true);
  };

  const handleEdit = (id) => {
    navigate(`/foodItems/create/${menuId}/${foodId}/${id}`);
  };

  useEffect(() => {
    setConfig(configuration);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get(
          `/foodItems/menu/${menuId}/food/${foodId}`,
          config
        );
        console.log(res.data.data);
        setFoods(res.data.data);
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
          title="Do you want to delete this food item ?"
          route="/admin/cafe/foodItems/"
          setIsDeleteOpen={setIsDeleteOpen}
        />
      )}
      <div className="wrapper">
        <div className="heading">
          <Link
            to={`/foodItems/create/${menuId}/${foodId}`}
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
            {foods.map((food, index) => {
              return (
                <tr key={index}>
                  <td>{sn++}</td>
                  <td>
                    <p>{food.name}</p>
                  </td>
                  <td className="actions">
                    <Edit
                      className="edit-icon"
                      onClick={() => {
                        handleEdit(food.id);
                      }}
                    />{" "}
                    <Delete
                      className="delete-icon"
                      onClick={() => {
                        handleDelete(food.id);
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
