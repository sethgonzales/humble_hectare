//Router.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home';
import Crops from './pages/Crops';
import Varietal from './pages/Varietal';
// import Crop from './components/CropForm';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/crops',
    element: <Crops />,
  },
  {
    path: '/varietal/:id',
    element: <Varietal />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}