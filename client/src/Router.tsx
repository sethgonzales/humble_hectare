//Router.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import CropList from './pages/CropList';
import Varietal from './pages/Varietal';
// import Crop from './components/CropForm';

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
    path: '/varietal/:id',
    element: <Varietal />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}