import * as React from 'react';

import { useStore, useEvent } from 'effector-react/ssr';
import styled from 'styled-components';

import { useStart, withStart } from 'lib/page-routing';
import * as model from './model';
import { UNITS } from 'lib/constants';

export const HomePage = withStart(model.pageLoaded, () => {
  useStart(model.pageLoaded);

  const weather = useStore(model.$weather);
  const changeGeo = useEvent(model.changeGeo);
  const geo = useStore(model.$geo);
  const setError = useEvent(model.setError);
  const units = useStore(model.$units);
  const userUnit = UNITS[units];

  React.useEffect(() => {
    if (!(typeof navigator === 'undefined' || !('geolocation' in navigator))) {
      if (typeof geo.lat === 'number' && typeof geo.lon === 'number') {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            changeGeo({
              lat: position.coords.latitude,
              lon: position.coords.longitude,
            });
          },
          (error) => {
            setError(error);
          },
          { timeout: 10000 },
        );
      }
    }
  }, [geo]);
  return (
    <Content>
      <div>{weather.name}</div>
      <Temerature>
        {Math.round(weather?.main?.temp)} {userUnit}
      </Temerature>
    </Content>
  );
});

const Button = styled.button`
  background-color: transparent;
  border: 1px solid lightblue;
  padding: 1rem;
  border-radius: 1rem;
`;

export const Content = styled.div`
  color: #ffffff;
`;

export const Temerature = styled.div`
  font-size: 40px;
`;
