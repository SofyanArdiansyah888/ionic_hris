import { IonContent, IonPage } from "@ionic/react";
import { ArrowLeftCircleIcon } from "lucide-react";
import { useState } from "react";
import { useHistory } from "react-router";
import KembaliHeader from "../../components/KembaliHeader";
import TitleHeader from "../../components/TitleHeader";

export default function CreateAktivitas() {
  const history = useHistory();
  const [date, setDate] = useState<string | string[] | null | undefined>();

  return (
    <>
      <IonPage>
        <KembaliHeader
          
          handleKembali={() => history.goBack()}
        />
        <IonContent fullscreen>
          <div className="flex flex-col  h-full justify-center items-center ">
            <div className="w-full px-12">
                <h3 className="text-xl font-semibold">Form Pengajuan Izin / Cuti</h3>
              <div className="flex flex-col justify-center items-center my-8 ">
                <div className="form_group">
                  <label className="text-sm">Jenis Cuti</label>
                  <select className="form_style w-full">
                    <option>Cuti</option>
                    <option>Izin</option>
                  </select>
                </div>
                <div className="form_group">
                  <label className="text-sm">Nama Pemilik Rekening</label>
                  <input type="text" className="form_style w-full" />
                </div>

                <div className="form_group">
                  <label className="text-sm">Tanggal Mulai</label>
                  <input type="text" className="form_style w-full" />
                </div>

                <div className="form_group">
                  <label className="text-sm">Tanggal Selesai</label>
                  <input type="text" className="form_style w-full" />
                </div>

                <div className="form_group">
                  <label className="text-sm">Keterangan</label>
                  <textarea className="form_style w-full" />
                </div>
              </div>

              <button className="btn bg-red-600  w-full" onClick={() => {}}>
                Submit
              </button>
            </div>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
}
