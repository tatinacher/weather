type LocationType = {
  lat: number;
  lon: number;
};

export const getWeather = ({ lat, lon }: LocationType) => {
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.RAZZLE_API_ID}`,
  )
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      console.log(res);
    });
};
