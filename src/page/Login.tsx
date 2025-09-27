// src/page/Login.tsx
import { useAuthStore } from "../store/authStore";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

export default function LoginPage() {
  const { email, password, setEmail, setPassword, login } = useAuthStore();
  const navigate = useNavigate();
  const isValid = email.trim() !== "" && password.trim() !== "";
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) throw new Error("로그인 실패");
      const data = await res.json();

      if (data.success) {
        login(data.user, data.accessToken);
        navigate("/");
      } else {
        alert("이메일 또는 비밀번호를 확인하세요.");
      }
    } catch (err) {
      console.error("로그인 에러:", err);
      alert("로그인 중 오류가 발생했습니다.");
    }
  };

  return (
    <main className="flex flex-1 items-center justify-center bg-white py-">
      <div className="w-full max-w-sm p-6 rounded-lg bg-white">
        {/* 타이틀 */}
        <h1 className="text-2xl font-bold mb-8 text-center">이메일로 로그인</h1>

        {/* 이메일 */}
        <label className="block mb-4">
          <span className="block text-sm font-medium mb-1 text-gray-600">
            이메일
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="이메일을 입력해주세요."
            className="w-full rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6F00B6]"
            style={{ border: "1px solid rgba(112, 115, 124, 0.22)" }}
          />
        </label>

        {/* 비밀번호 */}
        <label className="block mb-4">
          <span className="block text-sm font-medium mb-1 text-gray-600">
            비밀번호
          </span>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
              className="w-full rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#6F00B6]"
              style={{ border: "1px solid rgba(112, 115, 124, 0.22)" }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
        </label>

        {/* 옵션 */}
        <div className="flex items-center justify-between mb-6 text-sm text-gray-600">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              className="accent-[#6F00B6] hover:accent-[#8A2BE2]"
            />
            로그인 유지
          </label>
          <a href="#" className="hover:underline">
            비밀번호 재설정
          </a>
        </div>

        {/* 로그인 버튼 */}
        <button
          onClick={handleLogin}
          disabled={!isValid}
          className={`w-full py-3 rounded-lg font-semibold mb-6 transition-colors ${
            isValid
              ? "bg-[#6F00B6] text-white hover:bg-[#8A2BE2]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          로그인
        </button>

        {/* 구분선 */}
        <div className="flex items-center mb-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">또는</span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        <button
          className="w-full py-3 rounded-lg font-semibold text-[#6F00B6] hover:bg-gray-50 transition-colors"
          onClick={() => navigate("/signup")}
          style={{ border: "1px solid rgba(112, 115, 124, 0.22)" }}
        >
          이메일로 계속하기
        </button>

        {/* 소셜 로그인 구분선 */}
        <div className="flex items-center my-6">
          <div className="flex-grow h-px bg-gray-300"></div>
          <span className="px-3 text-gray-400 text-sm">
            소셜 계정으로 로그인
          </span>
          <div className="flex-grow h-px bg-gray-300"></div>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <div className="space-y-3">
          <button
            className="w-full py-3 rounded-lg font-semibold text-black hover:bg-gray-50 transition-colors"
            style={{ border: "1px solid rgba(112, 115, 124, 0.22)" }}
          >
            카카오로 로그인
          </button>
          <button
            className="w-full py-3 rounded-lg font-semibold text-black hover:bg-gray-50 transition-colors"
            style={{ border: "1px solid rgba(112, 115, 124, 0.22)" }}
          >
            네이버로 로그인
          </button>
          <button
            className="w-full py-3 rounded-lg font-semibold text-black hover:bg-gray-50 transition-colors"
            style={{ border: "1px solid rgba(112, 115, 124, 0.22)" }}
          >
            구글로 로그인
          </button>
        </div>
      </div>
    </main>
  );
}
