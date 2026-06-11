import Spinner from "./Spinner";

type LoadingCenterProps = {
  size?: "sm" | "md" | "lg";
  className?: string;
};

export default function LoadingCenter({
  size = "lg",
  className = "h-64",
}: LoadingCenterProps) {
  return (
    <div
      className={`flex items-center justify-center text-blue-500 ${className}`}
    >
      <Spinner size={size} />
    </div>
  );
}
