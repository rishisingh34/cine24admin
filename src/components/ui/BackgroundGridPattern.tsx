export default function BackgroundGridPattern() {
  return (
    <div
      className="absolute inset-0 z-0"
      style={{
        backgroundImage: `
            repeating-linear-gradient(
              45deg,
              rgba(255, 255, 255, 0.04) 0px,
              rgba(255, 255, 255, 0.04) 1px,
              transparent 1px,
              transparent 40px
            ),
            repeating-linear-gradient(
              -45deg,
              rgba(255, 255, 255, 0.04) 0px,
              rgba(255, 255, 255, 0.04) 1px,
              transparent 1px,
              transparent 40px
            )
          `,
        backgroundColor: "#0a0a0a",
      }}
    />
  );
}
