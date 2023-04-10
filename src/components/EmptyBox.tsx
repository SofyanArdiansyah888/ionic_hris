import { HiOutlineFolder } from "react-icons/hi2";

export default function EmptyBox() {
  return (
    <>
      <div className="flex flex-col text-3xl items-center h-full gap-4 justify-center opacity-50">
        <HiOutlineFolder className="w-24 h-24" strokeWidth={1} />
        Data Kosong
      </div>
    </>
  );
}
