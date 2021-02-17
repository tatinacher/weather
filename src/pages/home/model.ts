import React from 'react';
import {
  createEffect,
  createEvent,
  createStore,
  guard,
  forward,
} from 'effector-root';
import { createStart } from '../../lib/page-routing';
import { getWeather, GeoType } from 'api/requests';

type ButtonClick = React.MouseEvent<HTMLButtonElement>;

type TemperatureType = {
  temp: number;
  temp_max: number;
  temp_min: number;
  feels_like: number;
  humidity: number;
  pressure: number;
};

type WeatherType = {
  name: string;
  main: TemperatureType;
};

export const pageLoaded = createStart();

const requestWeatherInit = createEffect<void, WeatherType>();
export const requestWeather = createEffect<GeoType, WeatherType>();

export const changeGeo = createEvent<GeoType>();
export const setError = createEvent<PositionError>();
export const clear = createEvent<ButtonClick>();

export const $geo = createStore<GeoType>({ lat: null, lon: null });
export const $errors = createStore<PositionError | null>(null);
export const $weather = createStore<WeatherType>({
  name: '',
  main: {
    temp: 0,
    temp_max: 0,
    temp_min: 0,
    feels_like: 0,
    humidity: 0,
    pressure: 0,
  },
});

export const $city = createStore<string>('');
export const $units = createStore<string>('metric');

$geo.on(changeGeo, (_, newGeo) => newGeo);
$errors.on(setError, (_, error) => error);

$weather
  .on(requestWeather.done, (state, { params, result }) => {
    const { name, main } = result;
    console.log(result);

    return { ...state, name, main };
  })
  .on(requestWeatherInit.done, (state, { params, result }) => {
    console.log('result');

    const { name, main } = result;
    return { ...state, name, main };
  });

requestWeather.use(getWeather);

forward({ from: changeGeo, to: requestWeather });

const $shoudHaveGeo = $geo.map(({ lat, lon }) => {
  console.log(lat === null && lon === null);

  return lat === null && lon === null;
});

guard({
  source: pageLoaded,
  filter: $shoudHaveGeo,
  target: requestWeatherInit,
});

//use cookies
//requestWeatherInit.use(() => getWeather({ lat: 10, lon: 50 }));
requestWeatherInit.use(
  () =>
    new Promise((resolve) =>
      resolve({
        name: 'Cool',
        main: {
          temp: 0,
          temp_max: 0,
          temp_min: 0,
          feels_like: 0,
          humidity: 0,
          pressure: 0,
        },
      }),
    ),
);
