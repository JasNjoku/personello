import {
  createHashRouter,
  RouterProvider
} from "react-router-dom"

import Home from "./Routes/Home"
import BoardComponent from "./Routes/Boards"
//Router for the two pages, Home and Boards
const router = createHashRouter([
  {
    path: '/',
    element: (
      <Home />
    )
  },
  {
    path: 'board/:id',
    element: (
      <BoardComponent />
    )
  }
])

const App = () => {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  )
}

export default App;