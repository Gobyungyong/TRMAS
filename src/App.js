import { BrowserRouter, Route, Routes } from "react-router-dom";
import routes from "./routes";
import Layout from "./components/Layout";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.index} element={<Layout />}>
            <Route path={routes.admin} element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
