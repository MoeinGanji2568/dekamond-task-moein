import { cookies } from "next/headers";

export async function isAuthenticated() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) return false;

  const res = await fetch(`http://localhost:3000/api/profile/getMyProfile`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: "no-store",
  });
  return res.status === 200;
}
