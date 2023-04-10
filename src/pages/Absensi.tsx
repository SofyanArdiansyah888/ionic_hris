import { IonContent, IonPage } from "@ionic/react";
import moment from "moment";
import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci/index";
import DateCallendar from "../components/DateCallendar";
import EmptyBox from "../components/EmptyBox";
import Loading from "../components/Loading";
import TitleHeader from "../components/TitleHeader";
import { useGet } from "../hooks/useApi";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { AbsenEntity } from "../models/Absen.entity";
import { GetPayload } from "../models/GenericPayload";
const Absensi: React.FC = () => {
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [date, setDate] = useState<string | string[] | null | undefined>("");
  const [user] = useLocalStorage("user");

  const {
    data: payload,
    isFetching,
    refetch,
  } = useGet<GetPayload<AbsenEntity>>({
    name: "absens",
    endpoint: `absens`,
    filter: {
      karyawan_id: user.karyawan.id,
      date,
    },
  });

  useEffect(() => {
    refetch();
  }, [date]);
  return (
    <IonPage>
      <TitleHeader
        title="Absensi"
        rightIcon={
          <CiFilter
            className="w-6 h-6 cursor-pointer"
            strokeWidth={1}
            onClick={() => setIsFilterModal(true)}
          />
        }
      />

      <IonContent fullscreen>
        {isFetching ? (
          <Loading />
        ) : (
          <>
            {payload?.data && payload.data.length > 0 ? (
              <div className="px-6 ">
                <ul className="max-w-md divide-y-2 divide-black">
                  {payload?.data.map((absen) => (
                    <li className="py-3">
                      <div className="flex flex-col gap-3">
                        <div className="flex-1 min-w-0">
                          <p className="text-md font-semibold text-gray-900 ">
                            {moment(absen.tanggal).format("DD MMMM Y")}
                          </p>
                          <div>
                            <div className="flex justify-between items-center">
                              <p className="text-sm text-gray-500 ">
                                In{" "}
                                {absen.waktu_masuk.substring(
                                  0,
                                  absen.waktu_masuk.length - 3
                                )}{" "}
                                - Out{" "}
                                {absen.waktu_keluar.substring(
                                  0,
                                  absen.waktu_keluar.length - 3
                                )}{" "}
                              </p>
                              <p className="text-xs text-gray-500 ">
                                Telat {absen.jumlah_telat} Menit
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <EmptyBox />
            )}
          </>
        )}
      </IonContent>
      <DateCallendar
        isOpen={isFilterModal}
        handleCancel={() => setIsFilterModal(false)}
        handleSubmit={(filterDate) => {
          setDate(moment(filterDate).format("MMMM Y"));
          setIsFilterModal(false);
        }}
        presentation={"month-year"}
      />
    </IonPage>
  );
};

export default Absensi;
