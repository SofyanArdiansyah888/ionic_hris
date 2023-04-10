import { IonContent, IonPage } from "@ionic/react";
import { ArrowRightCircleIcon, LockIcon } from "lucide-react";
import { ReactNode, useEffect, useState } from "react";
import { CiLogout } from "react-icons/ci";
import { HiOutlineDocument, HiOutlineWallet } from "react-icons/hi2/index";
import {
  MdFamilyRestroom,
  MdInfoOutline,
  MdModelTraining,
  MdOutlineSchool,
} from "react-icons/md/index";
import { useHistory } from "react-router";
import { useGet, useUploadPost } from "../../hooks/useApi";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { GetDetailPayload } from "../../models/GenericPayload";
import { KaryawanEntity } from "../../models/Karyawan.entity";
import { useAuth } from "../../providers/AuthProvider";
const Profil: React.FC = () => {
  const history = useHistory();
  const auth = useAuth();
  const [user] = useLocalStorage("user");
  const { data, isLoading } = useGet<GetDetailPayload<KaryawanEntity>>({
    name: "karyawan",
    endpoint: `karyawans/${user?.karyawan.id}`,
  });
  const [image, setImage] = useState<any>("");
  useEffect(()=>{
    setImage(data?.data.foto)
  },[data])

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
    {
      text: "Keluar",
      icon: <CiLogout className="w-6 h-6 text-red-700 p-1" />,
      handleClick: () => {
        auth.logout();
        window.location.reload();
      },
    },
  ];

  const {mutate} = useUploadPost({
    name:'karyawan',
    endpoint:'upload-foto'
  })

  const handleImageChange = (e: any) => {
    const selectedImage = e.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(selectedImage);

    const formData = new FormData();
    formData.append('file', selectedImage);
    formData.append('karyawan_id',user?.karyawan?.id)
    mutate(formData)
  };
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="px-8 ">
          <div className="flex flex-row items-center w-full gap-8 my-10">
            <div className="bg-slate-300 w-26 h-26 rounded-full  ">
              <label>
                <img
                  src={image}
                  alt="Gambar Profil"
                  className="rounded-full w-24 h-24 border-2 border-slate-900  object-cover "
                ></img>
                <input
                  type="file"
                  onChange={handleImageChange}
                  accept="image/*"
                  className="hidden"
                />
              </label>
            </div>
            {/* HEADER TEXT */}
            <div className="text-left">
              {/* <h4 className="text-sm text-slate-500 my-0">Welcome Back,</h4> */}
              <h1 className="text-xl mt-1 mb-0 font-semibold capitalize">
                {data?.data.nama_lengkap}
              </h1>
              <h4 className="text-sm text-slate-500 mt-1 capitalize">
                {data?.data.jabatan?.nama_jabatan}
              </h4>
            </div>
          </div>
          <ul className="max-w-md divide-y-2 divide-zinc-300 mb-4 ">
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
          <div className="rounded-full p-1 border  border-zinc  ">
            {icon}
          </div>
          <div className="text-sm  font-semibold">{text}</div>
        </div>

        <div className="rounded-full p-1 border  border-zinc ">
          <ArrowRightCircleIcon className="w-6 h-6 text-red-700" />
        </div>
      </div>
    </li>
  );
}

export default Profil;
