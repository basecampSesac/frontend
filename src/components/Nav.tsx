import { Outlet } from "react-router";

export default function Nav() {
  return (
    <>
      <aside className="fixed inset-y-0 left-0 w-2xs border-r bg-white/95 backdrop-blur z-40">
        <div className="h-25 border-b px-5 flex items-center font-semibold">
          LOGO
        </div>
        <nav className="p-4 space-y-2"></nav>
      </aside>
      <Outlet />
    </>
  );
}
