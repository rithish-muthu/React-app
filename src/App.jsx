// import data from './products.json'
import './App.css'
import Header from './Header'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import Home from './Home'
import Signup from './Signup.jsx'
import Dashboard from './Dashboard'
import Product from './Product.jsx'
import Cart from './Cart.jsx'
import Checkout from './Checkout.jsx'
import OrderSuccess from './OrderSuccess.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
    errorElement: <h1>404 Page Not Found</h1>, 
    children: [
      {
        path:'',
        element:<Dashboard/>
      },
      {
        path: 'signup',
        element: <Signup />
      },
      {
        path:'product/:id',
        element:<Product/>
      },
      {
        path:'cart',
        element:<Cart/>
      },
      {
        path:'/checkout',
        element:<Checkout/>
      },
      {
        path:'ordersuccess',
        element:<OrderSuccess/>
      }
    ]
  }
]);


function App() {
  return(
    <RouterProvider router={router}/>
  )

}

export default App
