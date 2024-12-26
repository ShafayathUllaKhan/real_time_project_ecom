import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Layout from './layouts/Layout';
import Home from './pages/Home/Home';
import ProductsPage from './pages/ProductsPage/ProductsPage';
import ProductsDetailsPage from './pages/ProductsDetailsPage/ProductsDetailsPage';
import { Routes, Route } from "react-router-dom"
import UserProfile from './pages/userprofile/UserProfile';
import Carts from './pages/carts/Carts';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import ResetPassword from './pages/ForgotPassword/ResetPassword';
import Checkout from './pages/CheckoutPage/Checkout';
import UserOrders from './pages/userOrders/UserOrders';
import Shipping from './pages/shipping/Shipping';
import AdminLogin from './pages/AdminLogin/AdminLogin';
import AdminDashboard from './pages/Admin/AdminDashboard';
import CommonLayoutAdmin from './pages/Admin/CommonLayoutAdmin'
import AdminProductspage from './pages/Admin/AdminProductspage';
import AddProducts from './pages/Admin/AddProducts';
import AddCategory from './pages/Admin/AddCategory';
import Orders from './pages/Admin/Orders';
import Payment from './pages/payment/Payment';
import UserProtectedRoutes from './components/Protected/UserProtectedRoutes';
import AdminProtectedRoutes from './components/Protected/AdminProtectedRoutes';
import toast, { Toaster } from 'react-hot-toast';
import Error from './pages/Error/Error';
import {Elements} from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js';
import Loader from './components/Loader/Loader';
import { useEffect, useState } from 'react';



function App() {

  const [spin,setSpin] = useState(true);

  useEffect(()=>{
    setTimeout(()=>{
      setSpin(false);
    },1000)
  },[])

  useEffect(()=>{
    window.scrollTo(0,0);
  },[])

  const stripePromise = loadStripe(
    "pk_test_51OxmNzSB2wRtJ02c6HYEgUmz0NFu7HmFpQP7D3wDHZHchfnOASdkLbp8YWKfSGfIycMYzjI9Cb9mSozN1Vadr3H500gB421iP1")
  return (
    <>

   {
    spin ?  <Loader /> : 
    
    <Elements stripe={stripePromise}>
   
   <Routes>
       {/* Admin Routes */}
       <Route path='/admin/dashboard' element={<CommonLayoutAdmin><AdminProtectedRoutes Components={AdminDashboard} /></CommonLayoutAdmin>} />
       <Route path='/admin/products' element={<CommonLayoutAdmin><AdminProtectedRoutes Components={AdminProductspage}  /></CommonLayoutAdmin>} />
       <Route path='/admin/addcategory' element={<CommonLayoutAdmin><AdminProtectedRoutes Components={AddCategory}  /></CommonLayoutAdmin>} />
       <Route path='/admin/addproducts' element={<CommonLayoutAdmin><AdminProtectedRoutes Components={AddProducts}  /></CommonLayoutAdmin>} />
       <Route path='/admin/orders' element={<CommonLayoutAdmin><AdminProtectedRoutes  Components={Orders} /></CommonLayoutAdmin>} />
       <Route path='/admin/login' element={<Layout><AdminLogin /></Layout>} />

       {/* User Routes */}
         <Route path='/' element={<Layout><Home /></Layout>} />
         <Route path='/products' element={<Layout><ProductsPage /></Layout>} />
         <Route path='/productdetails/:id' element={<Layout><ProductsDetailsPage /></Layout>} />
         <Route path='/carts' element={<Layout><UserProtectedRoutes Components={Carts}/></Layout>} />
         <Route path='/userprofile' element={<Layout><UserProtectedRoutes Components={UserProfile} /></Layout>} />
         <Route path='/login' element={<Layout><Login /></Layout>} />
         <Route path='/register' element={<Layout><Register /></Layout>} />
         <Route path='/forgotpassword' element={<Layout><ForgotPassword /></Layout>} />
         <Route path='/resetpassword/:id/:token' element={<Layout><ResetPassword /></Layout>} />
         <Route path='/shipping' element={<Layout><UserProtectedRoutes  Components={Shipping} /></Layout>} />
         <Route path='/checkout' element={<Layout><UserProtectedRoutes Components={Checkout} /></Layout>} />
         <Route path='/payment' element={<Layout><UserProtectedRoutes Components={Payment} /></Layout>} />
         <Route path='/userorders' element={<Layout><UserProtectedRoutes Components={UserOrders} /></Layout>} />
         <Route path='*' element={<Layout><Error /></Layout>} />
       </Routes>
       <Toaster />
   </Elements>
   }
    
     
       
     

    </>
  );
}

export default App;
