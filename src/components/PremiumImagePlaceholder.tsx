import { ImageOff, Landmark } from "lucide-react";
import { useState } from "react";
import { cn } from "../utils/cn";

interface PremiumImagePlaceholderProps {
  name: string;
  image?: string;
  className?: string;
  priority?: boolean;
  fit?: "cover" | "contain";
}

export function PremiumImagePlaceholder({
  name,
  image,
  className,
  priority = false,
  fit = "cover",
}: PremiumImagePlaceholderProps) {
  const [broken, setBroken] = useState(false);
  const showImage = Boolean(image && !broken);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.75rem] border border-gold/25 bg-paper",
        className,
      )}
    >
      {showImage ? (
        <img
          alt={name}
          className={cn(
            "h-full w-full contrast-[1.08] saturate-[1.02]",
            fit === "contain" ? "object-contain p-3" : "object-cover",
          )}
          loading={priority ? "eager" : "lazy"}
          src={image}
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="flex h-full min-h-56 flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_20%,rgba(199,167,108,0.22),transparent_34%),linear-gradient(135deg,#FFFDF7,#EFE5D3)] p-8 text-center">
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full border border-gold/35 bg-paper/75 text-navy shadow-soft">
            {image && broken ? <ImageOff size={26} /> : <Landmark size={26} />}
          </div>
          <p className="font-display text-3xl font-black text-navy">{name}</p>
          <div className="mt-4 h-px w-28 bg-gold/50" />
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,253,247,0.06),rgba(6,26,47,0.08))]" />
    </div>
  );
}
