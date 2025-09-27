// src/components/Navbar.tsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export function Navbar() {
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const { isAuthenticated, user, logout } = useAuthStore();

  // 메뉴 외부 클릭 시 닫힘
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenu(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full border-b border-gray-200 bg-white/95 backdrop-blur z-50">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* 로고 */}
        <div
          className="text-2xl font-bold text-[#6F00B6] cursor-pointer flex items-center gap-1"
          onClick={() => navigate("/")}
        >
          <img src="/logo.png" alt="로고" className="h-8 w-auto" />
          직관
        </div>

        {/* 메뉴 */}
        <nav
          ref={menuRef}
          className="hidden md:flex items-center gap-6 text-base font-semibold text-[#29292D] flex-grow ml-8"
        >
          <div className="relative">
            <button
              onClick={() =>
                setOpenMenu(openMenu === "ticket" ? null : "ticket")
              }
              className="hover:text-[#6F00B6]"
            >
              티켓 거래
            </button>
            {openMenu === "ticket" && (
              <div className="absolute left-0 mt-2 w-56 rounded-md bg-white border border-gray-200">
                <button className="block w-full px-5 py-2 text-left text-sm hover:bg-gray-50">
                  티켓 목록
                </button>
                <hr className="border-gray-200" />
                <button className="block w-full px-5 py-2 text-left text-sm hover:bg-gray-50">
                  예매 내역
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() =>
                setOpenMenu(openMenu === "meeting" ? null : "meeting")
              }
              className="hover:text-[#6F00B6]"
            >
              직관 모임
            </button>
            {openMenu === "meeting" && (
              <div className="absolute left-0 mt-2 w-56 rounded-md bg-white border border-gray-200">
                <button className="block w-full px-5 py-2 text-left text-sm hover:bg-gray-50">
                  모임 둘러보기
                </button>
                <hr className="border-gray-200" />
                <button className="block w-full px-5 py-2 text-left text-sm hover:bg-gray-50">
                  내 모임
                </button>
              </div>
            )}
          </div>

          <div>
            <button className="hover:text-[#6F00B6]">경기 일정</button>
          </div>
        </nav>

        {/* 오른쪽 */}
        <div className="flex items-center gap-3 text-sm font-medium">
          {isAuthenticated ? (
            <>
              <button
                onClick={() => navigate("/mypage")}
                className="px-4 py-2 border rounded-lg text-[#6F00B6] font-semibold border-gray-200 hover:bg-[#f9f5ff] transition"
              >
                마이페이지
              </button>
              <button
                onClick={logout}
                className="px-4 py-2 border rounded-lg text-[#6F00B6] font-semibold border-gray-200 hover:bg-[#f9f5ff] transition"
              >
                로그아웃
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 border rounded-lg text-[#6F00B6] font-semibold border-gray-200 hover:bg-[#f9f5ff] transition"
              >
                로그인
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-4 py-2 border rounded-lg text-[#6F00B6] font-medium border-gray-200 hover:bg-[#f9f5ff] transition"
              >
                회원가입
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
