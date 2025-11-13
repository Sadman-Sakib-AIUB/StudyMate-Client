import { createBrowserRouter } from "react-router";
import HomeLayout from "../Layouts/HomeLayout";
import Register from "../Pages/Register";
import TopPartners from "../Components/TopPartners";
import FindPartners from "../Pages/FindPartners";
import PartnerDetails from "../Pages/PartnerDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout></HomeLayout>,
    children: [
        {
            path:'/',
            element:<TopPartners></TopPartners>
        },
        {

        }
    ],
  },
  {
    path: "/register",
    element: <Register></Register>,
  },
  {
    path: "/findPartners",
    element: <FindPartners></FindPartners>,
  },
  {
    path:'/partner/:id',
    element:<PartnerDetails></PartnerDetails>
  }
]);
