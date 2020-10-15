import * as React from 'react';
import { useEvent, useStore } from 'effector-react/ssr';
import styled from 'styled-components';

import { useStart, withStart } from 'lib/page-routing';
import * as model from './model';
import { getWeather } from 'api/requests';

export const HomePage = withStart(model.pageLoaded, () => {
  useStart(model.pageLoaded);

  const increment = useEvent(model.incrementClicked);
  const reset = useEvent(model.resetClicked);

  const counterValue = useStore(model.$counterValue);
  const pagePending = useStore(model.$pagePending);

  const [lat, setLat] = React.useState(0);
  const [lon, setLon] = React.useState(0);

  React.useEffect(() => {
    if (!(typeof navigator === 'undefined' || !('geolocation' in navigator))) {
      navigator.geolocation.getCurrentPosition((position) => {
        console.log(position.coords.latitude, position.coords.longitude);

        setLat(position.coords.latitude);
        setLon(position.coords.longitude);

        getWeather({
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        });
      });
    }
  }, []);
  return (
    <section>
      <h2>Weather app</h2>
      <div>
        latitude {lat}, longitude {lon}
      </div>
      <div>
        <h4>Counter value: {counterValue}</h4>
        <Button disabled={pagePending} onClick={increment}>
          Increment
        </Button>
        <Button disabled={pagePending} onClick={reset}>
          Reset
        </Button>
      </div>
    </section>
  );
});

const Button = styled.button`
  background-color: transparent;
  border: 1px solid lightblue;
  padding: 1rem;
  border-radius: 1rem;
`;
