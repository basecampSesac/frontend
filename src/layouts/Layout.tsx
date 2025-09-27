// src/layouts/Layout.tsx
import { Outlet } from "react-router-dom";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";

export default function Layout() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 pt-16">
        {" "}
        {/* pt-16 = 네비바 높이만큼 아래로 밀기 */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
