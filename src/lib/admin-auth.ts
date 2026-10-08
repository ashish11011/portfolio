import "server-only";
import { cookies } from "next/headers";
import { hasAdminCookie } from "./admin-token";

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return hasAdminCookie((name) => cookieStore.get(name)?.value);
}
