export default async function authAdmin({ next, store }) {
  await store.dispatch("VERIFY_TOKEN");
  if (!store.getters.auth.loggedIn || store.getters.auth.type !== "admin") {
    return next({
      name: "login"
    });
  }
  //store.commit("UPDATE_TYPE", "admin");

  return next();
}
