import React from 'react';

import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import GlobalStyle from './styles/global';

import AppProvider from './hooks';

const App: React.FC = () => (
  <>
    <AppProvider>
      {/* <SignUp /> */}
      <SignIn />
    </AppProvider>

    <GlobalStyle />
  </>
);

export default App;
