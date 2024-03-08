import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import CropList from './pages/CropList';
import Crop from './components/Crop';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/crops',
    element: <CropList />,
  },
  {
    path: '/crops/:id',
    element: <Crop />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}