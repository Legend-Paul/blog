import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter(createRoutesFromElements(<></>));

function App() {
  <RouterProvider router={router} />;
}

export default App;
