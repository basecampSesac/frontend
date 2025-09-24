import { Calendar, MapPin, User, UserRound } from "lucide-react";
import Modal from "./Modal";

interface Group {
  title: string;
  teams: string;
  date: string;
  location: string;
  personnel: string;
  leader: string;
}

export default function GroupCard({
  title,
  teams,
  date,
  location,
  personnel,
  leader,
}: Group) {
  return (
    <>
      <article className="h-80 border flex flex-col items-center justify-center py-5 px-3">
        <h2 className="text-2xl font-bold mb-1">{title}</h2>
        <p className="text-neutral-500 font-bold text-sm mb-4">{teams}</p>
        <div className=" flex items-center gap-1 text-neutral-500 text-base mb-2">
          <Calendar size={16} />
          <span className="font-bold">{date}</span>
        </div>
        <div className="flex items-center text-base gap-1  text-neutral-500 mb-3">
          <MapPin size={16} />
          <p className="font-bold">{location}</p>
        </div>
        <div className="flex items-center text-base mb-3">
          <UserRound size={16} />
          <p className="font-bold">{personnel}</p>
        </div>
        <div className=" flex items-center gap-1 text-gray-400 text-xs mb-2">
          <User size={14} />
          <span className="font-bold">{leader}</span>
        </div>
        <Modal
          buttonText="참여하기"
          classes="text-xs inline-flex items-center justify-center rounded-xl px-8 py-2 font-semibold bg-indigo-600 text-white hover:bg-indigo-700"
        />
      </article>
    </>
  );
}
