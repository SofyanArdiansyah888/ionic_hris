import { IonHeader } from "@ionic/react";

interface ITitleHeader {
  title: string;
  rightIcon?: JSX.Element;
}

export default function TitleHeader({ title, rightIcon }: ITitleHeader) {
  return (
    <IonHeader className="ion-no-border p-4  flex justify-between items-center bg-zinc-50 ">
      <div className="font-semibold text-lg">{title}</div>
      {rightIcon}
    </IonHeader>
  );
}
