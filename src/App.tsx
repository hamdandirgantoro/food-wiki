import { useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Lineicons from "@lineiconshq/react-lineicons";
import { Globe1Solid, Sun1Solid } from "@lineiconshq/free-icons";
import Sidebar from "./components/sidebar";
import { useSidebar } from "./components/context-providers/sidebar";

interface Meal {
  idMeal: string;
  strMeal: string;
  strMealAlternate: string | null;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strTags: string | null;
  strYoutube: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
  strIngredient16: string;
  strIngredient17: string;
  strIngredient18: string;
  strIngredient19: string;
  strIngredient20: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strMeasure11: string;
  strMeasure12: string;
  strMeasure13: string;
  strMeasure14: string;
  strMeasure15: string;
  strMeasure16: string;
  strMeasure17: string;
  strMeasure18: string;
  strMeasure19: string;
  strMeasure20: string;
  strSource: string;
  strImageSource: string | null;
  strCreativeCommonsConfirmed: string | null;
  dateModified: string | null;
}
interface SearchData {
  meals: Meal[] | null;
}
function App() {
  const { sidebar } = useSidebar();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [popupState, setPopupState] = useState<"block" | "none">("none");
  const [popupData, setPopupData] = useState<Meal | null>(null);
  const [searchData, setSearchData] = useState<SearchData>({ meals: null });
  let prevTimer: any = null;
  function handleChangeTheme() {}
  function handleChangeLanguage() {}
  function renderIngredients(meal: Meal) {
    let ingredientsElements = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = meal[`strIngredient${i}` as keyof typeof meal];
      const measure = meal[`strMeasure${i}` as keyof typeof meal];
      if (ingredient && ingredient?.trim() !== "") {
        ingredientsElements.push(
          <li key={i}>
            {measure?.trim()} {ingredient?.trim()}
          </li>,
        );
      }
    }
    return ingredientsElements;
  }
  function toggleFoodInfoPopupState() {
    setPopupState(popupState === "block" ? "none" : "block");
  }
  function handleFoodInfoPopup(items: Meal) {
    setPopupData(items);
    toggleFoodInfoPopupState();
  }
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
      <div className="food-popup-container" style={{ display: popupState }}>
        {popupData ? (
          <div style={{display:"flex", flexDirection:"column", alignItems:"center", gap:"10px"}}>
            <iframe
							style={{width:"90%", height:"500px"}}
              src={`https://www.youtube.com/embed/${popupData.strYoutube.split("v=")[1]}`}
              title="YouTube video player"
              allow="accelerometer; 
  autoplay; 
  clipboard-write; 
  encrypted-media; 
  gyroscope; 
  picture-in-picture; 
  web-share"
              allowFullScreen
            ></iframe>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
              <div>
                <div>{popupData.strMeal}</div>
                <div>{popupData.strArea}</div>
              </div>
              <img src={popupData.strMealThumb} alt={popupData.strMeal} height={100} width={100}></img>
            </div>
            <ul>{renderIngredients(popupData)}</ul>
          </div>
        ) : (
          <div>null</div>
        )}
        <div></div>
      </div>
      {searchData.meals ? (
        <div className="item-list">
          {searchData.meals.map((items: Meal) => {
            return (
              <button
                title={items.strMeal}
                onClick={() => handleFoodInfoPopup(items)}
              >
                <div className="food-container">
                  <div className="food-name">{items.strMeal}</div>
                  <img
                    src={items.strMealThumb}
                    height={100}
                    className="food-thumbs"
                  ></img>
                </div>
              </button>
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
