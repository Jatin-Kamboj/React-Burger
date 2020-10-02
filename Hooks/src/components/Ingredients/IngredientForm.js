import React, { useState, useEffect } from "react";
import LoadingIndicator from "../UI/LoadingIndicator";
import Card from "../UI/Card";
import "./IngredientForm.css";

const IngredientForm = React.memo(
  ({ addIngredientsHandler, isLoading, ...props }) => {
    const [title, setTitle] = useState("");
    const [amount, setAmount] = useState("");

    // useEffect(() => {
    //   console.log("useEffect addIngredientsHandler Changed");
    // }, [addIngredientsHandler]);

    const submitHandler = event => {
      event.preventDefault();
      addIngredientsHandler({ title, amount });
    };

    // console.log("IngredientForm");
    return (
      <section className="ingredient-form">
        <Card>
          <form onSubmit={submitHandler}>
            <div className="form-control">
              <label htmlFor="title">Name</label>
              <input
                value={title}
                onChange={event => setTitle(event.target.value)}
                type="text"
                id="title"
              />
            </div>
            <div className="form-control">
              <label htmlFor="amount">Amount</label>
              <input
                value={amount}
                onChange={event => setAmount(event.target.value)}
                type="number"
                id="amount"
              />
            </div>
            <div className="ingredient-form__actions">
              <button type="submit">Add Ingredient</button>
              {isLoading && <LoadingIndicator />}
            </div>
          </form>
        </Card>
      </section>
    );
  }
);

export default IngredientForm;
