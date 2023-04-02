import { IonAlert, IonContent, IonPage } from "@ionic/react";
import { useState } from "react";
import { useHistory } from "react-router";
import KembaliHeader from "../../components/KembaliHeader";
import { useGet, usePost } from "../../hooks/useApi";
import { GetPayload } from "../../models/GenericPayload";
import { IzinEntity } from "../../models/Izin.entity";
import * as yup from "yup";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import LabelError from "../../components/LabelError";
import { CheckCircle2Icon } from "lucide-react";
import NotifAlert from "../../components/NotifAlert";

const schema = yup
  .object({
    izin_id: yup.string().required(),
    nama_file: yup.string().notRequired(),
    tanggal_mulai: yup.string().required(),
    tanggal_selesai: yup.string().required(),
    keterangan: yup.string().required(),
    telepon: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function CreateIzin() {
  const history = useHistory();
  const [user] = useLocalStorage("user");
  const [showAlert, setShowAlert] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const { data: payloadIzin } = useGet<GetPayload<IzinEntity>>({
    name: "izins",
    endpoint: "izins",
    limit: 0,
    filter: {
      jenis_izin: "cuti",
    },
  });

  const { mutate, isLoading: isCreateLoading } = usePost({
    name: "riwayat-izins",
    endpoint: "riwayat-izins",
    onSuccessCallback: () => {
        setShowAlert(true)
        history.push('/aktifitas')
        reset();
    }
  });

  const handleCreateIzin = (data: FormData) => {
    mutate({
      ...data,
      karyawan_id: user?.karyawan?.id,
    });
  };

  return (
    <>
      <IonPage>
        <KembaliHeader handleKembali={() => history.goBack()} />
        <IonContent fullscreen>
          <form
            onSubmit={handleSubmit(handleCreateIzin)}
            className="flex flex-col  justify-center items-center "
          >
            <div className="w-full px-12">
              <h3 className="text-xl font-semibold">Form Pengajuan Izin</h3>
              <div className="flex flex-col justify-center items-center my-8 ">
                <div className="form_group">
                  <label className="text-sm">Cuti</label>
                  <select
                    className="form_style w-full"
                    {...register("izin_id")}
                  >
                    {payloadIzin?.data.map((izin,index) => (
                      <option value={izin.id} key={index}>{izin.nama_izin}</option>
                    ))}
                  </select>
                  <LabelError errorMessage={errors.izin_id?.message} />
                </div>

                <div className="form_group">
                  <label className="text-sm">Tanggal Mulai</label>
                  <input
                    type="date"
                    className="form_style w-full"
                    {...register("tanggal_mulai")}
                  />
                  <LabelError errorMessage={errors.tanggal_mulai?.message} />
                </div>

                <div className="form_group">
                  <label className="text-sm">Tanggal Selesai</label>
                  <input
                    type="date"
                    className="form_style w-full"
                    {...register("tanggal_selesai")}
                  />
                  <LabelError errorMessage={errors.tanggal_selesai?.message} />
                </div>

                <div className="form_group">
                  <label className="text-sm">Telepon Yang Bisa Dihubungi</label>
                  <input
                    type="text"
                    className="form_style w-full"
                    {...register("telepon")}
                  />
                  <LabelError errorMessage={errors.telepon?.message} />
                </div>

                <div className="form_group">
                  <label className="text-sm">Keterangan</label>
                  <textarea
                    className="form_style w-full"
                    {...register("keterangan")}
                  />
                  <LabelError errorMessage={errors.keterangan?.message} />
                </div>
              </div>

              <button
                className="btn bg-red-600  w-full"
                type="submit"
                disabled={isCreateLoading}
              >
                {isCreateLoading ? "Loading..." : "Submit"}
              </button>
            </div>
          </form>
        </IonContent>
      </IonPage>

      <NotifAlert
        isOpen={showAlert}
        handleCancel={() => setShowAlert(false) }
        message="Berhasil Membuat Izin Baru"
        icon={undefined}
      />
    </>
  );
}
