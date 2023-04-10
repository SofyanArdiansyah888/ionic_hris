import { IonContent, IonPage } from "@ionic/react";
import { PlusCircleIcon } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { useHistory } from "react-router";
import DateCallendar from "../../components/DateCallendar";
import EmptyBox from "../../components/EmptyBox";
import Loading from "../../components/Loading";
import TitleHeader from "../../components/TitleHeader";
import { useGet } from "../../hooks/useApi";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { GetPayload } from "../../models/GenericPayload";
import { RiwayatPenggajianEntity } from "../../models/RiwayatPenggajian.entity";
import { formatRupiah } from "../../utils/formatter";
import { Link } from "react-router-dom";

const Gaji: React.FC = () => {
  const [isFilterModal, setIsFilterModal] = useState(false);

  const [date, setDate] = useState<string | string[] | null | undefined>(
    moment().format("MMMM Y")
  );

  const [user] = useLocalStorage("user");
  const history = useHistory();

  const {
    data: payload,
    isFetching,
    refetch,
  } = useGet<GetPayload<RiwayatPenggajianEntity>>({
    name: "riwayat-penggajians",
    endpoint: `riwayat-penggajians`,
    filter: {
      date,
      karyawan_id: user?.karyawan?.id,
    },
  });

  useEffect(() => {
    refetch();
  }, [date]);
  return (
    <>
      <IonPage>
        <TitleHeader
          title="Gaji"
          rightIcon={
            <div className="flex flex-row gap-4">
              <CiFilter
                className="w-6 h-6 cursor-pointer"
                strokeWidth={1}
                onClick={() => setIsFilterModal(true)}
              />
            </div>
          }
        />
        <IonContent fullscreen>
          {isFetching ? (
            <Loading />
          ) : (
            <>
              {payload?.data && payload.data.length > 0 ? (
                <div className="px-6 ">
                  <div className="max-w-md  divide-zinc-300">
                    {payload?.data.map((riwayat) => (
                      <Link to={`/gaji/${riwayat.id}`}>
                        <div className="flex flex-col gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-md font-semibold text-gray-900 ">
                              {moment(riwayat.periode).format("MMMM Y")}
                            </p>
                            <div>
                              <div className="flex flex-col  items-end">
                                <p className="text-sm text-gray-700 flex gap-2 ">
                                  Gaji Pokok :{" "}
                                  <strong className="w-28 text-end">
                                    {formatRupiah(riwayat.gaji_pokok)}
                                  </strong>
                                </p>
                                <p className="text-sm text-gray-700 flex gap-2 ">
                                  Potongan :{" "}
                                  <strong className="w-28 text-end">
                                    {formatRupiah(riwayat.total_potongan)}
                                  </strong>
                                </p>
                                <p className="text-sm text-gray-700 flex gap-2">
                                  Tunjangan :{" "}
                                  <strong className="w-28 text-end">
                                    {formatRupiah(riwayat.total_tunjangan)}
                                  </strong>
                                </p>
                                <div className="border-b-2 border-black h-2 w-full"></div>
                                <p className="text-sm text-gray-700 mt-2 flex gap-2 ">
                                  Total Gaji :{" "}
                                  <strong className="w-28 text-end">
                                    {formatRupiah(riwayat.total_gaji)}
                                  </strong>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              ) : (
                <EmptyBox />
              )}
            </>
          )}
        </IonContent>
      </IonPage>
      <DateCallendar
        isOpen={isFilterModal}
        handleCancel={() => setIsFilterModal(false)}
        handleSubmit={(filterDate) => {
          setDate(moment(filterDate).format("MMMM Y"));
          setIsFilterModal(false);
        }}
        presentation={"month-year"}
      />
    </>
  );
};

export default Gaji;
