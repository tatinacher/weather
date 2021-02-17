export type GeoType = { lat: number | null; lon: number | null };

type TemperatureType = {
  temp: number;
  temp_max: number;
  temp_min: number;
};

type WeatherType = {
  name: string;
  main: TemperatureType;
};

export const getWeather = ({ lat, lon }: GeoType): Promise<WeatherType> | any =>
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.RAZZLE_API_ID}&units=metric`,
  )
    .then((res) => res.json())
    .then((res) => res)
    .catch((error) => console.log(error));
