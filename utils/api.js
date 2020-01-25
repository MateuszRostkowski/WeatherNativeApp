export const fetchLocationId = async city => {
  const response = await fetch(
    `https://www.metaweather.com/api/location/search/?query=${city}`,
  );
  const locations = await response.json();
  return { 
    locations,
    locationId: locations[0].woeid
  } ;
};

export const fetchWeather = async woeid => {
  const response = await fetch(
    `https://www.metaweather.com/api/location/${woeid}/`,
  );
  const jsonResponse = await response.json()
  const { title, consolidated_weather } = jsonResponse;
  const { weather_state_name, the_temp } = consolidated_weather[0];
  
  return {
    location: title,
    weather: weather_state_name,
    temperature: the_temp,
  };
};
