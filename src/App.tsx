import React from 'react';
import styled from 'styled-components';
import GlobalStyles from './GlobalStyles';
import NEOChart from './pages/NEOChart';

const App: React.FC = () => (
  <>
    <GlobalStyles />
    <Layout>
      <NEOChart />
    </Layout>
  </>
);

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
`;

export default App;