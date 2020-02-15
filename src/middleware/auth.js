export default async function auth({ next, store }) {
  await store.dispatch("VERIFY_TOKEN");
  if (!store.getters.auth.loggedIn) {
    return next({
      name: "login"
    });
  }

  return next();
}
