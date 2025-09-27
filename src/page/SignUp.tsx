// src/page/SignupPage.tsx
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
console.log("✅ 현재 API_URL:", API_URL); // 디버깅용

export default function SignupPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [club, setClub] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [nicknameMessage, setNicknameMessage] = useState("");
  const [nicknameAvailable, setNicknameAvailable] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isEmailVerified, setIsEmailVerified] = useState(false); // 이메일 인증 여부
  const [isCodeSent, setIsCodeSent] = useState(false); // 인증번호 발송 여부

  const [emailMessage, setEmailMessage] = useState("");
  const [emailAvailable, setEmailAvailable] = useState(false);

  // 📌 이메일 중복 확인
  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);

    if (!value) {
      setEmailMessage("");
      setEmailAvailable(false);
      setIsEmailVerified(false);
      setIsCodeSent(false);
      setVerificationCode("");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/check-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: value }),
      });
      const data = await res.json();
      if (data.success) {
        setEmailMessage("가입이 가능한 이메일입니다.");
        setEmailAvailable(true);
      } else {
        setEmailMessage(data.message || "이미 사용 중인 이메일입니다.");
        setEmailAvailable(false);
      }
    } catch (err) {
      console.error("중복 확인 에러:", err);
      setEmailMessage("이메일 확인 중 오류가 발생했습니다.");
      setEmailAvailable(false);
    }
  };

  // 📌 인증번호 발송
  const handleSendCode = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/send-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (data.success) {
        alert("인증번호가 이메일로 발송되었습니다.");
        setIsCodeSent(true);
      } else {
        alert(data.message || "인증번호 발송 실패");
      }
    } catch (err) {
      console.error("인증번호 발송 에러:", err);
      alert("인증번호 발송 중 오류가 발생했습니다.");
    }
  };

  // 📌 인증번호 검증
  const handleVerifyCode = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/verify-code`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code: verificationCode }),
      });
      const data = await res.json();
      if (data.success) {
        alert("이메일 인증이 완료되었습니다.");
        setIsEmailVerified(true);
      } else {
        alert("인증번호가 올바르지 않습니다.");
      }
    } catch (err) {
      console.error("인증코드 검증 에러:", err);
      alert("인증번호 확인 중 오류가 발생했습니다.");
    }
  };

  // 📌 닉네임 중복 확인
  const handleNicknameChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setNickname(value);

    if (!value) {
      setNicknameMessage("");
      setNicknameAvailable(false);
      return;
    }

    try {
      const res = await fetch(`${API_URL}/api/auth/check-nickname`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nickname: value }),
      });
      const data = await res.json();
      if (data.success) {
        setNicknameMessage("사용 가능한 닉네임입니다.");
        setNicknameAvailable(true);
      } else {
        setNicknameMessage(data.message || "이미 사용 중인 닉네임입니다.");
        setNicknameAvailable(false);
      }
    } catch (err) {
      console.error("닉네임 확인 에러:", err);
      setNicknameMessage("닉네임 확인 중 오류가 발생했습니다.");
      setNicknameAvailable(false);
    }
  };

  // 📌 최종 회원가입
  const handleSignup = async () => {
    try {
      const res = await fetch(`${API_URL}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, nickname, club, password }),
      });
      const data = await res.json();
      if (data.success) {
        alert("회원가입이 완료되었습니다. 로그인 해주세요.");
        navigate("/login");
      } else {
        alert(data.message || "회원가입에 실패했습니다.");
      }
    } catch (err) {
      console.error("회원가입 에러:", err);
      alert("회원가입 중 오류가 발생했습니다.");
    }
  };

  // 📌 비밀번호 유효성 검사
  const isPasswordValid =
    password.length >= 8 &&
    /[A-Z]/.test(password) &&
    /[a-z]/.test(password) &&
    /[0-9]/.test(password) &&
    /[!@#$%^&*(),.?":{}|<>]/.test(password);

  const isValid =
    email.trim() !== "" &&
    nickname.trim() !== "" &&
    password.trim() !== "" &&
    confirmPassword.trim() !== "" &&
    password === confirmPassword &&
    isPasswordValid &&
    isEmailVerified &&
    nicknameAvailable;

  return (
    <main className="flex flex-1 items-center justify-center bg-white py-30">
      <div className="w-full max-w-sm p-6 rounded-lg bg-white">
        <h1 className="text-2xl font-bold mb-8 text-center">회원가입</h1>

        {/* 이메일 */}
        <label className="block mb-4">
          <span className="block text-sm font-medium mb-1 text-gray-600">
            이메일*
          </span>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            placeholder="이메일을 입력해주세요."
            className="w-full rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6F00B6]"
            style={{ border: "1px solid rgba(112,115,124,0.22)" }}
          />
          {emailMessage && (
            <p
              className={`text-sm mt-1 ${
                emailAvailable ? "text-green-600" : "text-red-500"
              }`}
            >
              {emailMessage}
            </p>
          )}
        </label>

        {/* 인증번호 */}
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="인증번호를 입력해주세요."
            className="w-full rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6F00B6]"
            style={{ border: "1px solid rgba(112,115,124,0.22)" }}
            disabled={isEmailVerified}
          />
          <button
            type="button"
            onClick={
              isEmailVerified
                ? undefined
                : verificationCode
                ? handleVerifyCode
                : handleSendCode
            }
            disabled={!emailAvailable || isEmailVerified}
            className="px-3 rounded-lg border text-sm font-medium text-[#6F00B6] hover:bg-gray-50 whitespace-nowrap"
          >
            {isEmailVerified
              ? "인증 완료"
              : verificationCode
              ? "인증 확인"
              : "인증번호 받기"}
          </button>
        </div>

        {/* 닉네임 */}
        <label className="block mb-4">
          <span className="block text-sm font-medium mb-1 text-gray-600">
            닉네임*
          </span>
          <input
            type="text"
            value={nickname}
            onChange={handleNicknameChange}
            placeholder="닉네임을 입력해주세요."
            className="w-full rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6F00B6]"
            style={{ border: "1px solid rgba(112,115,124,0.22)" }}
          />
          {nicknameMessage && (
            <p
              className={`text-sm mt-1 ${
                nicknameAvailable ? "text-green-600" : "text-red-500"
              }`}
            >
              {nicknameMessage}
            </p>
          )}
        </label>

        {/* 구단 선택 */}
        <label className="block mb-4">
          <span className="block text-sm font-medium mb-1 text-gray-600">
            좋아하는 구단 (선택)
          </span>
          <select
            value={club}
            onChange={(e) => setClub(e.target.value)}
            className="w-full rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#6F00B6]"
            style={{ border: "1px solid rgba(112,115,124,0.22)" }}
          >
            <option value="">선택 안 함</option>
            <option value="두산">두산</option>
            <option value="롯데">롯데</option>
            <option value="삼성">삼성</option>
            <option value="SSG">SSG</option>
            <option value="키움">키움</option>
            <option value="KT">KT</option>
            <option value="NC">NC</option>
            <option value="LG">LG</option>
            <option value="기아">기아</option>
            <option value="한화">한화</option>
          </select>
        </label>

        {/* 비밀번호 */}
        <label className="block mb-4">
          <span className="block text-sm font-medium mb-1 text-gray-600">
            비밀번호*
          </span>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요."
              className="w-full rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#6F00B6]"
              style={{ border: "1px solid rgba(112,115,124,0.22)" }}
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
          <p className="text-xs text-gray-500 mt-1">
            영문 대소문자, 숫자, 특수문자를 포함해 8~16자로 입력해주세요.
          </p>
        </label>

        {/* 비밀번호 확인 */}
        <label className="block mb-6">
          <span className="block text-sm font-medium mb-1 text-gray-600">
            비밀번호 확인*
          </span>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="비밀번호를 다시 입력해주세요."
              className="w-full rounded-lg p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-[#6F00B6]"
              style={{ border: "1px solid rgba(112,115,124,0.22)" }}
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
            >
              {showConfirmPassword ? (
                <AiOutlineEyeInvisible size={20} />
              ) : (
                <AiOutlineEye size={20} />
              )}
            </button>
          </div>
          {password !== confirmPassword && confirmPassword !== "" && (
            <p className="text-sm text-red-500 mt-1">
              비밀번호가 일치하지 않습니다.
            </p>
          )}
        </label>

        {/* 뒤로가기 */}
        <button
          onClick={() => navigate("/login")}
          className="w-full py-3 rounded-lg font-semibold text-gray-600 hover:bg-gray-100 transition-colors mb-4"
          style={{ border: "1px solid rgba(112,115,124,0.22)" }}
        >
          ← 로그인 화면으로 돌아가기
        </button>

        {/* 회원가입 */}
        <button
          onClick={handleSignup}
          disabled={!isValid}
          className={`w-full py-3 rounded-lg font-semibold transition-colors ${
            isValid
              ? "bg-[#6F00B6] text-white hover:bg-[#8A2BE2]"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          가입하기
        </button>
      </div>
    </main>
  );
}
