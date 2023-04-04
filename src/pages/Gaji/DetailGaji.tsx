import { useEffect, useState } from "react";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useGet, usePost, usePut } from "../../hooks/useApi";
import { IzinEntity } from "../../models/Izin.entity";
import { GetDetailPayload } from "../../models/GenericPayload";
import { IzinKaryawanEntity } from "../../models/IzinKaryawan.entity";
import { useHistory, useParams } from "react-router";
import { IonPage, IonContent } from "@ionic/react";
import KembaliHeader from "../../components/KembaliHeader";
import LabelError from "../../components/LabelError";
import Loading from "../../components/Loading";
import { register } from "../../serviceWorkerRegistration";
import { RiwayatIzinEntity } from "../../models/RiwayatIzin.entity";
import moment from "moment";
import NotifAlert from "../../components/NotifAlert";
import { RiwayatPenggajianEntity } from "../../models/RiwayatPenggajian.entity";
import { formatRupiah } from "../../utils/formatter";

const DetailGaji: React.FC = () => {
  const [user] = useLocalStorage("user");
  const params: any = useParams();
  const history = useHistory();
  const [successAlert, setSuccessAlert] = useState(false);
  const [dangerAlert, setDangerAlert] = useState(false);

  const { data, isFetching, refetch } = useGet<
    GetDetailPayload<RiwayatPenggajianEntity>
  >({
    name: "riwayat-penggajian",
    endpoint: `riwayat-penggajians/${params?.id}`,
  });

  useEffect(() => {
    refetch();
  }, [params]);

  const kegiatans = [
    { judul: "Periode", deskripti: (moment(data?.data?.periode).format('MMMM Y')) },
    { judul: "Gaji Pokok", deskripti: formatRupiah(data?.data?.gaji_pokok) },
    {
      judul: "Total Tunjangan",
      deskripti: formatRupiah(data?.data.total_tunjangan),
    },
    {
      judul: "Total Potongan",
      deskripti: formatRupiah(data?.data.total_potongan),
    },

    {
      judul: "Detail Tunjangan",
      deskripti: "",
      details: data?.data.detail_tunjangan,
    },
    {
      judul: "Detail Potongan",
      deskripti: "",
      details: data?.data.detail_potongan,
    },
    {
      judul: "Gaji Yang Diterima",
      deskripti: formatRupiah(data?.data.total_gaji),
    },
  ];

  return (
    <IonPage>
      <KembaliHeader handleKembali={() => history.push("/gaji")} />
      <IonContent fullscreen>
        {isFetching ? (
          <Loading />
        ) : (
          <div className="  px-4 py-6   ">
            <h2 className="font-semibold  text-xl">Detail Gaji</h2>
            <div className="flex  flex-col w-full divide-y-2 gap-3 my-8 ">
              {kegiatans.map((kegiatan) => (
                <div>
                  <p className="text-sm font-semibold">{kegiatan.judul}</p>
                  <p className="text-xs">{kegiatan.deskripti}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </IonContent>
      <NotifAlert
        isOpen={successAlert}
        handleCancel={() => setSuccessAlert(false)}
        message="Berhasil Menyetujui Izin/Cuti"
        type="success"
      />
      <NotifAlert
        isOpen={dangerAlert}
        handleCancel={() => setDangerAlert(false)}
        message="Gagal Menyetujui Izin/Cuti"
        type="danger"
      />
    </IonPage>
  );
};

export default DetailGaji;
