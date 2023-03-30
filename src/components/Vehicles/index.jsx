import { useState, useEffect } from "react";
import Axios from "../../api/server";
import configuration from "../../helper/config";
import { Link, useNavigate } from "react-router-dom";
import "./../../css/Wrapper.scss";
import { AddCircle, Delete, Edit } from "@mui/icons-material";
import DeleteModal from "../Modal/DeleteModal";

const Index = () => {
  const [posts, setPosts] = useState([]);
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
    navigate(`/posts/create/${id}`);
  };

  useEffect(() => {
    setConfig(configuration);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Axios.get("/products", config);
        setPosts(res.data.data);
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
          title="Do you want to delete the post ?"
          route="/admin/products/"
          setIsDeleteOpen={setIsDeleteOpen}
        />
      )}
      <div className="wrapper">
        <div className="heading">
          <Link to="/posts/create" className="icon-wrapper">
            <AddCircle className="add-icon" />
          </Link>
        </div>
        <table>
          <thead>
            <tr>
              <th>SN</th>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Discount</th>
              <th>Category</th>
              <th>Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post, index) => {
              return (
                <tr key={index}>
                  <td>{sn++}</td>
                  <td>
                    <p>{post.name}</p>
                  </td>
                  <td>
                    <p>{post.stock}</p>
                  </td>
                  <td>
                    <p>Rs. {post.price}</p>
                  </td>
                  <td>
                    <p>
                      {post.discountedPrice
                        ? `Rs. ${post.discountedPrice}`
                        : "-"}
                    </p>
                  </td>
                  <td>
                    <p>
                      {post.category.name} / {post.sub_category.name}
                    </p>
                  </td>
                  <td>
                    <img src={post.images[0]} alt="" />
                  </td>
                  <td className="actions">
                    <Edit
                      className="edit-icon"
                      onClick={() => {
                        handleEdit(post.id);
                      }}
                    />{" "}
                    <Delete
                      className="delete-icon"
                      onClick={() => {
                        handleDelete(post.id);
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
