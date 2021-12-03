import { Routes as AppRoutes, Route } from "react-router-dom";

import Login from "../components/login/Login";
import Signup from "../components/signup/Signup";
import Home from '../components/home/Home';


const Routers = () => {
    return (
        <AppRoutes>
            <Route  path="/" element={<Login />} />
            <Route  path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            
        </AppRoutes>
    );
};

export default Routers;