import { IonContent, IonPage } from "@ionic/react";
import { Fingerprint } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import "../../src/index.css";
import { useGet, usePut } from "../hooks/useApi";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { GetDetailPayload } from "../models/GenericPayload";
import { KaryawanEntity } from "../models/Karyawan.entity";
import { useDistanceStore } from "../store/DistanceStore";
import Loading from "../components/Loading";
import NotifAlert from "../components/NotifAlert";
const Tab1: React.FC = () => {
  const distance = useDistanceStore((state) => state.distance);
  // const [successAlert, setSuccessAlert] = useState(false);
  const [dangerAlert, setDangerAlert] = useState(false);
  const [imageProfil, setImageProfil] = useState<string>(
    "assets/logo-icon.png"
  );
  const [isAbsenSuccess, setIsAbsenSuccess] = useState(false);
  const [user] = useLocalStorage("user");
  const [time, setTime] = useState<string>();

  const { data, isFetching } = useGet<GetDetailPayload<KaryawanEntity>>({
    name: "karyawan",
    endpoint: `karyawans/${user?.karyawan?.id}`,
  });

  useEffect(() => {
    if (isAbsenSuccess) {
      setTimeout(() => {
        setIsAbsenSuccess(false);
      }, 2000);
    }
  }, [isAbsenSuccess]);

  useEffect(() => {
    if (data) {
      let fotoUrl = "assets/logo-icon.png";

      if (!(data.data.foto === null || data.data.foto === "")) {
        fotoUrl = data.data.foto;
      }

      setTimeout(() => {
        setImageProfil(fotoUrl);
      }, 300);
    }
  }, [data]);

  const { mutate, isLoading: isAbsenLoading } = usePut({
    name: "do-absen",
    endpoint: `karyawans/${user?.karyawan.id}/absen`,
    onSuccessCallback: () => {
      // setSuccessAlert(true);
      setIsAbsenSuccess(true)
    },
    onErrorCallback: () => setDangerAlert(true),
  });

  useEffect(() => {
    setTime(moment().format("DD MMM YYYY, HH:mm"));
    setInterval(() => setTime(moment().format("DD MMM YYYY, HH:mm")), 5000);
  }, []);

  const handleAbsen = () => {
    mutate({});
  };

  return (
    <IonPage>
      <IonContent>
        {isFetching ? (
          <Loading />
        ) : (
          <>
            <div className="px-6 py-8 text-2xl  text-center">HRIS NOBEL</div>
            <div className="flex flex-col h-[75vh] justify-center">
              <div className="flex flex-col pt-6 px-6 items-center w-full gap-4">
                {/* <div className="bg-slate-300 w-48 h-48 rounded-full border-4 border-slate-900"> */}
                <img
                  src={imageProfil}
                  alt="Gambar Profil"
                  onError={() => setImageProfil("assets/logo-icon.png")}
                  className={`w-48 h-48 rounded-full border-2 border-zinc-50 object-cover ${imageProfil === "assets/logo-icon.png"
                      ? "animate-pulse"
                      : ""
                    }`}
                ></img>
                {/* </div> */}
                {/* HEADER TEXT */}
                <div className="text-center">
                  {/* <h4 className="text-sm text-slate-500 my-0">Welcome Back,</h4> */}
                  <h1 className="text-xl mt-1 mb-0 font-semibold">
                    {data?.data.nama_lengkap}
                  </h1>
                  <h4 className="text-sm text-slate-500 mt-1">{time}</h4>
                </div>
              </div>

              {!isAbsenSuccess ? (
                <button
                  className={`mx-auto mt-12  rounded-full w-24 h-24 justify-center flex items-center
                      px-5 py-2    cursor-pointer
                      ${distance <= 100 ? "bg-red-700" : "bg-gray-500"}`}
                  disabled={distance > 100 || isAbsenLoading}
                  onClick={handleAbsen}
                >
                  <Fingerprint className="w-16 h-16 text-white " />
                </button>
              ) : (
                <div className="mt-12 mx-auto text-center bg-red-600 text-white font-semibold rounded-xl px-2 py-1 w-48">
                  Berhasil Melakukan Absensi
                </div>
              )}
            </div>
          </>
        )}
      </IonContent>
      {/* <NotifAlert
        isOpen={successAlert}
        handleCancel={() => setSuccessAlert(false)}
        message="Berhasil Melakukan Absen"
        type="success"
      /> */}
      <NotifAlert
        isOpen={dangerAlert}
        handleCancel={() => setDangerAlert(false)}
        message="Gagal Melakukan Absen"
        type="danger"
      />
    </IonPage>
  );
};

export default Tab1;
