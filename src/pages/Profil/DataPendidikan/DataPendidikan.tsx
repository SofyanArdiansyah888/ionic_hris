import { IonContent, IonPage } from "@ionic/react";
import { ArrowLeftCircle, PlusCircleIcon, Trash2Icon } from "lucide-react";
import { useHistory } from "react-router";
import CircleShadowButton from "../../../components/CircleShadowButton";
import TitleHeader from "../../../components/TitleHeader";

const DataPendidikan: React.FC = () => {
  const history = useHistory();
  return (
    <IonPage>
      <TitleHeader
        title="Data Pendidikan"
        rightIcon={
          <div className="flex flex-row justify-between items-center gap-4">
            <PlusCircleIcon className="w-8 h-8" />
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
            {[1, 2, 3, 1, 1, 1, 1, 1, 1, 1].map(() => (
              <li className="py-3">
                <div className="flex flex-row justify-between items-center">
                  <p className="text-xs font-bold text-gray-900 flex gap-3 items-center ">
                    <CircleShadowButton
                      icon={<Trash2Icon className="w-6 h-6 p-1 text-red-700" />}
                    />
                    File Karyawan.xlsx
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
