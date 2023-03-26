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
import { Redirect, Route, useLocation } from "react-router-dom";
import Aktifitas from "./pages/Aktifitas";
import Beranda from "./pages/Beranda";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";

/* Theme variables */

import {
  BanknoteIcon,
  ContactIcon,
  FileClockIcon,
  HistoryIcon,
  HomeIcon,
} from "lucide-react";
import Absensi from "./pages/Absensi";
import Gaji from "./pages/Gaji";
import Profil from "./pages/Profil";
import DataDokumen from "./pages/Profil/DataDokumen/DataDokumen";
import DataKeluarga from "./pages/Profil/DataKeluarga/DataKeluarga";
import DataPelatihan from "./pages/Profil/DataPelatihan/DataPelatihan";
import DataPendidikan from "./pages/Profil/DataPendidikan/DataPendidikan";
import DataRekening from "./pages/Profil/DataRekening";
import InformasiDasar from "./pages/Profil/InformasiDasar/InformasiDasar";
import UbahPassword from "./pages/Profil/UbahPassword";
import Login from "./pages/Login/login";
import { useLayoutEffect } from "react";
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
];
const MainTabs: React.FC = () => {
  const location = useLocation();
  const pathname = location.pathname;

  useLayoutEffect(() => {
    const e = document.querySelector("ion-tab-bar");
    if (!e) return;
    const hideNavBar = PagesWithoutNavBar.includes(pathname);
    e.style.display = hideNavBar ? "none" : "flex";
  }, [pathname]);
  const styles = {
    tabBar: `py-2 border-t-4 border-black`,
    tabButton: ``,//`font-black text-black focus:text-red-700`,
    tabLabel: `font-semibold text-xs mt-1`,
  };
  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/" render={() => <Redirect to="/login" />} />
        <Route exact path="/login" render={() => <Login />} />
        <Route exact path="/beranda" render={() => <Beranda />} />
        <Route exact path="/aktifitas" render={() => <Aktifitas />} />
        <Route exact path="/absensi" render={() => <Absensi />} />
        <Route exact path="/profil" render={() => <Profil />} />
        <Route exact path="/ubah-password" render={() => <UbahPassword />} />
        <Route exact path="/data-pelatihan" render={() => <DataPelatihan />} />
        <Route
          exact
          path="/informasi-dasar"
          render={() => <InformasiDasar />}
        />
        <Route exact path="/data-keluarga" render={() => <DataKeluarga />} />
        <Route exact path="/data-dokumen" render={() => <DataDokumen />} />
        <Route
          exact
          path="/data-pendidikan"
          render={() => <DataPendidikan />}
        />
        <Route exact path="/data-rekening" render={() => <DataRekening />} />
        <Route exact path="/gaji" render={() => <Gaji />} />
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

const App: React.FC = () => {
  return (
    <IonApp>
      <IonReactRouter>
        <MainTabs />
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
