import { IonContent, IonPage } from "@ionic/react";
import { PlusCircleIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { CiFilter } from "react-icons/ci";
import { BsShieldFillPlus, BsShieldPlus } from "react-icons/bs";
import { useHistory } from "react-router";
import DateCallendar from "../../components/DateCallendar";

import TitleHeader from "../../components/TitleHeader";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useGet } from "../../hooks/useApi";
import { GetPayload } from "../../models/GenericPayload";
import { RiwayatIzinEntity } from "../../models/RiwayatIzin.entity";
import moment from "moment";
import Loading from "../../components/Loading";
import EmptyBox from "../../components/EmptyBox";
import { Link } from "react-router-dom";

const Tab2: React.FC = () => {
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [date, setDate] = useState<string | string[] | null | undefined>(
    moment().format("DD MMMM Y")
  );
  const [user] = useLocalStorage("user");
  const history = useHistory();

  const {
    data: payload,
    isFetching,
    refetch,
  } = useGet<GetPayload<RiwayatIzinEntity>>({
    name: "riwayat-izins",
    endpoint: `riwayat-izins`,
    filter: {
      berlangsung: true,
      date,
    },
  });

  useEffect(() => {
    refetch();
  }, [date]);
  return (
    <>
      <IonPage>
        <TitleHeader
          title="Aktifitas"
          rightIcon={
            <div className="flex flex-row gap-4">
              <label htmlFor="my-modal" className="cursor-pointer">
                <CiFilter
                  className="w-6 h-6"
                  strokeWidth={1}
                  onClick={() => setIsFilterModal(true)}
                />
              </label>

              <BsShieldFillPlus
                className="w-6 h-6 cursor-pointer"
                onClick={() => history.push("create-cuti")}
              />
              <BsShieldPlus
                className="w-6 h-6 cursor-pointer"
                onClick={() => history.push("create-izin")}
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
                  <ul className="max-w-md divide-y-2 divide-black">
                    {payload?.data.map((aktifitas) => (
                      <li className="py-3 cursor-pointer">
                        <Link to={`/aktifitas/${aktifitas?.id}`}>
                          <div className="flex flex-col gap-3">
                            <div className="flex-1 min-w-0">
                              <div className="flex flex-row justify-between">
                              <p className="text-md font-semibold text-gray-900 ">
                                {aktifitas.karyawan.nama_lengkap} 
                              </p>
                              <p className="text-[10px] bg-red-700 text-white p-1 rounded-md capitalize">
                              {aktifitas.status}
                              </p>
                              </div>

                              <div>
                                <div className="flex justify-between items-center">
                                  <p className="text-sm text-gray-500 ">
                                    {aktifitas.izin.nama_izin}
                                  </p>
                                  {aktifitas.tanggal_mulai ===
                                  aktifitas.tanggal_selesai ? (
                                    <p className="text-xs text-black font-semibold">
                                      {moment(aktifitas.tanggal_mulai).format(
                                        "DD MMM YYYY"
                                      )}
                                    </p>
                                  ) : (
                                    <p className="text-xs text-black font-semibold">
                                      {moment(aktifitas.tanggal_mulai).format(
                                        "DD MMM YYYY"
                                      )}{" "}
                                      -{" "}
                                      {moment(aktifitas.tanggal_selesai).format(
                                        "DD MMM YYYY"
                                      )}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </Link>
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
            setDate(moment(filterDate).format("DD MMMM Y"));
            setIsFilterModal(false);
          }}
          presentation={"date"}
        />
      </IonPage>
    </>
  );
};

export default Tab2;
