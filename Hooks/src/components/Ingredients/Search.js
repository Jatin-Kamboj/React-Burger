import React, { useState, useEffect, useRef } from "react";
import ComponentClass from "./ComponentClass";
import Card from "../UI/Card";
import "./Search.css";
import useHttp from "../../hooks/useHttp";

const Search = React.memo(
  ({ onIngredientsFetch, fetchIngredients, ...props }) => {
    const [filteredResult, setfilteredResult] = useState("");

    const inputRef = useRef();

    const { sendRequest, isLoading, error } = useHttp();

    useEffect(() => {
      console.log("Search useEffect");
      const timeoutRef = setTimeout(() => {
        const fetchFilteredIngredients = async () => {
          try {
            if (filteredResult === inputRef.current.value) {
              const query =
                filteredResult.length === 0
                  ? ""
                  : `?orderBy="title"&equalTo="${filteredResult.replace(
                      / /g,
                      ""
                    )}"`;

              const res = await sendRequest(
                `https://covid-c1962.firebaseio.com/ingredients.json${query}`,
                "GEt"
              );

              onIngredientsFetch(res);
            }
          } catch (error) {
            Promise.reject(error);
          }
        };
        fetchFilteredIngredients();
      }, 500);

      return () => clearTimeout(timeoutRef);
    }, [filteredResult, onIngredientsFetch, inputRef, fetchIngredients]);

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
  }
);

export default Search;
