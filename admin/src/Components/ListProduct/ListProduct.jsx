import React, { useEffect, useState } from "react";
import "./ListProduct.css";
import cross_icon from "../../assets/Ecommerce_Admin_Panel_Assets/cross_icon.png";

const ListProduct = () => {
  const [allproducts, setAllProducts] = useState([]);

  const fetchInfo = async () => {
    await fetch("http://localhost:5000/allproducts")
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        // console.log(data);
      });
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="list-product">
      <h1>ALL Products</h1>
      <div className="listproducts-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>Remove</p>
      </div>

      <div className="listproducts-allproducts">
        <hr />
        {allproducts.map((product, index) => {

            console.log("Product image URL:",product.image)
            const imageUrl = product.image.startsWith('http') ? product.image : `http://localhost:5000/${product.image}`;

          return (
            <div
              className="listproduct-format-main listproduct-format"
              key={index}
            >
              <img
                src={imageUrl}
                alt={product.name}
                className="listproduct-product-icon"
              />
              <p>{product.name}</p>
              <p>₹{product.old_price}</p>
              <p>₹{product.new_price}</p>
              <p>{product.category}</p>
              <img
                src={cross_icon}
                alt="cancel_icon"
                className="listproduct-remove-icon"
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ListProduct;
