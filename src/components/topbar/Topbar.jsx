import React from "react";
import "./topbar.css";
import { NotificationsNone, Language } from "@material-ui/icons";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/userRedux";
import { useHistory } from "react-router-dom";

export default function Topbar() {
  const history = useHistory();

  const dispatch = useDispatch();
  return (
    <div className="topbar">
      <div className="topbarWrapper">
        <div className="topLeft">
          <span className="logo">ADMIN</span>
        </div>
        <div className="topRight">
          <div className="topbarIconContainer">
            <NotificationsNone />
            <span className="topIconBadge">2</span>
          </div>
          <div className="topbarIconContainer">
            <Language />
            <span className="topIconBadge">2</span>
          </div>
          <img
            src="https://icon-library.com/images/admin-icon-png/admin-icon-png-12.jpg"
            alt=""
            className="topAvatar"
            onClick={() => {
              dispatch(logout());
              history.push('/')
              
            }}
          />
        </div>
      </div>
    </div>
  );
}
