import { IonContent, IonPage } from "@ionic/react";
import { ArrowLeftCircle, PlusCircleIcon, Trash2Icon } from "lucide-react";
import moment from "moment";
import { useHistory } from "react-router";
import CircleShadowButton from "../../../components/CircleShadowButton";
import EmptyBox from "../../../components/EmptyBox";
import Loading from "../../../components/Loading";
import TitleHeader from "../../../components/TitleHeader";
import { useGet } from "../../../hooks/useApi";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { GetDetailPayload } from "../../../models/GenericPayload";
import { KaryawanEntity } from "../../../models/Karyawan.entity";

const DataDokumen: React.FC = () => {
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
        title="Data Dokumen"
        rightIcon={
          <div className="flex flex-row justify-between items-center gap-4">
            <PlusCircleIcon
              className="w-8 h-8 cursor-pointer"
              onClick={() => history.push("/create-dokumen")}
            />
            <ArrowLeftCircle
              className="w-8 h-8 cursor-pointer"
              onClick={() => history.goBack()}
            />
          </div>
        }
      />

      <IonContent fullscreen>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {payload?.data && payload?.data.dokumen_karyawans.length > 0 ? (
              <div className="px-6 mt-4 divide-y-2  ">
                <ul className="max-w-md divide-y-2 divide-black">
                  {payload?.data.dokumen_karyawans.map((dokumen) => (
                    <li className="py-3">
                      <div className="flex flex-row justify-between items-center ">
                        <div className="text-xs font-bold text-gray-900 flex gap-3 items-center w-full">
                          <CircleShadowButton
                            icon={
                              <Trash2Icon className="w-6 h-6 p-1 text-red-700" />
                            }
                          />
                          <div className="w-full cursor-pointer">
                            <p>{dokumen.nama_dokumen}</p>
                            <p className="text-xs text-gray-500 lowercase">
                              {dokumen.link_file}
                            </p>
                          </div>
                        </div>

                        <p className="text-xs text-slate-500 ">
                          {moment(dokumen.created_at).format("D MMM Y, H:mm:s")}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <EmptyBox />
            )}
          </>
        )}
      </IonContent>
    </IonPage>
  );
};

export default DataDokumen;
