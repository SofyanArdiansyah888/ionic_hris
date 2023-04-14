import { yupResolver } from "@hookform/resolvers/yup";
import { IonContent, IonPage } from "@ionic/react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import KembaliHeader from "../../components/KembaliHeader";
import * as yup from "yup";
import LabelError from "../../components/LabelError";
import { useGet, usePost, usePut } from "../../hooks/useApi";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { GetDetailPayload } from "../../models/GenericPayload";
import { KaryawanEntity } from "../../models/Karyawan.entity";
import { useEffect, useState } from "react";
import { useQueryClient } from "react-query";
import NotifAlert from "../../components/NotifAlert";
import Loading from "../../components/Loading";

const schema = yup
  .object({
    nama_pemilik_rekening: yup.string().required(),
    nama_bank: yup.string().required(),
    nomor_rekening: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const DataRekening: React.FC = () => {
  const [user] = useLocalStorage("user");
  const [successAlert, setSuccessAlert] = useState(false);
  const [dangerAlert, setDangerAlert] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { data: karyawan, isLoading } = useGet<
    GetDetailPayload<KaryawanEntity>
  >({
    name: "karyawan",
    endpoint: `karyawans/${user?.karyawan.id}`,
  });

  const { mutate, isLoading: isUpdateLoading } = usePut({
    name: "karyawan",
    endpoint: `karyawans/${user?.karyawan?.id}/update-bank`,
    onSuccessCallback: () => {
      setSuccessAlert(true);
    },
    onErrorCallback: () => setDangerAlert(true),
  });

  useEffect(() => {
    if (karyawan) {
      setValue("nama_bank", karyawan.data.nama_bank);
      setValue("nomor_rekening", karyawan.data.nomor_rekening);
      setValue("nama_pemilik_rekening", karyawan.data.nama_pemilik_rekening);
    }
  }, [karyawan]);

  const history = useHistory();

  const handleUpdateRekening = (data: FormData) => {
    mutate(data);
  };
  return (
    <>
      <IonPage>
        <KembaliHeader handleKembali={() => history.goBack()} />
        <IonContent fullscreen>
          {isLoading ? (
            <Loading />
          ) : (
            <div className="flex flex-col  h-full justify-center items-center ">
              <form
                onSubmit={handleSubmit(handleUpdateRekening)}
                className="w-full px-12"
              >
                <h3 className="text-xl font-semibold">Form Data Rekening</h3>
                <div className="flex flex-col justify-center items-center my-8 ">
                  <div className="form_group">
                    <label className="text-sm">Nama Pemilik Rekening</label>
                    <input
                      type="text"
                      className="input input-bordered mt-2 rounded-full w-full"
                      {...register("nama_pemilik_rekening")}
                    />
                    <LabelError
                      errorMessage={errors.nama_pemilik_rekening?.message}
                    />
                  </div>

                  <div className="form_group">
                    <label className="text-sm">Nama Bank</label>
                    <input
                      type="text"
                      className="input input-bordered mt-2 rounded-full w-full"
                      {...register("nama_bank")}
                    />
                    <LabelError errorMessage={errors.nama_bank?.message} />
                  </div>

                  <div className="form_group">
                    <label className="text-sm">Nomor Rekening</label>
                    <input
                      type="text"
                      className="input input-bordered mt-2 rounded-full w-full"
                      {...register("nomor_rekening")}
                    />
                    <LabelError errorMessage={errors.nomor_rekening?.message} />
                  </div>
                </div>

                <button
                  className="btn bg-red-600 w-full my-4"
                  type="submit"
                  disabled={isUpdateLoading}
                >
                  {isUpdateLoading ? "Loading..." : "Submit"}
                </button>
              </form>
            </div>
          )}
        </IonContent>
      </IonPage>
      <NotifAlert
        isOpen={successAlert}
        handleCancel={() => setSuccessAlert(false)}
        message="Berhasil Mengedit Rekening"
        type="success"
      />
      <NotifAlert
        isOpen={dangerAlert}
        handleCancel={() => setDangerAlert(false)}
        message="Gagal Mengedit Rekening"
        type="danger"
      />
    </>
  );
};

export default DataRekening;
