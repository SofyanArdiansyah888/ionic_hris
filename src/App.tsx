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
import { useLayoutEffect } from "react";
import Absensi from "./pages/Absensi";
import CreateAktivitas from "./pages/Aktifitas/CreateAktivitas";
import Gaji from "./pages/Gaji";
import Login from "./pages/Login/login";
import Profil from "./pages/Profil";
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
          path="/create-aktivitas"
          render={() => (
            <ProtectedRoute>
              <CreateAktivitas />
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

export default App;
