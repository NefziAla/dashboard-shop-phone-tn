import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  ShoppingCartOutlined
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <LineStyle className="sidebarIcon" />
             <span  className="span">Home</span> 
            </li>
            </Link>
            <li className="sidebarListItem">
              <Timeline className="sidebarIcon" />
              <span  className="span">Analytics</span>
            </li>
            <li className="sidebarListItem">
              <TrendingUp className="sidebarIcon" />
              <span  className="span">Sales</span>
            </li>
          </ul>
        </div>
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Quick Menu</h3>
          <ul className="sidebarList">
            <Link to="/users" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                <span className="span">Users</span>
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Storefront className="sidebarIcon" />
                <span  className="span">Products</span>
              </li>
            </Link>
            <Link to="/carts" className="link">
              <li className="sidebarListItem">
                <ShoppingCartOutlined className="sidebarIcon" />
                <span  className="span">Carts</span>
              </li>
            </Link>
          </ul>
        </div>
      </div>
    </div>
  );
}
