import { IonDatetime } from "@ionic/react";
import { useState } from "react";

interface IDateCallendar {
  isOpen: boolean;
  handleCancel(): void;
  handleSubmit(value: string | string[] | null | undefined): void;
  presentation:
    | "date-time"
    | "time-date"
    | "date"
    | "time"
    | "month"
    | "year"
    | "month-year";
}

export default function DateCallendar({
  handleSubmit,
  handleCancel,
  isOpen,
  presentation,
}: IDateCallendar) {
  const [date, setDate] = useState<string | string[] | null | undefined>();

  return (
    <>
      <input type="checkbox" checked={isOpen} className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box w-[350px] overflow-hidden">
          <h3 className="text-xl  mb-6">Filter Tanggal</h3>
          
            <IonDatetime
              locale="id-ID"
              presentation={presentation}
              preferWheel={true}
              onIonChange={(e) => setDate(e.detail.value)}
              className="text-xs mx-auto"
              size="cover"
            />
          

          <div className="modal-action mt-4">
            <button className="btn bg-black" onClick={handleCancel}>
              Cancel
            </button>

            <button
              className="btn bg-red-700 border-red-700"
              onClick={() => {
                handleSubmit(date);
              }}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
