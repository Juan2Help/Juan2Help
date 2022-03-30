export function GrantAccess(context, session, level = 2) {
  if (!session) redirectToLogin(context);
  if (session?.user?.role < level) {
    redirectToLogin(context);
    return false;
  }
  return true;
}

function redirectToLogin(context) {
  context.res.writeHead(302, { Location: "/auth/signin" });
}
