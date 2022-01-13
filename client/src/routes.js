import Home from "./pages/Home";
import Company from "./pages/Company";
import NotFound from "./pages/NotFound";

const routes = () => [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/company/:id",
    element: <Company />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
