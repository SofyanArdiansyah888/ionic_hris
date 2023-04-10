import { IonHeader, IonTitle, IonToolbar } from "@ionic/react";
import { ArrowLeftCircle, PlusCircleIcon } from "lucide-react";

interface IKembaliHeader {
  handleKembali(): void;
  rightIcon?: JSX.Element;
}

export default function KembaliHeader({
  handleKembali,
  rightIcon,
}: IKembaliHeader) {
  return (
    <IonHeader className="ion-no-border p-4  flex justify-between items-center bg-white ">
      <div
        className="flex flex-row items-center gap-2 cursor-pointer"
        onClick={handleKembali}
      >
        <ArrowLeftCircle className="h-8 w-8" strokeWidth={1} />
        Kembali
      </div>
      {rightIcon}
    </IonHeader>
  );
}
