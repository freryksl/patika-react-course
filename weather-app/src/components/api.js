import { BASE_URL, API_KEY } from "../config";
import { useState, useMemo } from "react";
import axios from "axios";
import Forecasts from "./forecasts";

function API() {
  const [loading, setLoading] = useState(true);
  const [forecast, setForecast] = useState(null);
  const [location, setLocation] = useState("İstanbul");
  function fetchData(location) {
    if (!location) return;
    axios
      .get(
        `${BASE_URL}/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&include=days%2Ccurrent&key=${API_KEY}&contentType=json`
      )
      .then((res) => res.data)
      .then((res) => {
        setForecast(res);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  }
  useMemo(() => {
    fetchData(location);
  }, [location]);
  const states = {
    loading,
    location,
    setLocation,
    forecast,
  };
  return <Forecasts {...states} />;
}

export default API;
