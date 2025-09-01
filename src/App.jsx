import React from 'react'
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage'
import { Route, Switch } from 'wouter';
import Homepage from './pages/Homepage';
import ProfilePage from './pages/ProfilePage';

export default function App(){
  return (<>
  <Switch>
    <Route path='/' component={Homepage}/>
    <Route path="/api/users/login" component={LoginPage} />
    <Route path="/api/users/register" component={RegisterPage} />
    <Route path="/api/users/profile" component={ProfilePage}/>
  </Switch>
  </>)
}