import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Headerarea from "./component/Headerarea";
import Publishride from "./component/Publishride";
import Viewrides from "./component/Viewrides";
import Login from "./component/Login";
import Signup from "./component/Signup";
import Requestrides from './component/requests';
import Bodyarea from './component/Bodyarea';

function App() {
  return (
    <Router>
<Routes>
  {/* Routes without Headerarea */}
  <Route path="/" element={<Signup />} />
  <Route path="/Login" element={<Login />} />

  {/* Route to Bodyarea */}
  <Route path="/bodyarea" element={<Bodyarea />} />

  {/* Other routes */}
  <Route path="/requests" element={<Requestrides />} />
  <Route path="/Viewrides" element={<Viewrides />} />
  <Route path="/Publishride" element={<Publishride />} />
</Routes>
    </Router>
  );
}

export default App;
