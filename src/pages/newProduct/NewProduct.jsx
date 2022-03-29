import { useState } from "react";
import "./newProduct.css";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from "../../firebase";
import { addProduct } from "../../redux/apiCalls";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function NewProduct() {
  const [inputs, setInputs] = useState({});
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState([]);
  const [color, setColor] = useState([]);
  const [sim,setSim]=useState([])
  const history=useHistory()

  const dispatch=useDispatch()
  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };
  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };
  const handleSim = (e) => {
    setSim(e.target.value.toUpperCase().split(","));
  };
  const handleClick=(e)=>{
    e.preventDefault()
    const filename=new Date().getTime() + file.name
    const storage = getStorage(app);
    const storageRef = ref(storage, filename);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', 
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
          default:
      }
    }, 
    (error) => {
    }, 
    () => {
  
      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const product = { ...inputs, img: downloadURL, categories: cat,color,sim };
        addProduct(product, dispatch);
        history.push('/products')
      });
    }
  );

  }
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Product</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <div className="file-input">
                <input
                  type="file"
                  name="file"
                  id="file"
                  className="file-input__input"
                  onChange={(e) => setFile(e.target.files[0])}
                />
                <label className="file-input__label" for="file">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="upload"
                    className="svg-inline--fa fa-upload fa-w-16"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                    ></path>
                  </svg> <span>Upload File</span>
                </label>
                <span> {file?.name}</span>
              </div>
        </div>
        <div className="addProductItem">
          <label>Title</label>
          <input type="text" placeholder="Name" name="title" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Description</label>
          <textarea type="text" placeholder="Description..." name="desc" onChange={handleChange}/>
        </div>
        <div className="addProductItem">
          <label>Price</label>
          <input type="number" placeholder="$00.00"  name="price" onChange={handleChange}/>
        </div>
        
        <div className="addProductItem">
          <label>Categories</label>
          <input type="text" placeholder="Category"  onChange={handleCat}/>
        </div>
        <div className="addProductItem">
          <label>Color</label>
          <input type="text" placeholder="color"  onChange={handleColor}/>
        </div>
        <div className="addProductItem">
          <label>Sim</label>
          <input type="text" placeholder="sim"  onChange={handleSim}/>
        </div>
        <div className="addProductItem">
          <label>Stock</label>
          <select  name="inStock" onChange={handleChange}>
            <option value={'true'}>Yes</option>
            <option value={'false'}>No</option>
          </select>
        </div>
        <button onClick={handleClick} className="addProductButton">Create</button>
      </form>
    </div>
  );
}
