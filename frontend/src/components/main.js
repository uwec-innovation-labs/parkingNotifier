import React from 'react'
import { Switch, Route } from 'react-router-dom'
import signup from './Signup'
import unsubscribe from './Unsubscribe'

const Main = () => (
  <main>
    <Switch>
     <Route path='/Signup' component={Signup}/>
     <Route path='/Unsubscribe' component={Unsubscribe}/>
    </Switch>
  </main>
);
