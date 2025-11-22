import { db } from "@/lib/db";
import CardInfo from "@/components/form/CardInfo";

export default async function DashboardPage() {

  return (
    <div className="grid grid-cols-4 gap-6">
      <CardInfo title="Total Users"  color="bg-blue-500" />
      <CardInfo title="Petugas"  color="bg-green-500" />
      <CardInfo title="Admin" color="bg-yellow-500" />
      <CardInfo title="Books"  color="bg-red-500" />
    </div>
  );
}
