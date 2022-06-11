import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

import { useDispatch } from "react-redux";
const EditShop = () => {
  const { id } = useParams();
  const shoplist = useSelector((state) => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const currentShop = shoplist.find((shop) => shop.id === parseInt(id));

  useEffect(() => {
    setName(currentShop.name);
    setarea(currentShop.area);
    setcategory(currentShop.category);
    setopeninghour(currentShop.openinghour);
    setclosinghour(currentShop.closinghour);
  }, [currentShop]);

  const [name, setName] = useState("");
  const [area, setarea] = useState("");
  const [category, setcategory] = useState("");
  const [openinghour, setopeninghour] = useState();
  const [closinghour, setclosinghour] = useState();
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
      id: currentShop.id,
      area,
      name,
      category,
      openinghour,
      closinghour,
    };

    dispatch({ type: "UPDATE_SHOP", payload: data });
    toast.success("Shop Details updated successfully!!");
    navigate("/");
  };

  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <h2 className="text-center">Edit Shop Details</h2>
        <button
          className="btn btn-dark ml-auto my-5"
          onClick={() => navigate("/")}
        >
          Go back
        </button>
        <div className="col-md-6 mx-auto shadow p-5">
          {currentShop ? (
            <form onSubmit={handleSubmit}>
              <div className="form-group  my-2">
                <input
                  className="form-control"
                  value={name}
                  placeholder={"Name"}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group  my-2">
                <input
                  className="form-control"
                  value={area}
                  placeholder={"area"}
                  onChange={(e) => setarea(e.target.value)}
                />
              </div>
              <div className="form-group  my-2">
                <input
                  className="form-control"
                  value={category}
                  placeholder={"category"}
                  onChange={(e) => setcategory(e.target.value)}
                />
              </div>
              <div className="form-group  my-2">
                <input
                  className="form-control"
                  type="number"
                  placeholder="opening hour"
                  value={openinghour}
                  onChange={(e) => setopeninghour(e.target.value)}
                />
              </div>
              <div className="form-group  my-2">
                <input
                  className="form-control"
                  type="number"
                  placeholder="closinghour"
                  value={closinghour}
                  onChange={(e) => setclosinghour(e.target.value)}
                />
              </div>
              <div className="form-group d-flex align-items-center justify-content-between my-2">
                <button type="submit" className="btn btn-primary">
                  Update Shop
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => navigate("/")}
                >
                  cancel
                </button>
              </div>
            </form>
          ) : (
            <h1 className="text-center">No Shop Found</h1>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditShop;
