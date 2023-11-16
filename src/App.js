import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/test" element={<Layout />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
