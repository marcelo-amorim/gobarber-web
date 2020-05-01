import React from 'react';

import GlobalStyle from './styles/global';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

const App: React.FC = () => (
  <>
    <SignUp />
    <SignIn />
    <GlobalStyle />
  </>
);

export default App;
