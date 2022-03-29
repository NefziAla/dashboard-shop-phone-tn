import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
} from "@material-ui/icons";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useHistory, useLocation } from "react-router-dom";
import { updateUser } from "../../redux/apiCalls";
import "./user.css";

export default function User() {
  const location = useLocation();
  const dispatch = useDispatch();
  const userId = location.pathname.split("/")[2];
  const user = useSelector((state) =>
    state.user.users.find((user) => user._id === userId))
    const history=useHistory()
    const [inputs, setInputs] = useState({});

const [usernames,setUsernames]=useState(user.username)
const [emails,setEmails]=useState(user.email)
const handleClick = (e, id) => {
  e.preventDefault();

        const user = {
          ...inputs,
          username:usernames,
          email:emails
        };
        updateUser(userId, user, dispatch);
        history.push('/users')

       
   
};
console.log(userId)
  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Edit User</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://img2.freepng.fr/20180505/upw/kisspng-computer-icons-avatar-businessperson-interior-desi-corporae-5aee195c6d1683.4671087315255535004468.jpg"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">{user.username}</span>
              <span className="userShowUserTitle">{user.isAdmin ? "Administrateur" : "Utilisateur"}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{user.username}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">10.12.1999</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">+216 94077134</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">TUNISIA</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm">
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Username</label>
                <input
                  type="text"
                  placeholder="annabeck99"
                  className="userUpdateInput"
                  value={usernames}
                  onChange={(e)=>setUsernames(e.target.value)}
                />
              </div>
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  value={user.username.toUpperCase()}
                  className="userUpdateInput"
                /></div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  value={emails}
                  className="userUpdateInput"
                  onChange={(e)=>setEmails(e.target.value)}

                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="text"
                  value="+216 94077134"
                  className="userUpdateInput"
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  value="TUNISIA"
                  className="userUpdateInput"
                />
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://img2.freepng.fr/20180505/upw/kisspng-computer-icons-avatar-businessperson-interior-desi-corporae-5aee195c6d1683.4671087315255535004468.jpg"
                  alt=""
                />
               </div>
              <button className="userUpdateButton" onClick={handleClick}>Update</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
