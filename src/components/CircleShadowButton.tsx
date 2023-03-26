export default function CircleShadowButton({icon}: {icon: JSX.Element}) {
  return (
    <div className="rounded-full p-1 border-2 border-black cursor-pointer   ">
      {icon}
    </div>
  );
}
