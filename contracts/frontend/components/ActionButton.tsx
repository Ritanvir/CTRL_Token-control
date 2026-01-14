"use client";

export default function ActionButton({
  label,
  onClick,
  disabled,
}: {
  label: string;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="
        px-4 py-2 rounded-2xl font-semibold text-white
        bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500
        shadow-[0_10px_30px_rgba(0,0,0,0.35)]
        hover:scale-[1.02] active:scale-[0.98]
        transition-transform duration-150
        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100
      "
    >
      {label}
    </button>
  );
}