export default function GrainOverlay() {
  return (
    <div
      className="pointer-events-none fixed inset-0 z-40 h-full w-full opacity-[0.15] mix-blend-overlay"
      aria-hidden="true"
    >
      {/* CSS background-image avoids Next Image optimization overhead for a decorative looping GIF */}
      <div
        className="h-full w-full"
        style={{ backgroundImage: "url(/grain.gif)", backgroundRepeat: "repeat" }}
      />
    </div>
  );
}
