import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Register from "../Pages/Register";
import TopPartners from "../Components/TopPartners";
import FindPartners from "../Pages/FindPartners";
import PartnerDetails from "../Pages/PartnerDetails";
import PrivateRoute from "../Providers/PrivateRoute";
import Login from "../Pages/Login";
import CreateProfile from "../Pages/CreateProfile";
import MyConnections from "../Pages/MyConnections";
import Profile from "../Pages/Profile";
import ErrorPage from "../Pages/ErrorPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
      {
        path: "/",
        element: <TopPartners></TopPartners>,
      },
      {},
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/login",
    element: <Login></Login>,
  },
  {
    path: "/findPartners",
    element: (
      <PrivateRoute>
        <FindPartners></FindPartners>
      </PrivateRoute>
    ),
  },
  {
    path: "/partner/:id",
    element: (
      <PrivateRoute>
        <PartnerDetails></PartnerDetails>
      </PrivateRoute>
    ),
  },
  {
    path: "/createprofile",
    element: (
      <PrivateRoute>
        <CreateProfile></CreateProfile>
      </PrivateRoute>
    ),
  },
  {
    path: "/myconnections",
    element: (
      <PrivateRoute>
        <MyConnections></MyConnections>
      </PrivateRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <PrivateRoute>
        <Profile></Profile>
      </PrivateRoute>
    ),
  },
  {
    path:'*',
    element:<ErrorPage></ErrorPage>
  }
]);
