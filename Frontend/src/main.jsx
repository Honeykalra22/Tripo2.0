import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {UserContextProvider } from './Context/UserContext.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import AuthStatus from './Components/AuthStatus.jsx'
import Login from './Authentication/Login.jsx'
import Register from './Authentication/Register.jsx'
import Plan_A_Trip from './Pages/Plan_A_Trip/Plan_A_Trip.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "",
        element: (
            <Home/>
        )
      },
      {
        path: "/login",
        element: (
          <AuthStatus authentication={false}>
            <Login/>
          </AuthStatus>
        )
      },
      {
        path: "/register",
        element: (
          <AuthStatus authentication={false}>
            <Register/>
          </AuthStatus>
        )
      },
      {
        path: "/plan-trip",
        element: (
          // <AuthStatus authentication={true}> // excluded until backend is completed 
            <Plan_A_Trip/>
          // </AuthStatus>
        )
      }
    ]
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <UserContextProvider>
      <RouterProvider router={router}/>
    </UserContextProvider>
    </Provider>
  </StrictMode>,
)
