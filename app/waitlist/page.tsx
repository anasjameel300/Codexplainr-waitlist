import { WaitlistForm } from "@/components/waitlist-form"

export default function WaitlistPage() {
  return (
    <div className="min-h-screen w-full bg-black relative overflow-hidden">
      {/* Background effects */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background:
            "radial-gradient(ellipse 50% 35% at 50% 0%, rgba(226, 232, 240, 0.12), transparent 60%), #000000",
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <WaitlistForm />
      </div>
    </div>
  )
}
