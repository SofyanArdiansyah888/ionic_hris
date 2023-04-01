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
    nama: yup.string().required(),
    tempat_lahir: yup.string().required(),
    tanggal_lahir: yup.string().required(),
    status_keluarga: yup.string().required(),
    anak_ke: yup.string().notRequired(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const CreateKeluarga: React.FC = () => {
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
    name: "keluarga-karyawans",
    endpoint: `keluarga-karyawans`,
    onSuccessCallback: () => {},
  });

  const history = useHistory();

  const handleCreateKeluarga = (data: FormData) => {
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
          <div className="flex flex-col  justify-center items-center ">
            <form
              onSubmit={handleSubmit(handleCreateKeluarga)}
              className="w-full px-12"
            >
              <h3 className="text-xl font-semibold">Form Tambah Keluarga </h3>
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
                  <LabelError errorMessage={errors.status_keluarga?.message} />
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

export default CreateKeluarga;
