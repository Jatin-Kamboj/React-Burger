import React, { useEffect } from "react";
import "./IngredientList.css";

const IngredientList = React.memo(({ ingredients, onRemoveItem }) => {
  useEffect(() => {
    console.log("IngredientList");
  }, [onRemoveItem]);

  return (
    <section className="ingredient-list">
      <h2>Loaded Ingredients</h2>
      <ul>
        {ingredients.map(ig => (
          <li key={ig.id} onClick={onRemoveItem.bind(this, ig.id)}>
            <span>{ig.title}</span>
            <span>{ig.amount}x</span>
            {/* <span>x</span> */}
          </li>
        ))}
      </ul>
    </section>
  );
});

export default IngredientList;
