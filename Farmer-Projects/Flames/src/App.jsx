import { Route, Routes, Navigate, Outlet } from 'react-router-dom';

import Layout from './Layout';
import Home from './Pages/Home';
import Signin from './Pages/Signin';
import UserProfile from './Pages/UserProfile';
import Farmersignup from './Pages/FarmerSignup';
import EditProfile from './Pages/EditProfile';

const isAuthenticated = () => {
  const accessToken = localStorage.getItem('accessToken');
  return !!accessToken; // Returns true if there is an access token, false otherwise
};

const InvestorRoute = ({ element }) => {
  if (isAuthenticated()) {
    const type = localStorage.getItem("userType");
    if (type === "farmer") {
      return <Navigate to="/home" />;
    }
    return element;
  } else {
    return <Navigate to="/signin" />;
  }
};

const FarmerRoute = ({ element }) => {
  if (isAuthenticated()) {
    const type = localStorage.getItem("userType");
    if (type === "investor") {
      return <Navigate to="/" />;
    }
    return element;
  } else {
    return <Navigate to="/signin" />;
  }
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="profile/:id" element={<InvestorRoute element={<UserProfile />} />} />
        <Route path="editprofile" element={<EditProfile />} />
      </Route>
      <Route path="signin" element={<Signin />} />
      <Route path="farmersignup" element={<Farmersignup />} />
    </Routes>
  );
}

export default App;
