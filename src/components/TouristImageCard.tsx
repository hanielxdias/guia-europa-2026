import { ImageOff, Landmark } from "lucide-react";
import { useState } from "react";
import { cn } from "../utils/cn";

interface TouristImageCardProps {
  name: string;
  city?: string;
  image?: string;
  accent?: "navy" | "leaf" | "coral" | "gold";
  className?: string;
}

const gradients = {
  navy: "from-navy via-[#315C85] to-leaf",
  leaf: "from-leaf via-[#3BA889] to-gold",
  coral: "from-coral via-[#E27A5D] to-gold",
  gold: "from-gold via-[#D7B569] to-coral",
};

export function TouristImageCard({
  name,
  city,
  image,
  accent = "navy",
  className,
}: TouristImageCardProps) {
  const [broken, setBroken] = useState(false);
  const showImage = Boolean(image && !broken);

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-[1.25rem] bg-gradient-to-br text-white",
        gradients[accent],
        className,
      )}
    >
      {showImage ? (
        <img
          alt={name}
          className="h-full w-full object-cover"
          src={image}
          onError={() => setBroken(true)}
        />
      ) : (
        <div className="flex h-full min-h-44 flex-col justify-between p-5">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/18 backdrop-blur">
            {image && broken ? <ImageOff size={24} /> : <Landmark size={24} />}
          </div>
          <div>
            {city ? (
              <p className="text-xs font-black uppercase tracking-[0.18em] text-white/75">
                {city}
              </p>
            ) : null}
            <p className="mt-2 text-2xl font-black leading-tight">{name}</p>
          </div>
        </div>
      )}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-white/10" />
    </div>
  );
}
