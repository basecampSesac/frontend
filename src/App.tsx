import { createBrowserRouter, RouterProvider } from "react-router";
import Nav from "./components/Nav";
import TicketList from "./page/TicketList";
import GroupList from "./page/GroupList";
import LoginPage from "./page/Login";
import SignupPage from "./page/SignUp";

const router = createBrowserRouter([
  {
    Component: Nav,
    children: [
      { path: "/tickets", Component: TicketList },
      {
        path: "/groups",
        Component: GroupList,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/signup",
        Component: SignupPage,
      },
    ],
  },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
