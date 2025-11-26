import { db } from "@/lib/db";
import CardInfo from "@/components/form/CardInfo";

export default function DashboardPage() {
  return (
    <div className="pt-2 px-6">
      <div className="grid grid-cols-4 gap-6">
        <CardInfo title="Total User" color="bg-white" />
        <CardInfo title="Petugas" color="bg-white" />
        <CardInfo title="Admin" color="bg-white" />
        <CardInfo title="Books" color="bg-white" />
      </div>
    </div>
  );
}
