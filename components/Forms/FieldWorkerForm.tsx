import ReportForm from "./ReportForm";
import { getSession } from "@/app/auth/actions/actions";

export default async function FieldWorkerForm() {
  const session = await getSession();
  const userId = session?.id;

  return (
    <div>
      <ReportForm isFieldWorker={true} assignedTo={userId} />
    </div>
  );
}
