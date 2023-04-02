import './Styles/App.css';
import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider
} from 'react-router-dom'
import Home from './Routes/Home';
import Boards from './Routes/Boards'

const router = createHashRouter([
  {
    path: '/',
    element: (
      <Home />
    )
  },
  {
    path: 'boards/:id',
    element: (
      <Boards />
    )
  }
])

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
