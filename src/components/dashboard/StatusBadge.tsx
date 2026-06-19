type Status = "Published" | "Draft" | "Under Review";

const styles: Record<Status, string> = {
  Published: "bg-blue-500 text-white",
  Draft: "bg-gray-200 text-gray-700",
  "Under Review": "bg-orange text-white",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${styles[status]}`}>
      {status}
    </span>
  );
}
