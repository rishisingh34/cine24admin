import { cn } from "@/lib/utils";

const sizeMap = {
  sm: { container: "h-4 w-4", bar: "h-[22%] w-[8%]" },
  md: { container: "h-6 w-6", bar: "h-[22%] w-[8%]" },
  lg: { container: "h-8 w-8", bar: "h-[22%] w-[8%]" },
};

type SpinnerProps = {
  size?: keyof typeof sizeMap;
  className?: string;
};

export default function Spinner({ size = "md", className }: SpinnerProps) {
  const { container, bar } = sizeMap[size];

  return (
    <div
      role="status"
      aria-label="Loading"
      className={cn("relative inline-flex items-center justify-center", container, className)}
    >
      {Array.from({ length: 8 }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "absolute left-1/2 top-1/2 origin-center rounded-full bg-current",
            bar
          )}
          style={{
            transform: `translate(-50%, -50%) rotate(${i * 45}deg) translateY(-130%)`,
            animation: "spinner-fade 0.8s linear infinite",
            animationDelay: `${-0.8 + i * 0.1}s`,
          }}
        />
      ))}
    </div>
  );
}
