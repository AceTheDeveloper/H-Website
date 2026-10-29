type Variant = "red" | "mustard" | "dark" | "dynamic";

export default function FoodBackdrop({
  variant,
}: {
  variant: Variant;
}) {
  return (
    <span
      aria-hidden="true"
      className={`food-backdrop food-backdrop--${variant} pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square w-[112%] -translate-x-1/2 -translate-y-1/2 rounded-full`}
    />
  );
}
