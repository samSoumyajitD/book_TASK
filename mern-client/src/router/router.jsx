import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from '../App';
import Home from '../home/Home';
import Shop from '../shop/Shop';
import About from '../components/About';
import Blog from '../components/Blog';
import Singlebook from '../components/Singlebook';
import DashboardLayout from '../dashboard/DashboardLayout';

import Upload from '../dashboard/Upload';
import Manage from '../dashboard/Manage';
import Edit from '../dashboard/Edit';
import Signup from '../dashboard/Signup';
import Login from '../components/Login';
import Logout from '../components/Logout';
import PrivateRoute from '../PrivateRoute/PrivateRoute';


const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true, // Default route for this level
        element: <Home />,
      },
      {
        path: 'shop',
        element: <Shop />,
      },
      {
        path: 'about',
        element: <About />,
      },
      {
        path: 'blog',
        element: <Blog />,
      },
      {
        path: 'book/:id',
        element: <Singlebook />,
        loader: async ({ params }) => {
          try {
            const response = await fetch(`http://localhost:5000/book/${params.id}`);
            if (!response.ok) {
              throw new Error('Failed to fetch book data');
            }
            return response.json();
          } catch (error) {
            console.error('Error loading book data:', error);
            throw error;
          }
        },
      },
    ],
  },
  {
    path: '/admin/dashboard',
    element: <DashboardLayout />,
    children: [
      {
        index: true, // Default route for this level
        element: <PrivateRoute><Manage /></PrivateRoute>,
      },
      {
        path: 'upload',
        element: <Upload />,
      },{
        path: 'edit/:id',
        element: <Edit />,
        loader:({params}) => fetch(`http://localhost:5000/book/${params.id}`)
      }
    ],
  },{
    path:"sign-up",
element:<Signup/>
  },{
    path:"login",
    element:<Login/>
  },{
    path:"logout",
    element:<Logout/>
  }
]);

export default router;