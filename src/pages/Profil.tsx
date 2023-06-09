import { IonContent, IonPage } from "@ionic/react";
import { ArrowRightCircleIcon, LockIcon } from "lucide-react";
import { ReactNode } from "react";
import { HiOutlineDocument, HiOutlineWallet } from "react-icons/hi2/index";
import {
  MdFamilyRestroom,
  MdInfoOutline,
  MdModelTraining,
  MdOutlineSchool,
} from "react-icons/md/index";
import { useHistory } from "react-router";
const Profil: React.FC = () => {
  const history = useHistory();
  const menus: IList[] = [
    {
      text: "Ubah Password",
      icon: <LockIcon className="w-6 h-6 text-red-700 p-1" />,
      handleClick: () => history.push("/ubah-password"),
    },
    {
      text: "Informasi Dasar",
      icon: <MdInfoOutline className="w-6 h-6 text-red-700 p-1" />,
      handleClick: () => history.push("/informasi-dasar"),
    },
    {
      text: "Data Keluarga",
      icon: <MdFamilyRestroom className="w-6 h-6 text-red-700 p-1" />,
      handleClick: () => history.push("/data-keluarga"),
    },
    {
      text: "Data Pelatihan",
      icon: <MdModelTraining className="w-6 h-6 text-red-700 p-1" />,
      handleClick: () => history.push("/data-pelatihan"),
    },

    {
      text: "Data Pendidikan",
      icon: <MdOutlineSchool className="w-6 h-6 text-red-700 p-1" />,
      handleClick: () => history.push("/data-pendidikan"),
    },
    {
      text: "Data Dokumen",
      icon: <HiOutlineDocument className="w-6 h-6 text-red-700 p-1" />,
      handleClick: () => history.push("/data-dokumen"),
    },
    {
      text: "Data Rekening",
      icon: <HiOutlineWallet className="w-6 h-6 text-red-700 p-1" />,
      handleClick: () => history.push("/data-rekening"),
    },
  ];
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="px-8 ">
          <div className="flex flex-row items-center w-full gap-8 my-10">
            <div className="bg-slate-300 w-24 h-24 rounded-full border-4 border-slate-900">
              <img
                src="https://i.pravatar.cc/300"
                width="100%"
                height="100%"
                alt="Gambar Profil"
                className="rounded-full"
              ></img>
            </div>
            {/* HEADER TEXT */}
            <div className="text-left">
              {/* <h4 className="text-sm text-slate-500 my-0">Welcome Back,</h4> */}
              <h1 className="text-xl mt-1 mb-0 font-bold">
                {" "}
                Sofyan Ardiansyah
              </h1>
              <h4 className="text-sm text-slate-500 mt-1">
                Software Developer
              </h4>
            </div>
          </div>
          <ul className="max-w-md divide-y-2 divide-black mb-4 ">
            {menus.map((props, index) => (
              <List {...props} key={index} />
            ))}
          </ul>
        </div>
      </IonContent>
    </IonPage>
  );
};

interface IList {
  icon: ReactNode;
  text: string;
  handleClick(): void;
}
function List({ icon, text, handleClick }: IList) {
  return (
    <li className="py-3 cursor-pointer">
      <div
        className="flex flex-row justify-between gap-3 items-center w-full"
        onClick={handleClick}
      >
        <div className="flex gap-8 items-center">
          <div className="rounded-full p-1 border border-b-2 border-r-4 border-black  shadow-[5px_5px_0px_0px_#000] ">
            {icon}
          </div>
          <div className="text-sm  font-bold">{text}</div>
        </div>

        <div className="rounded-full p-1 border border-b-2 border-r-4 border-black  shadow-[5px_5px_0px_0px_#000] ">
          <ArrowRightCircleIcon className="w-6 h-6 text-red-700" />
        </div>
      </div>
    </li>
  );
}

export default Profil;
