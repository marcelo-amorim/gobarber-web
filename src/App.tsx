import React from 'react';

import ToastContainer from './components/ToastContainer';
import { AuthProvider } from './hooks/AuthContext';

import GlobalStyle from './styles/global';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

const App: React.FC = () => (
  <>
    <AuthProvider>
      {/* <SignUp /> */}
      <SignIn />
    </AuthProvider>

    <ToastContainer />

    <GlobalStyle />
  </>
);

export default App;
