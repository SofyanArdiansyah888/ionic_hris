import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  return (
    // <IonPage>
    <div className="container-auth">
      <h1 className="title">ITB Nobel</h1>
      <div className="form_area px-3">
        <h3 className="flex justify-start w-full ml-4 my-4 font-semibold text-2xl  ">
          Login
        </h3>
        <div className="form_group">
          <label>Username</label>
          <input className="form_style" />
        </div>

        <div className="form_group">
          <label>Password</label>
          <input className="form_style" type="password" />
        </div>

        <button
          className="btn bg-red-600 w-full"
          onClick={() => {
            setLoading(true);
            setTimeout(() => {
              setLoading(false);
              history.push("/beranda");
            }, 2000);
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "Submit"}
        </button>
      </div>
    </div>
    // </IonPage>
    // <div className="container">
    //   <h1 className="title">ITB Nobel</h1>

    //   <div className="form_area px-3">
    //     <h3 className="my-4 font-semibold text-2xl  ">Login</h3>
    //     <div className="form_group">
    //       <label>Username</label>
    //       <input className="form_style" />
    //     </div>

    //     <div className="form_group">
    //       <label>Password</label>
    //       <input className="form_style" type="password" />
    //     </div>

    //     <button
    //       className="btn bg-red-600 w-full"
    //       onClick={() => {
    //         setLoading(true);
    //         setTimeout(() => {
    //           setLoading(false);
    //           history.push('/tab1')

    //         }, 2000);
    //       }}
    //       disabled={loading}
    //     >
    //       {loading ? "Loading..." : "Submit"}
    //     </button>
    //   </div>
    // </div>
  );
}
