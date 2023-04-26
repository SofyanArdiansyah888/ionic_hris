import { IonContent, IonPage } from "@ionic/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import KembaliHeader from "../../components/KembaliHeader";
import Loading from "../../components/Loading";
import NotifAlert from "../../components/NotifAlert";
import { useGet, usePost } from "../../hooks/useApi";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { GetDetailPayload } from "../../models/GenericPayload";
import { RiwayatIzinEntity } from "../../models/RiwayatIzin.entity";

const DetailAktivitas: React.FC = () => {
  const [user] = useLocalStorage("user");
  const params: any = useParams();
  const history = useHistory();
  const [successAlert, setSuccessAlert] = useState(false);
  const [dangerAlert, setDangerAlert] = useState(false);

  const { data, isFetching, refetch } = useGet<
    GetDetailPayload<RiwayatIzinEntity>
  >({
    name: "riwayat-izin",
    endpoint: `riwayat-izins/${params?.id}`,
  });

  const { mutate, isLoading: isApproveLoading } = usePost({
    name: "riwayat-izin,riwayat-izins",
    endpoint: `riwayat-izins/update-status`,
    onSuccessCallback: () => {
      setSuccessAlert(true);
    },
    onErrorCallback: () => setDangerAlert(true),
  });

  useEffect(() => {
    refetch();
  }, [params]);

  const kegiatans = [
    { judul: "Nama Karyawan", deskripti: data?.data?.karyawan?.nama_lengkap },
    { judul: "Jenis Izin", deskripti: data?.data?.izin?.jenis_izin },
    { judul: "Izin", deskripti: data?.data?.izin?.nama_izin },
    { judul: "Jumlah Hari", deskripti: `${data?.data.jumlah_hari} Hari` },
    {
      judul: "Tanggal Mulai",
      deskripti: moment(data?.data.tanggal_mulai).format("DD MMM YYYY"),
    },
    {
      judul: "Tanggal Selesai",
      deskripti: moment(data?.data.tanggal_mulai).format("DD MMM YYYY"),
    },
    { judul: "Status Pengajuan", deskripti: data?.data.status },
    { judul: "Keterangan", deskripti: data?.data.keterangan },
  ];

  const handleApprove = () => {
    mutate({
      id: params?.id,
      status: "disetujui atasan",
    });
  };

  return (
    <IonPage>
      <KembaliHeader handleKembali={() => history.push("/aktifitas")} />
      <IonContent fullscreen>
        {isFetching ? (
          <Loading />
        ) : (
          <div className="  px-4 py-6   ">
            <h2 className="font-semibold  text-xl">Detail Aktifitas</h2>
            <div className="flex  flex-col w-full  gap-3 my-8 ">
              {kegiatans.map((kegiatan) => (
                <div>
                  <p className="text-sm font-semibold">{kegiatan.judul}</p>
                  <p className="text-xs">{kegiatan.deskripti}</p>
                </div>
              ))}
            </div>
        
            {data?.data.status === "pengajuan" &&
              data.data.karyawan.atasan_id === user?.karyawan?.id && (
                <button
                  className="btn static bg-red-700 border-red-700 justify-end"
                  disabled={isApproveLoading}
                  onClick={handleApprove}
                >
                  {isApproveLoading ? "Loading..." : "Approve"}
                </button>
               )}
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

export default DetailAktivitas;
