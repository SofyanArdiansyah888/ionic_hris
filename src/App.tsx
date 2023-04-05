import {
  IonApp,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import {
  Redirect,
  Route,
  RouteComponentProps,
  useLocation,
} from "react-router-dom";
import Aktifitas from "./pages/Aktifitas/Aktifitas";
import Beranda from "./pages/Beranda";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
// import "@ionic/react/css/normalize.css";
// import "@ionic/react/css/structure.css";
// import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
// import "@ionic/react/css/display.css";
// import "@ionic/react/css/flex-utils.css";
// import "@ionic/react/css/float-elements.css";
// import "@ionic/react/css/padding.css";
// import "@ionic/react/css/text-alignment.css";
// import "@ionic/react/css/text-transformation.css";

/* Theme variables */

import {
  BanknoteIcon,
  ContactIcon,
  FileClockIcon,
  HistoryIcon,
  HomeIcon,
} from "lucide-react";
import { useEffect, useLayoutEffect } from "react";
import Absensi from "./pages/Absensi";
import CreateCuti from "./pages/Aktifitas/CreateCuti";
import Gaji from "./pages/Gaji/Gaji";
import Login from "./pages/Login/login";
import Profil from "./pages/Profil/Profil";
import DataDokumen from "./pages/Profil/DataDokumen/DataDokumen";
import DataKeluarga from "./pages/Profil/DataKeluarga/DataKeluarga";
import DataPelatihan from "./pages/Profil/DataPelatihan/DataPelatihan";
import DataPendidikan from "./pages/Profil/DataPendidikan/DataPendidikan";
import DataRekening from "./pages/Profil/DataRekening";
import InformasiDasar from "./pages/Profil/InformasiDasar/InformasiDasar";
import UbahPassword from "./pages/Profil/UbahPassword";
import { ProtectedRoute } from "./route/ProtectedRoute";
import { AuthProvider, useAuth } from "./providers/AuthProvider";
import { QueryClient, QueryClientProvider } from "react-query";
import CreatePendidikan from "./pages/Profil/DataPendidikan/CreatePendidikan";
import CreatePelatihan from "./pages/Profil/DataPelatihan/CreatePelatihan";
import CreateKeluarga from "./pages/Profil/DataKeluarga/CreateKeluarga";
import CreateIzin from "./pages/Aktifitas/CreateIzin";
import EditPendidikan from "./pages/Profil/DataPendidikan/EditPendidikan";
import EditKeluarga from "./pages/Profil/DataKeluarga/EditKeluarga";
import EditPelatihan from "./pages/Profil/DataPelatihan/EditPelatihan";
import { Geolocation } from "@capacitor/geolocation";
import { BackgroundGeolocationPlugin } from "@capacitor-community/background-geolocation";
import { registerPlugin } from "@capacitor/core";
import { LocalNotifications } from "@capacitor/local-notifications";
import DetailAktivitas from "./pages/Aktifitas/DetailAktivitas";
import "moment/locale/id";
import DetailGaji from "./pages/Gaji/DetailGaji";
import { distanceInMeters } from "./utils/distanceCalculator";
import { useStore } from "zustand";
import { useDistanceStore } from "./store/DistanceStore";
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>(
  "BackgroundGeolocation"
);
setupIonicReact();

const PagesWithoutNavBar = [
  "/login",
  "/ubah-password",
  "/informasi-dasar",
  "/data-keluarga",
  "/data-pendidikan",
  "/data-pelatihan",
  "/data-dokumen",
  "/data-rekening",
  "/create-aktivitas",
  "/edit-aktivitas",
  "/create-pendidikan",
  "/edit-pendidikan",
  "/create-pelatihan",
  "/edit-pelatihan",
];
const MainTabs: React.FC = () => {
  const location = useLocation();
  const auth = useAuth();
  const pathname = location.pathname;

  useLayoutEffect(() => {
    const e = document.querySelector("ion-tab-bar");
    if (!e) return;
    const hideNavBar = PagesWithoutNavBar.includes(pathname);
    e.style.display = hideNavBar ? "none" : "flex";
  }, [pathname]);

  const styles = {
    tabBar: `py-2 border-t-4 border-black`,
    tabButton: ``, //`font-black text-black focus:text-red-700`,
    tabLabel: `font-semibold text-xs mt-1`,
  };

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/" render={() => <Redirect to="/beranda" />} />
        <Route
          exact
          path="/login"
          render={() => (auth.user ? <Redirect to="/" /> : <Login />)}
        />

        <Route
          path="/beranda"
          render={() => (
            <ProtectedRoute>
              <Beranda />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/aktifitas"
          render={() => (
            <ProtectedRoute>
              <Aktifitas />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/aktifitas/:id"
          render={() => (
            <ProtectedRoute>
              <DetailAktivitas />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/absensi"
          render={() => (
            <ProtectedRoute>
              <Absensi />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/profil"
          render={() => (
            <ProtectedRoute>
              <Profil />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/ubah-password"
          render={() => (
            <ProtectedRoute>
              <UbahPassword />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/data-pelatihan"
          render={() => (
            <ProtectedRoute>
              <DataPelatihan />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/data-pelatihan/:id"
          render={() => (
            <ProtectedRoute>
              <EditPelatihan />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/create-pelatihan"
          render={() => (
            <ProtectedRoute>
              <CreatePelatihan />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/informasi-dasar"
          render={() => (
            <ProtectedRoute>
              <InformasiDasar />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/data-keluarga"
          render={() => (
            <ProtectedRoute>
              <DataKeluarga />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/data-keluarga/:id"
          render={() => (
            <ProtectedRoute>
              <EditKeluarga />
            </ProtectedRoute>
          )}
        />
        <Route
          exact
          path="/create-keluarga"
          render={() => (
            <ProtectedRoute>
              <CreateKeluarga />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/data-dokumen"
          render={() => (
            <ProtectedRoute>
              <DataDokumen />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/data-pendidikan"
          render={() => (
            <ProtectedRoute>
              <DataPendidikan />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/data-pendidikan/:id"
          render={() => (
            <ProtectedRoute>
              <EditPendidikan />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/create-pendidikan"
          render={() => (
            <ProtectedRoute>
              <CreatePendidikan />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/data-rekening"
          render={() => (
            <ProtectedRoute>
              <DataRekening />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/gaji"
          render={() => (
            <ProtectedRoute>
              <Gaji />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/gaji/:id"
          render={() => (
            <ProtectedRoute>
              <DetailGaji />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/create-cuti"
          render={() => (
            <ProtectedRoute>
              <CreateCuti />
            </ProtectedRoute>
          )}
        />

        <Route
          exact
          path="/create-izin"
          render={() => (
            <ProtectedRoute>
              <CreateIzin />
            </ProtectedRoute>
          )}
        />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" className={styles.tabBar}>
        <IonTabButton
          tab="beranda"
          href="/beranda"
          className={styles.tabButton}
        >
          <HomeIcon strokeWidth={2} />
          <IonLabel className={styles.tabLabel}>Beranda</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="aktifitas"
          href="/aktifitas"
          className={styles.tabButton}
        >
          <FileClockIcon strokeWidth={2} />
          <IonLabel className={styles.tabLabel}>Aktifitas</IonLabel>
        </IonTabButton>

        <IonTabButton tab="gaji" href="/gaji" className={styles.tabButton}>
          <BanknoteIcon strokeWidth={2} />
          <IonLabel className={styles.tabLabel}>Gaji</IonLabel>
        </IonTabButton>

        <IonTabButton
          tab="absensi"
          href="/absensi"
          className={styles.tabButton}
        >
          <HistoryIcon strokeWidth={2} />
          <IonLabel className={styles.tabLabel}>Absensi</IonLabel>
        </IonTabButton>

        <IonTabButton tab="profil" href="/profil" className={styles.tabButton}>
          <ContactIcon strokeWidth={2} />
          <IonLabel className={styles.tabLabel}>Profil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => {
  const {distance, setDistance} = useDistanceStore();

  const nobelLatlng = {
    latitude: -5.1789101,
    longitude: 119.4390137
  };
  
  useEffect(() => {
    printCurrentPosition();
  },[])

  const printCurrentPosition = async () => {
    await Geolocation.watchPosition({
      enableHighAccuracy: true,
    },(data) => {
      if(data){
        const {latitude,longitude} = data.coords  
        const distance = distanceInMeters(nobelLatlng.latitude,nobelLatlng.longitude,latitude,longitude);
        setDistance(distance)
      }
      // setTimeout(() => {
      //   if(data){
      //     const {latitude,longitude} = data.coords  
      //     const distance = distanceInMeters(nobelLatlng.latitude,nobelLatlng.longitude,latitude,longitude);
      //     setDistance(distance)
      //   }
      // },1000)
    })
  };
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <IonApp>
          <IonReactRouter>
            <MainTabs />
          </IonReactRouter>
        </IonApp>
      </QueryClientProvider>
    </AuthProvider>
  );
};
// useEffect(() => {
//   console.info("application is running");

//   BackgroundGeolocation.addWatcher(
//     {
//       requestPermissions: true,
//       stale: false,
//       distanceFilter: 1,
//       backgroundTitle: "Tracking You.",
//       backgroundMessage: "Cancel to prevent battery drain.",
//     },
//     function (location, error) {
//       if (error) alert(error);
//       if (location) {
//         alert(JSON.stringify(location));
//         LocalNotifications.schedule({
//           notifications: [
//             {
//               title: "Position Change",
//               body: `Latitude : ${location.latitude} Longitude : ${location.longitude}`,
//               id: 1,
//             },
//           ],
//         });
//       }
//       // last_location = location || undefined;
//     }
//   ).then(function (id) {
//     console.info(id, "id of watcher");
//     setTimeout(function () {
//       BackgroundGeolocation.removeWatcher({ id });
//     }, 1000);
//   });
// }, []);


export default App;
