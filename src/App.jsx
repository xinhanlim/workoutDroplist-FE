import React from 'react'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import { Route, Switch } from 'wouter';
import Homepage from './pages/Homepage';
import ProfilePage from './pages/ProfilePage';
import { ToastContainer , Zoom} from 'react-toastify';

export default function App() {
  return (<>
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover={false}
      theme="dark"
      transition={Zoom}
    />
    <Switch>
      <Route path='/' component={Homepage} />
      <Route path="/api/users/login" component={LoginPage} />
      <Route path="/api/users/register" component={RegisterPage} />
      <Route path="/api/users/profile" component={ProfilePage} />
    </Switch>
  </>)
}