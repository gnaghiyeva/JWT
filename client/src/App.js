import './App.css';
import { createBrowserRouter, RouterProvider } from  'react-router-dom'
import { ROUTES } from './routes/routes';
import { UserContextProvider } from './context/UserContext';


const routes = createBrowserRouter(ROUTES);

function App() {
  return (
    <>
    <UserContextProvider>
    <RouterProvider router={routes}>

    </RouterProvider>
    </UserContextProvider>
    </>
  );
}

export default App;
