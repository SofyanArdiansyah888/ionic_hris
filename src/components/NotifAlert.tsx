import { CheckCircle2Icon } from "lucide-react";

interface INotifAlert {
  isOpen: boolean;
  handleCancel(): void;
  message: string;
  icon: any
}

export default function NotifAlert({
  handleCancel,
  isOpen,
  message
}: INotifAlert) {
  

  return (
    <>
      <input type="checkbox" checked={isOpen} className="modal-toggle" />
      <div className="modal">
        <div className="modal-box w-[320px]">
          <h3 className="text-xl font-semibold mb-6">Notification</h3>
          <div className="w-full text-center ">
            <CheckCircle2Icon className="text-green-300 mx-auto w-20 h-20" />
            <p className="my-4 text-xl font-semibold">{message}</p>
          </div>  

          <div className="modal-action mt-0">
            <button className="btn btn-outline" onClick={handleCancel}>
              Ok
            </button>

          </div>
        </div>
      </div>
    </>
  );
}
