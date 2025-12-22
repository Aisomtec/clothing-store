"use client";

type Props = {
  value: number;
  onChange: (val: number) => void;
};

const PRICE_POINTS = [200, 400, 600, 800, 1200, 1500];

export default function PriceRangeSlider({ value, onChange }: Props) {
  const index = PRICE_POINTS.indexOf(value);

  return (
    <div className="w-full mt-3">
      {/* SLIDER */}
      <input
        type="range"
        min={0}
        max={PRICE_POINTS.length - 1}
        step={1}
        value={index}
        onChange={(e) =>
          onChange(PRICE_POINTS[Number(e.target.value)])
        }
        className="w-full cursor-pointer accent-orange-500"
      />

      {/* LABELS */}
      <div className="flex justify-between mt-2 text-[11px] text-gray-500">
        {PRICE_POINTS.map((p) => (
          <span
            key={p}
            className={
              p === value
                ? "font-semibold bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to bg-clip-text text-transparent"
                : ""
            }
          >
            ₹{p}
          </span>
        ))}
      </div>
    </div>
  );
}
