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
      <div className="modal">
        <div className="modal-box">
          <h3 className="text-xl font-semibold mb-6">Filter Tanggal</h3>
          <div>
            <IonDatetime
              locale="id-ID"
              presentation={presentation}
              preferWheel={true}
              onIonChange={(e) => setDate(e.detail.value)}
            />
          </div>  

          <div className="modal-action mt-0">
            <button className="btn btn-outline" onClick={handleCancel}>
              Cancel
            </button>

            <button
              className="btn btn-error"
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
