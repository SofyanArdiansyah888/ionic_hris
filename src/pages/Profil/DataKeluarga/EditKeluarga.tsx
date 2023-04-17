import { yupResolver } from "@hookform/resolvers/yup";
import { IonContent, IonPage } from "@ionic/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router";
import * as yup from "yup";
import KembaliHeader from "../../../components/KembaliHeader";
import LabelError from "../../../components/LabelError";
import Loading from "../../../components/Loading";
import { useGet, usePost, usePut } from "../../../hooks/useApi";
import { useLocalStorage } from "../../../hooks/useLocalStorage";
import { GetDetailPayload } from "../../../models/GenericPayload";
import { KeluargaKaryawanEntity } from "../../../models/KeluargaKaryawan.entity";
import NotifAlert from "../../../components/NotifAlert";

const schema = yup
  .object({
    nama: yup.string().required(),
    tempat_lahir: yup.string().required(),
    tanggal_lahir: yup.string().required(),
    status_keluarga: yup.string().required(),
    anak_ke: yup.string().notRequired(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const EditKeluarga: React.FC = () => {
  const [user] = useLocalStorage("user");
  const params: any = useParams();
  const [successAlert, setSuccessAlert] = useState(false);
  const [dangerAlert, setDangerAlert] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
    reset,
  } = useForm<FormData & { karyawan_id: string }>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { data, isFetching, refetch } = useGet<
    GetDetailPayload<KeluargaKaryawanEntity>
  >({
    name: "keluarga_karyawan",
    endpoint: `keluarga-karyawans/${params?.id}`,
  });

  useEffect(() => { refetch(); }, [params]);

  useEffect(() => {
    
    if (data?.data) {
      
      const { nama, anak_ke, status_keluarga, tempat_lahir, tanggal_lahir } =
        data.data;
      setValue("anak_ke", anak_ke?.toString());
      setValue("nama", nama);
      setValue("status_keluarga", status_keluarga?.toString());
      setValue("tempat_lahir", tempat_lahir?.toString());
      setValue("tanggal_lahir", tanggal_lahir?.toString());
    }

    return () => {
      reset();
    };
  }, [data]);

  const { mutate, isLoading: isCreateLoading } = usePut({
    name: "karyawan",
    endpoint: `keluarga-karyawans/${data?.data.id}`,
    onSuccessCallback: () => {
      setSuccessAlert(true);
      history.push("/data-keluarga");
      reset();
    },
    onErrorCallback: () => setDangerAlert(true),
  });

  const history = useHistory();

  const handleEditKeluarga = (data: FormData) => {
    mutate({
      ...data,
      karyawan_id: user?.karyawan.id,
    });
  };
  return (
    <>
      <IonPage>
        <KembaliHeader handleKembali={() => history.goBack()} />
        <IonContent fullscreen>
          {isFetching ? (
            <Loading />
          ) : (
            <div className="flex flex-col  justify-center items-center ">
              <form
                onSubmit={handleSubmit(handleEditKeluarga)}
                className="w-full px-12"
              >
                <h3 className="text-xl font-semibold">Form Edit Keluarga </h3>
                <div className="flex flex-col justify-center items-center my-8 ">
                  <div className="form_group">
                    <label className="text-sm">Nama</label>
                    <input
                      type="text"
                      className="form_style w-full"
                      {...register("nama")}
                    />
                    <LabelError errorMessage={errors.nama?.message} />
                  </div>

                  <div className="form_group">
                    <label className="text-sm">Tempat Lahir</label>
                    <input
                      type="text"
                      className="form_style w-full"
                      {...register("tempat_lahir")}
                    />
                    <LabelError errorMessage={errors.tempat_lahir?.message} />
                  </div>

                  <div className="form_group">
                    <label className="text-sm">Tanggal Lahir</label>
                    <input
                      type="date"
                      className="form_style w-full"
                      {...register("tanggal_lahir")}
                    />
                    <LabelError errorMessage={errors.tanggal_lahir?.message} />
                  </div>

                  <div className="form_group">
                    <label className="text-sm">Status Keluarga</label>
                    <select
                      className="form_style w-full"
                      {...register("status_keluarga")}
                    >
                      <option value="anak">Anak</option>
                      <option value="suami / istri">Suami / Istri</option>
                    </select>
                    <LabelError
                      errorMessage={errors.status_keluarga?.message}
                    />
                  </div>

                  <div className="form_group">
                    <label className="text-sm">Anak Ke</label>
                    <input
                      type="number"
                      className="form_style w-full"
                      {...register("anak_ke")}
                    />
                    <LabelError errorMessage={errors.anak_ke?.message} />
                  </div>
                </div>

                <button
                  className={`btn bg-red-600 border-red-600 w-full my-4 ${isCreateLoading ? 'animate-pulse' : ''}`}
                  type="submit"
                  disabled={isCreateLoading}
                >
                  {isCreateLoading ? "Loading..." : "Submit"}
                </button>
              </form>
            </div>
          )}
        </IonContent>
      </IonPage>
      <NotifAlert
        isOpen={successAlert}
        handleCancel={() => setSuccessAlert(false)}
        message="Berhasil Mengedit Data Keluarga"
        type="success"
      />
      <NotifAlert
        isOpen={dangerAlert}
        handleCancel={() => setDangerAlert(false)}
        message="Gagal Mengedit Data Keluarga"
        type="danger"
      />
    </>
  );
};

export default EditKeluarga;
