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
import UploadStory from "./pages/UploadStory";
import StoryDetail from "./pages/StoryDetail";
import PolicyDetail from "./pages/PolicyDetail";
import UploadPolicy from "./pages/UploadPolicy";
import About from "./pages/About";
import NotFound from "./pages/404";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routes.index} element={<Layout />}>
            <Route path={routes.index} element={<Home />} />
            <Route path={routes.about} element={<About />} />
            <Route path={routes.project} element={<Project />} />
            <Route path={routes.story} element={<Story />} />
            <Route path={routes.storyDetail} element={<StoryDetail />} />
            <Route path={routes.policy} element={<Policy />} />
            <Route path={routes.policyDetail} element={<PolicyDetail />} />
            <Route
              path={routes.admin}
              element={
                <RouterForLoginUser>
                  <Project template="admin" />
                </RouterForLoginUser>
              }
            />
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
              path={routes.projectModify}
              element={
                <RouterForLoginUser>
                  <UploadProject template="modify" />
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
              path={routes.storyUpload}
              element={
                <RouterForLoginUser>
                  <UploadStory />
                </RouterForLoginUser>
              }
            />
            <Route
              path={routes.storyModify}
              element={
                <RouterForLoginUser>
                  <UploadStory template="modify" />
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
              path={routes.policyDetailAdmin}
              element={
                <RouterForLoginUser>
                  <PolicyDetail template="admin" />
                </RouterForLoginUser>
              }
            />
            <Route
              path={routes.policyUpload}
              element={
                <RouterForLoginUser>
                  <UploadPolicy />
                </RouterForLoginUser>
              }
            />
            <Route
              path={routes.policyModify}
              element={
                <RouterForLoginUser>
                  <UploadPolicy template="modify" />
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
            <Route path={routes.notFound} element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
