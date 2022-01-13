import routes from "./routes";
import { BrowserRouter as Router, useRoutes } from "react-router-dom";

function App() {
  const routing = useRoutes(routes());
  return <>{routing}</>;
}

const AppWrapper = () => {
  return (
    <Router>
      <App />
    </Router>
  );
};

export default AppWrapper;
