import { yupResolver } from "@hookform/resolvers/yup";
import { IonContent, IonPage } from "@ionic/react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import * as yup from "yup";
import KembaliHeader from "../../../components/KembaliHeader";
import LabelError from "../../../components/LabelError";
import { usePost } from "../../../hooks/useApi";
import { useLocalStorage } from "../../../hooks/useLocalStorage";

const schema = yup
  .object({
    nama_kegiatan: yup.string().required(),
    tahun: yup.string().required(),
    valid: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const CreatePelatihan: React.FC = () => {
  const [user] = useLocalStorage("user");

  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
    setValue,
  } = useForm<FormData & { karyawan_id: string }>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading: isCreateLoading } = usePost({
    name: "riwayat-training-karyawans",
    endpoint: `riwayat-training-karyawans`,
    onSuccessCallback: () => {},
  });

  const history = useHistory();

  const handleCreatePelatihan = (data: FormData) => {
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
          <div className="flex flex-col  h-full justify-center items-center ">
            <form
              onSubmit={handleSubmit(handleCreatePelatihan)}
              className="w-full px-12"
            >
              <h3 className="text-xl font-semibold">Form Tambah Pelatihan </h3>
              <div className="flex flex-col justify-center items-center my-8 ">
                <div className="form_group">
                  <label className="text-sm">Nama Kegiatan</label>
                  <input
                    type="text"
                    className="form_style w-full"
                    {...register("nama_kegiatan")}
                  />
                  <LabelError errorMessage={errors.nama_kegiatan?.message} />
                </div>

                <div className="form_group">
                  <label className="text-sm">Tahun</label>
                  <input
                    type="text"
                    className="form_style w-full"
                    {...register("tahun")}
                  />
                  <LabelError errorMessage={errors.tahun?.message} />
                </div>

                <div className="form_group">
                  <label className="text-sm">Valid</label>
                  <input
                    type="date"
                    className="form_style w-full"
                    {...register("valid")}
                  />
                  <LabelError errorMessage={errors.valid?.message} />
                </div>
              </div>

              <button
                className="btn bg-red-600 w-full my-4"
                type="submit"
                disabled={isCreateLoading}
              >
                {isCreateLoading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </IonContent>
      </IonPage>
    </>
  );
};

export default CreatePelatihan;
