import "./App.css";
import API from "./components/api";
import ThemeContext from "./components/context"
import {useState} from "react"

function App() {
  const [theme, setTheme] = useState(true)
  const states = {
    theme,
    setTheme
  }
  return (
    <ThemeContext.Provider value={states}>
    <div className={`App ${theme ? "light" : "dark"}`}>
      <div className="fcst-con">
        <API />
      </div>
    </div>
    </ThemeContext.Provider>
  );
}

export default App;
