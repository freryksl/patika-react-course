import {
  Grid,
  Button,
  CircularProgress,
  Autocomplete,
  TextField,
} from "@mui/material";
import { BASE_ICON } from "../config";
import CityNames from "./cities";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import ThemeContext from "./context";
import { useContext } from "react";

function Forecasts({ loading, forecast, location, setLocation }) {
  const themeContext = useContext(ThemeContext);
  const navigate = () =>
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      setLocation(`${latitude},${longitude}`);
    });
  if (loading) return <CircularProgress sx={{ fontSize: 40 }} />;
  if (!loading)
    return (
      <>
        <div className="header">
          <Autocomplete
            fullWidth
            options={CityNames}
            renderInput={(params) => (
              <TextField
                sx={{
                  "& .MuiFilledInput-root": {
                    backgroundColor: themeContext.theme ? "lightgray" : "#fff",
                  },
                  "& .MuiInputLabel-root": {
                    color: "black",
                  },
                  "& .MuiFilledInput-underline:after": {
                    borderColor: themeContext.theme ? "black" : "#D00000",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: "black",
                  },
                  "& .MuiFilledInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
                    {
                      borderColor: themeContext.theme ? "#1f1f1f" : "lightgray",
                    },
                }}
                {...params}
                variant={"filled"}
                label="City"
              />
            )}
            onChange={(e, val) => setLocation(val?.label)}
          />
          <div className="header-buttons">
            <Button onClick={() => navigate()}>
              <MyLocationIcon
                sx={{
                  color: themeContext.theme ? "#1f1f1f" : "#fff",
                  fontSize: 40,
                }}
              />
            </Button>
            <Button onClick={() => themeContext.setTheme((prev) => !prev)}>
              {!themeContext.theme ? (
                <LightModeIcon sx={{ color: "white", fontSize: 40 }} />
              ) : (
                <DarkModeIcon sx={{ color: "#1f1f1f", fontSize: 40 }} />
              )}
            </Button>
          </div>
        </div>
        <br />
        <hr />
        <br />
        <Grid
          container
          className="container"
          gap={2}
          columnSpacing={{ xs: 1, sm: 2, md: 3 }}
        >
          {forecast?.days.map((val, index) => {
            if (index < 8) {
              const formatDate = new Date(val.datetime);
              return (
                <Grid item className="forecasts" key={`forecast-${index}`}>
                  <span>{formatDate.toDateString()}</span>
                  <br />
                  <img
                    alt={`forecast-icon-${index}`}
                    src={`${BASE_ICON}/${val.icon}.png`}
                  />
                  <br />
                  <span>{val.conditions}</span>
                  <br />
                  <div className="temps">
                    <span>{val.tempmax}°</span>
                    <span>{val.tempmin}°</span>
                  </div>
                </Grid>
              );
            }
            return null;
          })}
        </Grid>
        <br />
        <hr />
        <br />
        <div className="current">
          <div className="forecasts">
            <span>Current</span>
            <br />
            <img
              alt={`forecast-icon-current`}
              src={`${BASE_ICON}/${forecast.currentConditions.icon}.png`}
            />
            <br />
            <span>{forecast.currentConditions.conditions}</span>
            <br />
            <span>{forecast.currentConditions.temp}°</span>
          </div>
        </div>
      </>
    );
}

export default Forecasts;
