import { Calendar, User } from "lucide-react";
import Modal from "./Modal";

type Ticket = {
  title: string;
  date: string;
  price: string;
  location: string;
  user: string;
  rate: number;
};

export default function TicketCard({
  title,
  date,
  price,
  location,
  user,
  rate,
}: Ticket) {
  return (
    <>
      <article className="h-80">
        {/* 이미지 영역 */}
        <div className="relative mb-2">
          <div className="h-45 bg-gray-200"></div>
          <span className="absolute top-2 right-2 rounded-full bg-black/50 text-white text-xs px-2 py-0.5">
            {location}
          </span>
        </div>

        {/* 본문 */}
        <div className=" flex flex-col h-[calc(100%-9rem)]">
          {/* 제목 */}
          <h2 className="text-xl font-bold leading-snug mb-2 text-center">
            {title}
          </h2>

          {/* 날짜 */}
          <div className=" flex items-center gap-1  text-neutral-500 text-sm mb-2">
            <Calendar size={16} />
            <span className="font-bold">{date}</span>
          </div>

          {/* 가격 + 하단 */}
          <div className="flex items-end justify-between">
            <div>
              <div className="text-xl font-extrabold text-indigo-600 mb-2">
                {price}원
              </div>
              <div className="mt-1 flex items-center gap-1 text-gray-400 text-xs">
                <User size={14} />
                <span>{user}</span>
                <span>({rate})</span>
              </div>
            </div>

            <Modal
              buttonText="상세보기"
              classes="text-xs inline-flex items-center justify-center rounded-xl px-8 py-2 font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
            />
          </div>
        </div>
      </article>
    </>
  );
}
