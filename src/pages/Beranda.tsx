import { IonContent, IonPage } from "@ionic/react";
import { Fingerprint } from "lucide-react";
import "../../src/index.css";

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="px-6 py-8 text-2xl font-bold">HRIS NOBEL</div>

        <div className="flex flex-col pt-6 px-6 items-center w-full gap-4">
          <div className="bg-slate-300 w-48 h-48 rounded-full border-4 border-slate-900">
            <img src="https://i.pravatar.cc/300" width="100%" height="100%" alt="Gambar Profil" className="rounded-full"></img>
          </div>
          {/* HEADER TEXT */}
          <div className="text-center">
            {/* <h4 className="text-sm text-slate-500 my-0">Welcome Back,</h4> */}
            <h1 className="text-xl mt-1 mb-0 font-bold"> Sofyan Ardiansyah</h1>
            <h4 className="text-sm text-slate-500 mt-1">23 Jan 2023, 12:00</h4>
          </div>
        </div>

        <button className="mx-auto mt-4 bg-red-700 rounded-full w-32 h-32 justify-center flex items-center
        px-5 py-2  border border-b-4 border-r-4 border-black  shadow-[5px_5px_0px_0px_#000] focus:shadow-[1px_2px_0px_0px_#000] focus:translate-y-4
        ">
          <Fingerprint className="w-24 h-24 text-white " />
        </button>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
