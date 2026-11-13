import { ARROW } from "@/lib/images";

/** The arrow + underline used by every Webflow "primary-button". */
export function ButtonArrow({ variant }: { variant: string }) {
  return (
    <>
      <img src={ARROW} loading="lazy" alt="" className={`primary-button-icon ${variant}`} />
      <div className={`primary-button-icon-2 ${variant}`} />
    </>
  );
}

export function PlusIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none">
      <path d="M12 5V19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
