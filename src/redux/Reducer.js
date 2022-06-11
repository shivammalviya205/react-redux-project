const initialState = [
  {
    id: 0,
    name: "Mumbai kirana",
    area: "Mumbai",
    category: "Grocery",
    openinghour: 8,
    closinghour: 21,
  },
  {
    id: 1,
    name: "Pune kirana",
    area: "Pune",
    category: "Grocery",
    openinghour: 9,
    closinghour: 22,
  },
  {
    id: 2,
    name: "Delhi kirana",
    area: "Delhi",
    category: "Grocery",
    openinghour: 10,
    closinghour: 23,
  },
  {
    id: 3,
    name: "Mumbai medical",
    area: "Mumbai",
    category: "Medical",
    openinghour: 0,
    closinghour: 23,
  },
  {
    id: 4,
    name: "Delhi medical",
    area: "Delhi",
    category: "Medical",
    openinghour: 0,
    closinghour: 23,
  },
  {
    id: 5,
    name: "Pune medical",
    area: "Pune",
    category: "Medical",
    openinghour: 0,
    closinghour: 8,
  },
  {
    id: 6,
    name: "Mumbai Stationary",
    area: "Mumbai",
    category: "Stationary",
    openinghour: 12,
    closinghour: 18,
  },
  {
    id: 7,
    name: "Delhi Stationary",
    area: "Delhi",
    category: "Stationary",
    openinghour: 11,
    closinghour: 21,
  },
  {
    id: 8,
    name: "Pune Stationary",
    area: "Pune",
    category: "Stationary",
    openinghour: 18,
    closinghour: 21,
  },
];

export const ShopReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_SHOP":
      state = [...state, action.payload];
      return state;

    case "DELETE_SHOP":
      const shopFilter = state.filter((shop) =>
        shop.id === action.payload ? null : shop
      );
      state = shopFilter;
      return state;

    case "UPDATE_SHOP":
      const shopUpdate = state.filter((shop) =>
        shop.id === action.payload.id
          ? Object.assign(shop, action.payload)
          : shop
      );
      state = shopUpdate;
      return state;
    default:
      return state;
  }
};
