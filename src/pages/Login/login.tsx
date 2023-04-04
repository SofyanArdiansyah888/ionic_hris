import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { usePost } from "../../hooks/useApi";
import { UserEntity } from "../../models/User.entity";
import { useAuth } from "../../providers/AuthProvider";

// import {BackgroundGeolocationPlugin} from "@capacitor-community/background-geolocation";
// import { registerPlugin } from "@capacitor/core";
// const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>("BackgroundGeolocation");
import { Geolocation } from "@capacitor/geolocation";
const schema = yup
  .object({
    name: yup.string().required(),
    password: yup.string().required(),
  })
  .required();
type FormData = yup.InferType<typeof schema>;

export default function Login() {
  const auth = useAuth();

  const history = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
    setError,
  } = useForm<FormData>({
    mode: "onChange",
    resolver: yupResolver(schema),
  });

  const { mutate, isLoading } = usePost<FormData>({
    endpoint: "login",
    name: "login",
    onSuccessCallback: (data: UserEntity) => {
      auth.login(data);
      // history.push("/beranda");
    },
    onErrorCallback: (error: any) => {
      if (error.response.status == 422) {
        setError("name", { message: error.response?.data.errors.name[0] });
      }
    },
  });

  const handleLogin = (data: FormData) => {
    mutate(data);
  };
  const [coor, setCoor] = useState<any>()
  
  // const printCurrentPosition = async () => {
    
  //   const coordinates = await Geolocation.watchPosition({
  //     enableHighAccuracy: true,
      
  //   },(data) => {
      
  //     if(data){
  //       alert(data?.coords)
  //       setCoor(data?.coords)
  //     }
  //   })
  // };



  

  return (
    <div className="container-auth">
      {/* <h2>{coor?.latitude} - {coor?.longitude}</h2> */}
      <h1 className="title">ITB Nobel</h1>
      <form onSubmit={handleSubmit(handleLogin)}>
        <div className="form_area px-3 w-[320px] gap-4">
          <h3 className="flex justify-start w-full ml-4 my-4 font-semibold text-2xl  ">
            Login
          </h3>
          <div className="form_group ">
            <label>Username</label>
            <input className="form_style w-full" {...register("name")} />
          </div>

          <div className="form_group">
            <label>Password</label>
            <input
              className="form_style w-full "
              type="password"
              {...register("password")}
            />
          </div>

          <button
            className="btn bg-red-600 w-full my-4"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}
