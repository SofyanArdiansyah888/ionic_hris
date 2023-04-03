import { IonContent, IonPage } from "@ionic/react";
import { ArrowLeftCircle, PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import CircleShadowButton from "../../../components/CircleShadowButton";
import Loading from "../../../components/Loading";
import TitleHeader from "../../../components/TitleHeader";
import { useGet } from "../../../hooks/useApi";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { GetDetailPayload } from "../../../models/GenericPayload";
import { KaryawanEntity } from "../../../models/Karyawan.entity";

const DataPelatihan: React.FC = () => {
  const history = useHistory();
  const [user] = useLocalStorage("user");

  const { data: payload, isLoading } = useGet<GetDetailPayload<KaryawanEntity>>(
    {
      name: "karyawan",
      endpoint: `karyawans/${user?.karyawan.id}`,
    }
  );
  return (
    <IonPage>
      <TitleHeader
        title="Data Pelatihan"
        rightIcon={
          <div className="flex flex-row justify-between items-center gap-4">
            <PlusCircleIcon
              className="w-8 h-8 cursor-pointer"
              onClick={() => {
                history.push("/create-pelatihan");
              }}
            />
            <ArrowLeftCircle
              className="w-8 h-8 cursor-pointer"
              onClick={() => history.push("/profil")}
            />
          </div>
        }
      />

      <IonContent fullscreen>
        {isLoading ? (
          <Loading />
        ) : (
          <div className="px-6 mt-4 divide-y-2  ">
            <ul className="max-w-md divide-y-2 divide-black">
              {payload?.data?.riwayat_training_karyawans?.map(
                (pelatihan, index) => (
                  <li key={index} className="py-3 cursor-pointer">
                    <div className="text-xs font-bold text-gray-900 flex gap-3 items-center w-full ">
                      <CircleShadowButton
                        icon={
                          <Trash2Icon className="w-6 h-6 p-1 text-red-700" />
                        }
                      />

                      <div className="flex-1">
                        <Link to={`/data-pelatihan/${pelatihan.id}`}>
                          <p>{pelatihan.nama_kegiatan}</p>
                          <p className="text-xs text-slate-500 font-light ">
                            {pelatihan.tahun}
                          </p>
                        </Link>
                      </div>
                    </div>
                  </li>
                )
              )}
            </ul>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DataPelatihan;
