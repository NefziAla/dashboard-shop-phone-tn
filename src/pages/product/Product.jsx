import { Link, useHistory, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useState } from "react";
import { userRequest } from "../../requestMethod";
import { updateProduct } from "../../redux/apiCalls";

export default function Product() {
  const [pstats, setPstats] = useState([]);
  const location = useLocation();
  const dispatch = useDispatch();
  const productId = location.pathname.split("/")[2];
  const product = useSelector((state) =>
    state.product.products.find((product) => product._id === productId)
  );
  const MONTHS = useMemo(
    () => [
      "JAN",
      "FEV",
      "MAR",
      "AVR",
      "MAI",
      "JUN",
      "JUL",
      "AUT",
      "SEP",
      "OCT",
      "NOV",
      "DEC",
    ],
    []
  );
  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await userRequest.get("/orders/income?p_id" + productId);
        res.data.map((item) =>
          setPstats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], Sales: item.total },
          ])
        );
      } catch {}
    };
    getStats();
  }, [productId, MONTHS]);
  const [inputs, setInputs] = useState({});
  const [descs, setDescs] = useState(product.desc);
  const [prices, setPrices] = useState(product.price);
  const [titles, setTitles] = useState(product.title);
  const [inStoked, setInStoked] = useState(product.inStock);

  const [categories, setCat] = useState([product.categories]);
  const [color, setColor] = useState([product.color]);
  const [sim, setSim] = useState([product.sim]);

  const history=useHistory()

  const handleCat = (e) => {
    setCat(e.target.value.split(","));
  };
  const handleColor = (e) => {
    setColor(e.target.value.split(","));
  };
  const handleSim = (e) => {
    setSim(e.target.value.toUpperCase().split(","));
  };
  const handleClick = (e, id) => {
    e.preventDefault();
 
          const product = {
            ...inputs,
            title: titles,
            desc: descs,
            price: prices,
            categories,
            color,
            sim,
            inStock:inStoked,
          };
          updateProduct(productId, product, dispatch);

          history.push('/products')
     
  };
  
 console.log(product.inStock)
  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pstats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName"> {product.title.toUpperCase()}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">sales:</span>
              <span className="productInfoValue">5123</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">
                {product.inStock}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input
              type="text"
              value={titles}
              name="title"
              onChange={(e) => setTitles(e.target.value)}
            />
            <label>Product Description</label>
            <input
              type="text"
              value={descs}
              name="desc"
              onChange={(e) => setDescs(e.target.value)}
            />
            <label>Categories</label>
            <input type="text" value={categories} onChange={handleCat} />
            <label>Price</label>
            <input
              type="text"
              value={prices}
              name="price"
              onChange={(e) => setPrices(e.target.value)}
            />
            <label>Color</label>
            <input type="text" value={color} onChange={handleColor} />
            <label>Sim</label>
            <input type="text" value={sim} onChange={handleSim} />
            <label>In Stock</label>
            <select name="inStock" id="idStock" value={inStoked} onChange={(e)=>setInStoked(e.target.value)}>
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
            </div>
            <button className="productButton" onClick={handleClick}>
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
