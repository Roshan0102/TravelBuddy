import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from "./component/Headerarea";
import Publishride from "./component/Publishride";
import Viewrides from "./component/Viewrides";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Requestrides from './component/requests';
function App() {
  return (
<Router>
            <Routes>
                <Route path="/" element={<Signup />} />
                <Route path="/Login" element={<Login />} />
                <Route path="/Headerarea" element={<Homepage />} />
                <Route path="/Publishride" element={<Publishride />} />
                <Route path="/Viewrides" element={<Viewrides />} />
                <Route path="/requests" element={<Requestrides />} />
            </Routes>
        </Router>
  );
}

export default App;

