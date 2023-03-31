import { FaFolder } from "react-icons/fa";

export default function EmptyBox() {
  return (
    <>
      <div className="flex flex-col text-3xl items-center h-full gap-4 justify-center opacity-50">
        <FaFolder className="w-24 h-24" />
        No Data
      </div>
    </>
  );
}
