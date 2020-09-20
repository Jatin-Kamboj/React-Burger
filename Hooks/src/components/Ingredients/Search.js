import React, { useState, useEffect, useRef } from "react";
import ComponentClass from "./ComponentClass";
import Card from "../UI/Card";
import "./Search.css";

const Search = React.memo(({ onIngredientsFetch, ...props }) => {
  const [filteredResult, setfilteredResult] = useState("");
  const inputRef = useRef();

  useEffect(() => {
    const timeoutRef = setTimeout(() => {
      console.log("inputRef :>> ");
      const fetchFilteredIngredients = async () => {
        try {
          if (filteredResult === inputRef.current.value) {
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
          }
        } catch (error) {
          Promise.reject(error);
        }
      };
      fetchFilteredIngredients();
    }, 500);

    return () => clearTimeout(timeoutRef);
  }, [filteredResult, onIngredientsFetch, inputRef]);

  return (
    <section className="search">
      <Card>
        {/* <ComponentClass /> */}
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
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
