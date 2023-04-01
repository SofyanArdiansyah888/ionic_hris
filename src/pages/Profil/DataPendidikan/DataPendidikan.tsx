import { IonContent, IonPage } from "@ionic/react";
import { ArrowLeftCircle, PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useHistory } from "react-router";
import CircleShadowButton from "../../../components/CircleShadowButton";
import TitleHeader from "../../../components/TitleHeader";
import { useGet } from "../../../hooks/useApi";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { GetDetailPayload } from "../../../models/GenericPayload";
import { KaryawanEntity } from "../../../models/Karyawan.entity";

const DataPendidikan: React.FC = () => {
  const history = useHistory();
  const [user] = useLocalStorage("user");

  const { data:payload, isLoading } = useGet<GetDetailPayload<KaryawanEntity>>({
    name: "karyawan",
    endpoint: `karyawans/${user?.karyawan.id}`,
  });

  return (
    <IonPage>
      <TitleHeader
        title="Data Pendidikan"
        rightIcon={
          <div className="flex flex-row justify-between items-center gap-4">
            <PlusCircleIcon
              className="w-8 h-8 cursor-pointer"
              onClick={() => {
                history.push("/create-pendidikan");
              }}
            />
            <ArrowLeftCircle
              className="w-8 h-8 cursor-pointer"
              onClick={() => history.goBack()}
            />
          </div>
        }
      />

      <IonContent fullscreen>
        <div className="px-6 mt-4 divide-y-2  ">
          <ul className="max-w-md divide-y-2 divide-black">
            {payload?.data.pendidikan_karyawans.map((pendidikan) => (
              <li className="py-3">
                <div className="flex flex-row justify-between items-center">
                  <p className="text-xs font-bold text-gray-900 flex gap-3 items-center ">
                    <CircleShadowButton
                      icon={<Trash2Icon className="w-6 h-6 p-1 text-red-700" />}
                    />
                    {pendidikan.nama_sekolah}
                  </p>

                  <p className="text-xs text-slate-500 ">23 Jan 2023</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DataPendidikan;
