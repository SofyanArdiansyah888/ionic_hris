import { yupResolver } from "@hookform/resolvers/yup";
import { IonContent, IonPage } from "@ionic/react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import KembaliHeader from "../../components/KembaliHeader";
import * as yup from "yup";
import LabelError from "../../components/LabelError";
import { usePost, usePut } from "../../hooks/useApi";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useAuth } from "../../providers/AuthProvider";
import NotifAlert from "../../components/NotifAlert";
import { useState } from "react";

const schema = yup
  .object({
    password: yup.string().required(),
    confirm_password: yup
      .string()
      .oneOf([yup.ref("password"), ""], "Passwords must match"),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

const UbahPassword: React.FC = () => {
  const [user] = useLocalStorage("user");
  const [successAlert, setSuccessAlert] = useState(false);
  const [dangerAlert, setDangerAlert] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const auth = useAuth();
  const { mutate, isLoading } = usePut({
    name: "ubah_password",
    endpoint: `karyawans/${user?.karyawan?.id}/update-password`,
    onSuccessCallback: () => {
      setSuccessAlert(true);
      auth.logout();
    },
    onErrorCallback: () => setDangerAlert(true),
  });

  const history = useHistory();

  const handleChangePassword = (data: FormData) => {
    mutate({
      name: user.name,
      password: data.password,
    });
  };
  return (
    <>
      <IonPage>
        <KembaliHeader handleKembali={() => history.goBack()} />
        <IonContent fullscreen>
          <div className="flex flex-col  h-full justify-center items-center ">
            <form
              onSubmit={handleSubmit(handleChangePassword)}
              className="w-full px-12"
            >
              <h3 className="text-xl font-semibold">Form Ubah Password</h3>
              <div className="flex flex-col justify-center items-center my-8 ">
                <div className="form_group">
                  <label className="text-sm">Password</label>
                  <input
                    type="password"
                    className="form_style w-full"
                    {...register("password")}
                  />
                  <LabelError errorMessage={errors.password?.message} />
                </div>

                <div className="form_group">
                  <label className="text-sm">Ulangi Password</label>
                  <input
                    type="password"
                    className="form_style w-full"
                    {...register("confirm_password")}
                  />
                  <LabelError errorMessage={errors.confirm_password?.message} />
                </div>
              </div>

              <button
                className="btn bg-red-600 w-full my-4"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </IonContent>
      </IonPage>
      <NotifAlert
        isOpen={successAlert}
        handleCancel={() => setSuccessAlert(false)}
        message="Berhasil Edit Pendidikan"
        type="success"
      />
      <NotifAlert
        isOpen={dangerAlert}
        handleCancel={() => setDangerAlert(false)}
        message="Gagal Edit Pendidikan"
        type="danger"
      />
    </>
  );
};

export default UbahPassword;
