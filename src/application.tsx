import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

import { Scope } from 'effector/fork';
import { Provider } from 'effector-react/ssr';
import './application.module.css';

import { Pages } from './pages';

interface Props {
  root: Scope;
  cookie: any;
}

const Globals = createGlobalStyle`
  html{
    background: #000000;
  }
  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
`;

export const Application: React.FC<Props> = ({ root, cookie }) => (
  <Provider value={root}>
    <div>
      <Globals />
      <PageWrapper>
        <Header>
          <h2>Weather app</h2>
        </Header>
        <Pages />
        {cookie?._ga}
      </PageWrapper>
    </div>
  </Provider>
);

export const Header = styled.div`
  height: 100px;
  color: #ffffff;
`;

export const PageWrapper = styled.div`
  padding: 30px;
`;
