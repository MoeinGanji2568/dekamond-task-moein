import { getMyProfile } from "@/core/services/api/user/loginService";
import { cookies } from "next/headers";

export const UserPanel = async () => {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const user = await getMyProfile({
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    withCredentials: true,
  });

  return (
    <main>
      {user
        ? `Welcome, ${user.user?.name || user.user?.email}`
        : "Unauthorized"}
    </main>
  );
};
