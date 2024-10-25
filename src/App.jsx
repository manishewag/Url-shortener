/* eslint-disable no-unused-vars */
import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import AppLayout from './layouts/AppLayout'
import LandingPage from './Pages/LandingPage'
import Dashboard from './Pages/Dashboard'
import Auth from './Pages/Auth'
import Link from './Pages/Link'
import RedirectLink from './Pages/RedirectLink'
import RequireAuth from './Components/RequireAuth'


function App() {
  return <>
   <BrowserRouter>
      <AppLayout/>
      <Routes>
        <Route path='/' element={<LandingPage/>}></Route>
        <Route path='/dashboard' element={<RequireAuth><Dashboard/></RequireAuth>}></Route>
        <Route path='/auth' element={<Auth/>}></Route>
        <Route path='/link/:id' element={<RequireAuth><Link/></RequireAuth>}></Route>
        <Route path='/:id' element={<RedirectLink/>}></Route>
      </Routes>  

   </BrowserRouter>
  
  
  
  
  </>
}

export default App