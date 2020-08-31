import React, { useState, useEffect } from "react";

import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(({ onIngredientsFetch, ...props }) => {
  const [filteredResult, setfilteredResult] = useState("");

  useEffect(() => {
    try {
      const fetchFilteredIngredients = async () => {
        try {
          const query =
            filteredResult.length === 0
              ? ""
              : `?orderBy="title"&equalTo="${filteredResult}"`;
          const response = await fetch(
            `https://covid-c1962.firebaseio.com/ingredients.json${query}`
          );
          const res = await response.json();
          onIngredientsFetch(res);
          console.log("res", res);
        } catch (error) {
          Promise.reject(error);
        }
      };
      fetchFilteredIngredients();
    } catch (error) {
      console.log("error", error);
    }
  }, [filteredResult, onIngredientsFetch]);

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={filteredResult}
            onChange={event => setfilteredResult(event.target.value)}
          />
        </div>
      </Card>
    </section>
  );
});

export default Search;
