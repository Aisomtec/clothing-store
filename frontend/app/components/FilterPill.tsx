"use client";

type Props = {
  label: string;
  selected: boolean;
  onToggle: () => void;
};

export default function FilterPill({ label, selected, onToggle }: Props) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className={`
        px-4 py-2 rounded-full text-sm font-medium border transition
        ${
          selected
            ? "bg-gradient-to-r from-brandGradient-from via-brandGradient-via to-brandGradient-to text-black border-transparent"
            : "bg-white text-gray-700 border-orange-300 hover:border-gray-400"
        }
      `}
    >
      {label}
    </button>
  );
}
