import { IonContent, IonPage } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import KembaliHeader from "../../components/KembaliHeader";

export default function UbahPassword() {
  const [loading, setLoading] = useState<boolean>(false);
  const history = useHistory();
  return (
    <IonPage>
      <KembaliHeader handleKembali={() => history.goBack()} />

      <IonContent fullscreen>
        <div className="px-8 ">
          <div className="flex flex-row items-center w-full  my-12">
            <div className="form_area px-3">
              <h3 className="flex justify-start w-full ml-4 my-4 font-semibold text-lg  ">
                Form Ubah Password
              </h3>

              <div className="form_group">
                <label>Password</label>
                <input type="password" className="form_style" />
              </div>

              <div className="form_group">
                <label>Ulangi Password</label>
                <input className="form_style" type="password" />
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
