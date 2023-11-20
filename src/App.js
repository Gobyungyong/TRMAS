import { BrowserRouter, Route, Routes } from 'react-router-dom';
import routes from './routes';
import Layout from './components/Layout';
import Admin from './pages/admin/Admin';
import Story from './pages/admin/Stroy';
import Policy from './pages/admin/Policy';
import Home from './pages/Home';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path={routes.index} element={<Layout />}>
                        <Route path={routes.admin} element={<Admin />} />
                        <Route path={routes.storyAdmin} element={<Story />} />
                        <Route path={routes.policyAdmin} element={<Policy />} />
                        <Route path={routes.home} element={<Home />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
