// src/app/components/animated-background.tsx
export default function AnimatedBackground() {
    return (
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-custom"></div>
        <div className="absolute inset-0 bg-noise opacity-[0.12]"></div>
      </div>
    );
  }