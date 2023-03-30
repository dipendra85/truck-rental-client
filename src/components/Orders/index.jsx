import { useEffect, useState } from "react";
import Axios from "./../../api/server";
import configuration from "./../../helper/config";
import "./../../css/Wrapper.scss";
import { Check, Delete } from "@mui/icons-material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Index = () => {
  const [orders, setOrders] = useState([]);
  const [config, setConfig] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  let sn = 1;

  const fetchData = async () => {
    try {
      const res = await Axios.get("/admin/orders/all", config);
      setOrders(res.data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const handleCompleteOrder = async (id) => {
    setIsLoading(true);
    try {
      const data = {};
      const res = await Axios.patch(
        `/admin/orders/complete/${id}`,
        data,
        config
      );
      if (res.status === 200) {
        setIsLoading(false);
        toast.success("Order Completed");
        fetchData();
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setConfig(configuration);
  }, []);

  useEffect(() => {
    config && fetchData();
  }, [config]);

  return (
    <>
      <ToastContainer theme="colored" />
      <div className="wrapper">
        <table>
          <thead>
            <tr>
              <th>SN</th>
              {/* <th>Order Id</th> */}
              <th>Product Name</th>
              <th>User Name</th>
              <th>Phone</th>
              <th>Quantity</th>
              <th>Street</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => {
              return (
                item.product &&
                item.user && (
                  <tr key={index}>
                    <td>{sn++}</td>
                    <td>
                      <p>{item.product.name}</p>
                    </td>
                    <td>
                      <p>
                        {item.user.firstName} {item.user.lastName}
                      </p>
                    </td>
                    <td>
                      <p>{item.phone}</p>
                    </td>
                    <td>
                      <p>{item.quantity}</p>
                    </td>
                    <td>
                      <p>{item.street}</p>
                    </td>
                    <td>
                      {item.orderStatus === "processing" && (
                        <p
                          style={{
                            backgroundColor: "#C58940",
                            borderRadius: "1rem",
                            fontSize: "0.8rem",
                            padding: "0.2rem",
                          }}
                        >
                          {item.orderStatus}
                        </p>
                      )}

                      {item.orderStatus === "completed" && (
                        <p
                          style={{
                            backgroundColor: "#379237",
                            color: "#fff",
                            borderRadius: "1rem",
                            fontSize: "0.8rem",
                            padding: "0.2rem",
                          }}
                        >
                          {item.orderStatus}
                        </p>
                      )}

                      {item.orderStatus === "cancelled" && (
                        <p
                          style={{
                            backgroundColor: "#DC3535",
                            color: "#fff",
                            borderRadius: "1rem",
                            fontSize: "0.8rem",
                            padding: "0.2rem",
                          }}
                        >
                          {item.orderStatus}
                        </p>
                      )}
                    </td>
                    <td className="actions">
                      {/* <Edit
                      className="edit-icon"
                      // onClick={() => {
                      //   handleEdit(item.id);
                      // }}
                    />{" "} */}
                      {/* <Delete className="delete-icon" /> */}
                      {item.orderStatus !== "completed" &&
                        item.orderStatus !== "cancelled" &&
                        (isLoading ? (
                          "..."
                        ) : (
                          <Check
                            className="add-icon"
                            onClick={() => {
                              // navigate(`/items/password/${item.id}`);
                              !isLoading && handleCompleteOrder(item.id);
                            }}
                          />
                        ))}
                    </td>
                  </tr>
                )
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Index;
