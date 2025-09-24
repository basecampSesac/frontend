import { Search, ChevronDown } from "lucide-react";

export default function SearchPanel() {
  return (
    <>
      <div className="h-full border rounded-md mx-16 shadow-md pl-6 grid grid-cols-4 items-center gap-7">
        <div className="flex flex-col">
          {/* 구단 */}
          <label className="text-sm font-semibold mb-1">구단</label>
          <div className="relative w-full">
            <select className="w-full h-10 border rounded-md px-3 text-sm bg-white focus:outline-none appearance-none pr-8">
              <option>전체</option>
              <option>옵션1</option>
              <option>옵션2</option>
            </select>

            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        {/* 날짜 */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">날짜</label>
          <div className="relative w-full">
            <select className="w-full h-10 border rounded-md px-3 text-sm bg-white focus:outline-none appearance-none pr-8">
              <option>전체</option>
              <option>옵션1</option>
              <option>옵션2</option>
            </select>

            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        {/* 경기장 */}
        <div className="flex flex-col">
          <label className="text-sm font-semibold mb-1">경기장</label>
          <div className="relative w-full">
            <select className="w-full h-10 border rounded-md px-3 text-sm bg-white focus:outline-none appearance-none pr-8">
              <option>전체</option>
              <option>옵션1</option>
              <option>옵션2</option>
            </select>

            <ChevronDown
              size={16}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none"
            />
          </div>
        </div>

        {/* 검색 버튼 */}
        <button className="ml-auto h-full w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 transition-colors rounded-tr-md rounded-br-md">
          <Search />
          <span className="font-semibold">검색</span>
        </button>
      </div>
    </>
  );
}
