import { createBrowserRouter, RouterProvider } from "react-router";
import Nav from "./components/Nav";
import TicketList from "./page/TicketList";
import GroupList from "./page/GroupList";

const router = createBrowserRouter([
  {
    Component: Nav,
    children: [
      { path: "/tickets", Component: TicketList },
      {
        path: "/groups",
        Component: GroupList,
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
