import React, { useEffect } from 'react'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import { Route, Switch } from 'wouter';
import Homepage from './pages/Homepage';
import ProfilePage from './pages/ProfilePage';
import { ToastContainer, Zoom } from 'react-toastify';
import ExercisePage from './pages/ExercisePage';
import WorkoutPage from './pages/WorkoutPage';
import useJwt from './utils/UserStore'

export default function App() {

  const { parseJwt } = useJwt();

  useEffect(()=>{
    const token = parseJwt;

})


  return (<>
    <ToastContainer
      position="top-center"
      autoClose={1800}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="dark"
      transition={Zoom}
    />
    <Switch>
      <Route path='/' component={Homepage} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Route path="/profile" component={ProfilePage} />
      <Route path="/exercise" component={ExercisePage}/>
      <Route path="/workout" component={WorkoutPage}/>
    </Switch>
  </>)
}