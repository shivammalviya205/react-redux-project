import React, { useState } from "react";

import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file

import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
const AddShop = () => {
  const shoplist = useSelector((state) => state);
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [area, setarea] = useState("");
  const [category, setcategory] = useState("");
  const [openinghour, setopeninghour] = useState(8);
  const [closinghour, setclosinghour] = useState(22);
  const navigate = useNavigate();

  const openhour = moment().hour();
  console.log(openhour);
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!area || !name || !category || !openinghour || !closinghour) {
      return toast.warning("Please fill in all fields!!");
    }

    if (openinghour >= 0 && openinghour < 23) {
    } else {
      return toast.warning(
        "please enter correct opening hour no using 24 hour time format "
      );
    }

    if (closinghour > openinghour && closinghour <= 23) {
    } else {
      return toast.warning(
        "please enter correct opening hour between 0 and 23 "
      );
    }

    const data = {
      id: shoplist.length > 0 ? shoplist[shoplist.length - 1].id + 1 : 0,
      area,
      name,
      category,
      openinghour,
      closinghour,
    };

    dispatch({ type: "ADD_SHOP", payload: data });
    console.log(shoplist);
    toast.success("shop added successfully!!");
    navigate("/");
  };

  return (
    <div className="container-fluid">
      <h1 className="text-center text-dark py-3 display-2">Add Shop</h1>
      <div className="row">
        <div className="col-md-6 p-5 mx-auto shadow">
          <form onSubmit={handleSubmit}>
            <div className="form-group my-2">
              <input
                className="form-control"
                type="text"
                placeholder="Shop Name (only alphabets required)"
                value={name}
                pattern="[a-zA-Z]*"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form-group  my-2">
              <input
                className="form-control"
                type="text"
                placeholder="area"
                value={area}
                onChange={(e) => setarea(e.target.value)}
              />
            </div>
            <div className="form-group  my-2">
              <input
                className="form-control"
                type="text"
                placeholder="category"
                value={category}
                pattern="[a-zA-Z]*"
                onChange={(e) => setcategory(e.target.value)}
              />
            </div>
            <div className="form-group  my-2">
              <input
                className="form-control"
                type="number"
                placeholder="opening Time only hour No i.e for 2:00 PM its 14"
                value={openinghour}
                onChange={(e) => setopeninghour(e.target.value)}
              />
            </div>
            <div className="form-group  my-2">
              <input
                className="form-control"
                type="number"
                placeholder="closingTime "
                value={closinghour}
                onChange={(e) => setclosinghour(e.target.value)}
              />
            </div>

            <div className="form-group  my-2 float-right">
              <input
                className="btn btn-block btn-dark mx-2 "
                type="submit"
                value="Add Shop"
              />
              <Link to="/">
                {" "}
                <input
                  className="btn btn-block btn-danger "
                  type="submit"
                  value="Cancel"
                />
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddShop;
