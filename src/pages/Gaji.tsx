import { IonContent, IonPage } from "@ionic/react";
import { PlusCircleIcon } from "lucide-react";
import { CiFilter } from "react-icons/ci";
import EmptyBox from "../components/EmptyBox";
import TitleHeader from "../components/TitleHeader";

const Gaji: React.FC = () => {
  const data = [];
  return (
    <IonPage>
      <TitleHeader
        title="Gaji"
        rightIcon={
          <div className="flex flex-row gap-4">
            <CiFilter className="w-6 h-6" strokeWidth={1} />
            <PlusCircleIcon className="w-6 h-6" />
          </div>
        }
      />
      <IonContent fullscreen>
        {data.length === 0 ? (
          <EmptyBox />
        ) : (
          <div className="px-6 ">
            <ul className="max-w-md divide-y-2 divide-black">
              {[1, 2, 3, 1, 1, 1, 1, 1, 1, 1].map(() => (
                <li className="py-3">
                  <div className="flex flex-col gap-3">
                    <div className="flex-1 min-w-0 ">
                      <p className="text-md font-bold text-gray-900 ">
                        Nama Karyawan
                      </p>
                      <p className="text-sm text-gray-500 ">
                        Lorem ipsum sit dolor amet, lorem ipsum sit dolor amet
                      </p>
                    </div>
                    <div className="text-xs self-end font-bold">
                      22 Feb 2022 - 23 Feb 2022
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

export default Gaji;
