import Sidebar from "./components/sidebar/Sidebar";
import Topbar from "./components/topbar/Topbar";
import "./App.css";
import Home from "./pages/home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import UserList from "./pages/userList/UserList";
import User from "./pages/user/User";
import ProductList from "./pages/productList/ProductList";
import Product from "./pages/product/Product";
import NewProduct from "./pages/newProduct/NewProduct";
import Login from "./pages/login/Login";
import { useSelector } from "react-redux";
import CartList from "./pages/cartList/CartList";

function App() {
  
  const admin = useSelector((state) => state.user).currentUser?.isAdmin;
  return (
    <Router>
      <Switch>
        {admin ? (
          <>
            <Topbar />
            <div className="container">
              <Sidebar />
              <Route exact path="/">
                <Home />
              </Route>
              <Route exact path="/users">
                <UserList />
              </Route>
              <Route exact path="/user/:userId">
                <User />
              </Route>
              <Route exact path="/products">
                <ProductList />
              </Route>
              <Route exact path="/carts">
                <CartList />
              </Route>
              <Route exact path="/product/:productId">
                <Product />
              </Route>
              <Route exact path="/newproduct">
                <NewProduct />
              </Route>
            </div>
          </>
        ) : (
          <>
            <Route exact path="/">
              <Login />
            </Route>{" "}
          </>
        )}
      </Switch>
    </Router>
  );
}

export default App;
