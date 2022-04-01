export function GrantAccess(context, session, level = 1) {
  if (!session) {
    return false;
  }
  if (session?.user?.role < level) {
    return false;
  }
  return true;
}

export function redirectToLogin(context) {
  context.res.writeHead(302, { Location: "/auth/signin" });
}
