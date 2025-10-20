import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";

function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  const [searchData, setSearchData] = useState("");
  let prevTimer: any = null;
  function handleSearch(event: any) {
    prevTimer && clearTimeout(prevTimer);
    prevTimer = setTimeout(() => {
      fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" +
          event.target.value,
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json(); // Parse JSON
        })
        .then((data) => {
          setSearchData(data);
          setLoading(false);
        })
        .catch((error) => {
          setError(error.message);
          setLoading(false);
        });
      searchData.meals.forEach((num: any) => {
        console.log(num);
      });
      // setSearchData(event.target.value);
    }, 1000);
    return () => clearTimeout(prevTimer);
  }
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=Arrabiata")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Parse JSON
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <div className="nav-container">
        <Navbar />
        <input className="search-bar" type="search" onInput={handleSearch} placeholder="food name"/>
      </div>
      {/* <div>hello welcome</div> */}
      {/* <div>this is a wiki for food</div> */}
      {/* <div>feel free to look around !</div> */}
      {searchData.meals ? (
        <div className="item-list">
          {searchData.meals.map((items: object) => {
            return (
              <div className="food-container">
                <div className="food-name">{items.strMeal}</div>
                <img
                  src={items.strMealThumb}
                  height={100}
                  className="food-thumbs"
                ></img>
              </div>
            );
          })}
        </div>
      ) : (
        <img src={data.meals[0].strMealThumb} alt="food" height={200} />
      )}
    </main>
  );
}

export default App;
