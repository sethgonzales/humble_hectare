//Router.tsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// @ts-ignore
import Home from './pages/Home';
// @ts-ignore
import Crops from './pages/Crops';
// @ts-ignore
import Varietal from './pages/Varietal';
// @ts-ignore
import Logs from './pages/Logs';
// @ts-ignore
import Log from './pages/Log';

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
  {
    path: '/logs',
    element: <Logs />,
  },
  {
    path: '/logs/:id',
    element: <Log />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}