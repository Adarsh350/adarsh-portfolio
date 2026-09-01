import { redirect } from "next/navigation";

// ponytail: safety net only, not part of the real routing path
export default function Page() {
  redirect("/desktop");
}
