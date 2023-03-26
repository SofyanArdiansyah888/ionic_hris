import { IonContent, IonPage } from "@ionic/react";
import TitleHeader from "../components/TitleHeader";
import { CiFilter } from "react-icons/ci/index";
const Absensi: React.FC = () => {
  return (
    <IonPage>
      <TitleHeader
        title="Absensi"
        rightIcon={<CiFilter className="w-6 h-6" strokeWidth={1} />}
      />
      
      <IonContent fullscreen>
        <div className="px-6 ">
          <ul className="max-w-md divide-y-2 divide-black">
            {[1, 2, 3, 1, 1, 1, 1, 1, 1, 1].map(() => (
              <li className="py-3">
                <div className="flex flex-col gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-md font-bold text-gray-900 ">
                      22 February 2022
                    </p>
                    <div>
                      <div className="flex justify-between items-center">
                        <p className="text-sm text-gray-500 ">In 08:00 - Out 17:00 </p>
                        <p className="text-xs text-black font-black">Telat 0 Menit</p>
                      </div>

                      
                    </div>
                  </div>
                  {/* <div className="text-xs self-end font-bold">
                    Telat 0 Menit
                  </div> */}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </IonContent>
    
    </IonPage>
  );
};

export default Absensi;
