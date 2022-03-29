import "./cartList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import {useDispatch,useSelector}from "react-redux"
import { deleteCart, getCarts } from "../../redux/apiCalls";
import { useEffect } from "react";
export default function CartList() {
  const dispatch=useDispatch()
  const carts=useSelector(state=>state.cart.carts)
  useEffect(()=>{
    getCarts(dispatch) 
   },[dispatch])
   const handleDelete = (id) => {
    deleteCart(id,dispatch) 
     };
  const columns = [
    { field: "userId", headerName: "User_ID", width: 220 },
    { field: "productId", headerName: "Product_ID", width: 220 },

    {
      field: "productName",
      headerName: "Prod_Name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cartListItem">
            {params.row.productName}
          </div>
        );
      },
    },
    { field: "quantity", headerName: "Quantity", width: 200 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <DeleteOutline
              className="cartListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="cartList">
      <DataGrid
        rows={carts}
        disableSelectionOnClick
        columns={columns}
        getRowId={row=>row._id}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
