import React from 'react'
import Navbar from './components/Navbar'
import LoginPage from './pages/LoginPage';
import { Route, Switch } from 'wouter';

export default function App(){
  return (<>
  <Switch>
    <Route path="/api/users/login" component={LoginPage} />
  </Switch>
  </>)
}