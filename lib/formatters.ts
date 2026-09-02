import { Timestamp } from "firebase/firestore";

export function formatFirestoreDate(
  ts: Timestamp | Date | null | undefined,
  options?: Intl.DateTimeFormatOptions
): string {
  if (!ts) return "-";
  
  const dateObj =
    typeof (ts as Timestamp).toDate === "function"
      ? (ts as Timestamp).toDate()
      : new Date(ts as Date);

  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };

  return dateObj.toLocaleDateString("id-ID", options || defaultOptions);
}
