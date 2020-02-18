import axios from "axios";
export default function verify({ next, store, to }) {
  axios
    .post(`https://prodigy-rbk.herokuapp.com/api/brand/verifyEmailRegisterBrand/${to.params.token}`)
    .then(res => {
      return next();
    })
    .catch(err => {
      return next({
        name: "forbidden"
      });
    });
  return next();
}
