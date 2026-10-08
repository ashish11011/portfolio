/** Keep project actions and uploads consistent with the existing admin gate. */
export function hasAdminToken(value: string | undefined) {
  return Boolean(value) && value === (process.env.ADMIN_TOKEN || "Ashish.ab1");
}

/** Accept the admin cookie name and the original token cookie on every admin gate. */
export function hasAdminCookie(readCookie: (name: string) => string | undefined) {
  return ["admintoken", "token"].some((name) => hasAdminToken(readCookie(name)));
}
