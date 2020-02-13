export default async function auth({ next, store }) {
  await store.dispatch("VERIFY_TOKEN");
  console.log("store.getters.auth.loggedIn", store.getters.auth.loggedIn);
  if (!store.getters.auth.loggedIn) {
    return next({
      name: "login"
    });
  }

  return next();
}
