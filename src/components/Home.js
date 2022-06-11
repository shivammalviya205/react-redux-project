import React from "react";

import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useState } from "react";
import moment from "moment";
import { toast } from "react-toastify";

const Home = () => {
  const [selects, setSelects] = useState("all");
  const [selectarea, setSelectarea] = useState("all");
  const [openingstatus, setopeningstatus] = useState("open");
  const shoplist = useSelector((state) => state);

  let result = shoplist.map(({ category }) => category);
  console.log(result);
  let uniquecategory = [...new Set(result)];

  let result2 = shoplist.map(({ area }) => area);
  console.log(result2);
  let uniquearea = [...new Set(result2)];

  const currenthour = moment().hour();

  const openfilter = shoplist.filter((shop) => {
    if (
      openingstatus === "open" &&
      shop.openinghour <= currenthour &&
      shop.closinghour >= currenthour
    ) {
      return shop;
    } else if (
      openingstatus === "closed" &&
      (shop.openinghour > currenthour || shop.closinghour < currenthour)
    ) {
      return shop;
    }
  });

  const Filter = openfilter.filter((shop) => {
    if (
      selects !== "all" &&
      selectarea !== "all" &&
      shop.category === selects &&
      shop.area === selectarea
    )
      return shop;
    else if (selects === "all" && selectarea === "all") return shop;
    else if (
      selects === "all" &&
      selectarea !== "all" &&
      shop.area === selectarea
    )
      return shop;
    else if (
      selects !== "all" &&
      selectarea === "all" &&
      shop.category === selects
    )
      return shop;
  });

  const dispatch = useDispatch();
  const Deleteshop = (id) => {
    dispatch({ type: "DELETE_SHOP", payload: id });
    toast.success("shop Deleted successfully!!"); 
  };
  console.log(shoplist);
  return (
    <div className="container">
      <div className="row d-flex flex-column">
        <Link to="/add" className="btn btn-outline-dark my-5 ml-auto ">
          Add shop
        </Link>
        <div className="column d-flex justify-center">
          <div className="mx-3 ">
            <h3>Category</h3>
            <select
              value={selects}
              onChange={(e) => setSelects(e.target.value)}
            >
              <option value="all">All</option>
              {uniquecategory.map((category) => (
                <option value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="mx-3">
            <h3>Area</h3>
            <select
              value={selectarea}
              onChange={(e) => setSelectarea(e.target.value)}
            >
              <option value="all">All</option>
              {uniquearea.map((area) => (
                <option value={area}>{area}</option>
              ))}
            </select>
          </div>

          <div>
            <h3>status</h3>
            <select
              value={openingstatus}
              onChange={(e) => setopeningstatus(e.target.value)}
            >
              <option value="open">Open</option>
              <option value="closed">Closed</option>
            </select>
          </div>
        </div>
        <div className="col-md-10 mx-auto my-4">
          <table className="table table-hover">
            <thead className="table-header bg-dark text-white">
              <tr>
                <th scope="col">Id</th>
                <th scope="col">ShopName</th>
                <th scope="col">Area</th>
                <th scope="col">Category</th>
                <th scope="col">OpeningTime</th>
                <th scope="col">ClosingTime</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {Filter.length > 0 ? (
                Filter.map((shop, id) => (
                  <tr key={id}>
                    <td>{id + 1}</td>
                    <td>{shop.name}</td>
                    <td>{shop.area}</td>
                    <td>{shop.category}</td>
                    <td>{shop.openinghour}:00</td>
                    <td>{shop.closinghour}.00</td>
                    <td>
                      <Link
                        to={`/edit/${shop.id}`}
                        className="btn btn-sm btn-primary mx-2"
                      >
                        Edit
                      </Link>
                      <button
                        type="button"
                        onClick={() => Deleteshop(shop.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <th>No shoplist found</th>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Home;
