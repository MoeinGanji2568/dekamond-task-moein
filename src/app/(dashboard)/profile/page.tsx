import { redirect } from "next/navigation";
import { UserPanel } from "@/view/userPanel";
import { isAuthenticated } from "@/utils/auth";

export default async function Profile() {
  const authenticated = await isAuthenticated();
  if (!authenticated) {
    redirect("/login");
  }
  return <UserPanel />;
}
