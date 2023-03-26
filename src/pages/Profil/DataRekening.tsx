import { IonContent, IonPage } from "@ionic/react";
import { PlusCircleIcon } from "lucide-react";
import { useState } from "react";
import { useHistory } from "react-router";
import KembaliHeader from "../../components/KembaliHeader";

export default function DataRekening() {
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  return (
    <IonPage>
      <KembaliHeader
        handleKembali={() => history.goBack()}
      />

      <IonContent fullscreen>
        <div className="px-8 ">
          <div className="flex flex-row items-center w-full  my-12">
            <div className="form_area px-3">
              <h3 className="flex justify-start w-full ml-4 my-4 font-semibold text-lg  ">
                Form Ubah Rekening
              </h3>

              <div className="form_group">
                <label>Nama Pemilik Rekening</label>
                <input type="text" className="form_style" />
              </div>

              <div className="form_group">
                <label>Nama Bank</label>
                <input type="text" className="form_style" />
              </div>

              <div className="form_group">
                <label>Nomor Rekening</label>
                <input type="text" className="form_style" />
              </div>

              <button
                className="btn bg-red-700 w-full"
                onClick={() => {
                  setLoading(true);
                  setTimeout(() => {
                    setLoading(false);
                    // history.push("/tab1");
                  }, 2000);
                }}
                disabled={loading}
              >
                {loading ? "Loading..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
}
