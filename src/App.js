import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  RouterForLoginUser,
  RouterForNotLoginUser,
} from "./utils/ProtectedRouter";
import routes from "./routes";
import Layout from "./components/Layout";
import Project from "./pages/Project";
import Story from "./pages/Stroy";
import Policy from "./pages/Policy";
import Login from "./pages/Login";
import Home from "./pages/Home";
import UploadProject from "./pages/UploadProject";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.index} element={<Layout />}>
            <Route path={routes.home} element={<Home />} />
            <Route
              path={routes.projectAdmin}
              element={
                <RouterForLoginUser>
                  <Project template="admin" />
                </RouterForLoginUser>
              }
            />
            <Route
              path={routes.projectUpload}
              element={
                <RouterForLoginUser>
                  <UploadProject />
                </RouterForLoginUser>
              }
            />
            <Route
              path={routes.storyAdmin}
              element={
                <RouterForLoginUser>
                  <Story template="admin" />
                </RouterForLoginUser>
              }
            />
            <Route
              path={routes.policyAdmin}
              element={
                <RouterForLoginUser>
                  <Policy template="admin" />
                </RouterForLoginUser>
              }
            />
            <Route
              path={routes.adminLogin}
              element={
                <RouterForNotLoginUser>
                  <Login />
                </RouterForNotLoginUser>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
