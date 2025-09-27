import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./layouts/Layout";
import TicketList from "./page/TicketList";
import GroupList from "./page/GroupList";
import LoginPage from "./page/Login";
import SignupPage from "./page/SignUp";

const router = createBrowserRouter([
  {
    Component: Layout,
    children: [
      { path: "/", Component: TicketList },
      { path: "/tickets", Component: TicketList },
      { path: "/groups", Component: GroupList },
      { path: "/login", Component: LoginPage },
      { path: "/signup", Component: SignupPage },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
