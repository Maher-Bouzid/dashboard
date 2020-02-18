export default async function authBrand({ next, store }) {
  await store.dispatch("VERIFY_TOKEN");
  if (!store.getters.auth.loggedIn || store.getters.auth.type !== "brand") {
    return next({
      name: "login"
    });
  }
  //  store.commit("UPDATE_TYPE", "brand");
  return next();
}
