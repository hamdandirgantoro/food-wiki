import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Lineicons from "@lineiconshq/react-lineicons";
import { Globe1Solid, Sun1Solid } from "@lineiconshq/free-icons";
import Sidebar from "./components/sidebar";
import { useSidebar } from "./components/context-providers/sidebar";

interface Meal {
  strMeal: string;
  strMealThumb: string;
}
interface SearchData {
  meals: Meal[] | null;
}
function App() {
  const { sidebar } = useSidebar();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchData, setSearchData] = useState<SearchData>({ meals: null });
  let prevTimer: any = null;
  function handleChangeTheme() {}
  function handleChangeLanguage() {}
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
    }, 1000);
    return () => clearTimeout(prevTimer);
  }
  useEffect(() => {
    fetch("https://www.themealdb.com/api/json/v1/1/search.php?s=")
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
  }, []);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <main>
      <div className="nav-container">
        <Navbar />
        <input
          className="search-bar"
          type="search"
          onInput={handleSearch}
          placeholder="food name"
        />
        <div className="third-part">
          <button title="Change Theme" onClick={handleChangeTheme}>
            <Lineicons icon={Sun1Solid} />
          </button>
          <button title="Change Language" onClick={handleChangeLanguage}>
            <Lineicons icon={Globe1Solid} />
          </button>
        </div>
      </div>
      <div className="sidebar-container" style={{ display: sidebar }}>
        <Sidebar />
      </div>
      {searchData.meals ? (
        <div className="item-list">
          {searchData.meals.map((items: Meal) => {
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
        <div>no food is found</div>
      )}
    </main>
  );
}

export default App;
