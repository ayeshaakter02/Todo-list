// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.jsx'
// import firebaseConfig from './firebase.config.js'

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router";
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import firebaseConfig from './firebase.config.js';
import UpdateTask from './pages/UpdateTask.jsx';
import Home from './pages/Home.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/update/:id",
    element: <UpdateTask/>, 
  },
]);

createRoot(document.getElementById('root')).render(
    <RouterProvider router={router}/>
)
