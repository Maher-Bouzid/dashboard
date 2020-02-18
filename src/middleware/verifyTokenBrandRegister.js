import axios from "axios";
export default function verify({ next, store, to }) {
  console.log(to.params.token);
  axios
    .post(`http://localhost:3000/api/brand/verifyEmailRegisterBrand/${to.params.token}`)
    .then(res => {
      console.log(res);
      return next();
    })
    .catch(err => {
      return next({
        name: "forbidden"
      });
    });
  return next();
}
