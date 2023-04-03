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

const DataKeluarga: React.FC = () => {
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
        title="Data Keluarga"
        rightIcon={
          <div className="flex flex-row justify-between items-center gap-4">
            <PlusCircleIcon
              className="w-8 h-8 cursor-pointer"
              onClick={() => {
                history.push("/create-keluarga");
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
              {payload?.data?.keluarga_karyawans?.map((keluarga) => (
                <li className="py-3">
                  <div className="flex flex-row justify-between items-center">
                    <p className=" font-bold text-gray-900 flex gap-3 items-center ">
                      <CircleShadowButton
                        icon={
                          <Trash2Icon className="w-6 h-6 p-1 text-red-700" />
                        }
                      />    
                    </p>
                    <div className="w-full text-xs ml-3">
                      <Link to={`/data-keluarga/${keluarga.id}`}>
                        <p className="font-semibold capitalize">{keluarga.nama}</p>
                        <p className="capitalize">
                          {keluarga.status_keluarga}{" "}
                          {keluarga.status_keluarga === "anak"
                            ? `Ke-${keluarga.anak_ke}`
                            : ""}{" "}
                        </p>
                        </Link>
                      </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DataKeluarga;
