import React, { useContext } from "react";
import "./CSS/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import dropdown_icon from "../Components/Assets/dropdown_icon.png";
import Item from "../Components/Item/Item";
// import all_product from "../Components/Assets/all_product";

const ShopCategory = (props) => {
  const { all_product } = useContext(ShopContext);

  // console.log("all_product:",all_product);
  return (
    <div className="shop-category">
      <img className="shopcategory-banner" src={props.banner} alt="" />
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of {all_product.length} products
        </p>
        <div className="shopcategory-sort">
          Sort by <img src={dropdown_icon} alt="" />
        </div>
      </div>
      <div className="shopcategory-products">
        {all_product
          .filter((item) =>
            props.category === "shop" ? true : item.category === props.category
          )
          .map((item, i) => {
            return (
              <Item
                key={i}
                id={item.id}
                name={item.name}
                image={item.image}
                new_price={item.new_price}
                old_price={item.old_price}
              />
            );
          })}
      </div>
      <div className="shopcategory-loadmore">
        <p>Explore More</p>
      </div>
    </div>
  );
};

export default ShopCategory;
