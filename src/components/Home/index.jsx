import { Link, useNavigate } from "react-router-dom";
import {
  LocalCarWash,
  Map,
  BrandingWatermark,
  Inbox,
} from "@mui/icons-material";
import "./../../css/Home.scss";
import Axios from "./../../api/server";
import { useEffect, useState } from "react";
import { logout } from "./../../helper/auth";

const Home = () => {
  const [banners, setBanners] = useState(null);
  const [config, setConfig] = useState(null);
  const navigate = useNavigate();

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
      <div className="card-wrapper">
        <Link to="/" className="card first">
          <div className="text-wrapper">
            <h1>3</h1>
            <p>Item 1</p>
          </div>
          <Inbox className="icon" />
        </Link>
        <Link to="/" className="card">
          <div className="text-wrapper">
            <h1>10</h1>
            <p>Item 2</p>
          </div>
          <BrandingWatermark className="icon" />
        </Link>
        <Link to="/" className="card">
          <div className="text-wrapper">
            <h1>120</h1>
            <p>Item 3</p>
          </div>
          <LocalCarWash className="icon" />
        </Link>
        <Link to="/" className="card">
          <div className="text-wrapper">
            <h1>120</h1>
            <p>Item 4</p>
          </div>
          <Map className="icon" />
        </Link>
      </div>
    </>
  );
};

export default Home;
