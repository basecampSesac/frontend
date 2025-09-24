import SearchPanel from "../components/SearchPanel";
import GroupCard from "../components/GroupCard";

import { v4 as uuidv4 } from "uuid";
import Modal from "../components/Modal";

export default function GroupList() {
  const data = [
    {
      title: "수원 야구 관람 모임",
      teams: "KT 위즈 vs. 두산 베어스",
      date: "2024.05.15 (금) 18:30",
      location: "수원 KT 위즈파크",
      personnel: "5/10",
      leader: "야구매니아",
    },
    {
      title: "수원 야구 관람 모임",
      teams: "KT 위즈 vs. 두산 베어스",
      date: "2024.05.15 (금) 18:30",
      location: "수원 KT 위즈파크",
      personnel: "5/10",
      leader: "야구매니아",
    },
    {
      title: "수원 야구 관람 모임",
      teams: "KT 위즈 vs. 두산 베어스",
      date: "2024.05.15 (금) 18:30",
      location: "수원 KT 위즈파크",
      personnel: "5/10",
      leader: "야구매니아",
    },
    {
      title: "수원 야구 관람 모임",
      teams: "KT 위즈 vs. 두산 베어스",
      date: "2024.05.15 (금) 18:30",
      location: "수원 KT 위즈파크",
      personnel: "5/10",
      leader: "야구매니아",
    },
    {
      title: "수원 야구 관람 모임",
      teams: "KT 위즈 vs. 두산 베어스",
      date: "2024.05.15 (금) 18:30",
      location: "수원 KT 위즈파크",
      personnel: "5/10",
      leader: "야구매니아",
    },
    {
      title: "수원 야구 관람 모임",
      teams: "KT 위즈 vs. 두산 베어스",
      date: "2024.05.15 (금) 18:30",
      location: "수원 KT 위즈파크",
      personnel: "5/10",
      leader: "야구매니아",
    },
    {
      title: "수원 야구 관람 모임",
      teams: "KT 위즈 vs. 두산 베어스",
      date: "2024.05.15 (금) 18:30",
      location: "수원 KT 위즈파크",
      personnel: "5/10",
      leader: "야구매니아",
    },
    {
      title: "수원 야구 관람 모임",
      teams: "KT 위즈 vs. 두산 베어스",
      date: "2024.05.15 (금) 18:30",
      location: "수원 KT 위즈파크",
      personnel: "5/10",
      leader: "야구매니아",
    },
  ];

  return (
    <>
      {/* 레이아웃 상수: 사이드바/헤더/검색 패널 크기를 CSS 변수로 통일 */}
      <div className="[--sb:18rem] [--hd:96px] [--sp:80px]">
        {/* 상단 헤더 */}
        <header className="fixed top-0 left-[var(--sb)] right-0 h-[var(--hd)] backdrop-blur z-30">
          <div className="h-full px-16 py-6 flex flex-col justify-center">
            <h1 className="font-extrabold text-3xl mb-2">직관 모임</h1>
            <p className="text-xl text-neutral-500">
              야구를 함께 즐길 동료들을 만나보세요.
            </p>
            <Modal
              buttonText="모임 등록하기"
              classes={"absolute right-25 bottom-5 border py-2 px-4 rounded-md"}
            />
          </div>
        </header>

        {/* 고정 검색 패널 */}
        <section
          aria-label="검색"
          className="fixed left-[var(--sb)] right-0 top-[var(--hd)] h-[var(--sp)] bg-white z-30"
        >
          <SearchPanel />
        </section>

        {/* 메인 콘텐츠 */}
        <main className="ml-[var(--sb)] pt-[calc(var(--hd)+var(--sp))]">
          {/* 스크롤 영역: (뷰포트 - 헤더 - 검색) */}
          <div className="h-[calc(100vh_-_var(--hd)_-_var(--sp))] overflow-y-auto p-6 scrollbar-hide">
            {/* 카드 그리드 */}
            <div className="px-6 py-6">
              <div className="grid gap-6 grid-cols-[repeat(auto-fit,_minmax(217px,_217px))] justify-center">
                {data.map((item) => (
                  <GroupCard key={uuidv4()} {...item} />
                ))}
              </div>

              {/* 무한 스크롤 옵저버용 스페이서 */}
              <div className="h-16" />
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
