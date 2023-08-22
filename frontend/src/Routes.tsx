import React from "react";
import {
  BrowserRouter,
  Route,
  Routes as RouterRoutes,
} from "react-router-dom";
import { SignIn } from "./pages/SignIn";
import { SignUp } from "./pages/SignUp";
import { Home } from "./pages/Home";
import { Check } from "./pages/Check";
import { Header} from "./Header";

export const Routes: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <RouterRoutes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<SignIn />} />
          <Route path="/register" element={<SignUp />} />
          <Route path="/check" element={<Check />} />
        </RouterRoutes>
      </div>
    </BrowserRouter>
  );
};
