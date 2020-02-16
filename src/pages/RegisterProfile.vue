<template>
  <div>
    <div class="wrapper wrapper-full-page">
      <div
        class="page-header login-page header-filter"
        filter-color="black"
        style="background-image: url(https://images.unsplash.com/photo-1495105787522-5334e3ffa0ef?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80); background-size: cover; background-position: top center;"
      >
        <div class="container" style="max-width:1600px;">
          <div class="row">
            <div class="col-lg-4 col-md-6 col-sm-8 ml-auto mr-auto">
              <!-- <div class="card card-login card-hidden">
                <div class="card-header card-header-rose text-center" style="padding: 20px">
                  <h4 class="card-title">Login</h4>
                </div>
              <div class="card-body" style="padding: 0px 30px 0px 30px;">-->
              <!-- <md-field class="md-form-group" :class="getValidationClass('email')">
                    <md-icon>email</md-icon>
                    <label for="email">Email...</label>
                    <md-input name="email" id="email" v-model="email" type="email"></md-input>
                    <span class="md-error" v-if="!$v.email.required">Email is required</span>
                    <span class="md-error" v-else-if="!$v.email.email">Invalid email</span>
                  </md-field>
                  <md-field class="md-form-group" :class="getValidationClass('password')">
                    <md-icon>lock_outline</md-icon>
                    <label for="password">Password...</label>
                    <md-input name="password" id="password" v-model="password" type="password"></md-input>
                    <span class="md-error" v-if="!$v.password.required">Password is required</span>
                    <span class="md-error" v-else-if="!$v.password.minlength">Your password should have a minimum of 8 characters</span>
              </md-field>-->
              <form>
                <md-card>
                  <md-card-header data-background-color="green">
                    <h4 class="title">Welcome</h4>
                    <p class="category">Please complete your profile</p>
                  </md-card-header>

                  <md-card-content>
                    <div class="md-layout">
                      <md-field class="md-form-group" :class="getValidationClass('brandName')">
                        <md-icon>star</md-icon>
                        <label for="brandName">Brand Name...</label>
                        <md-input name="brandName" id="brandName" v-model="brandName" type="text"></md-input>
                        <span class="md-error" v-if="!$v.brandName.required">Name is required</span>
                      </md-field>
                      <md-field class="md-form-group" :class="getValidationClass('email')">
                        <md-icon>email</md-icon>
                        <label for="email">Email...</label>
                        <md-input name="email" id="email" v-model="email" type="email"></md-input>
                        <span class="md-error" v-if="!$v.email.required">Email is required</span>
                        <span class="md-error" v-else-if="!$v.email.email">Invalid email</span>
                      </md-field>
                      <md-field class="md-form-group" :class="getValidationClass('password')">
                        <md-icon>lock_outline</md-icon>
                        <label for="password">Password...</label>
                        <md-input name="password" id="password" v-model="password" type="password"></md-input>
                        <span class="md-error" v-if="!$v.password.required">Password is required</span>
                        <span
                          class="md-error"
                          v-else-if="!$v.password.minlength"
                        >Your password should have a minimum of 8 characters</span>
                      </md-field>
                      <md-field class="md-form-group" :class="getValidationClass('tmpImg')">
                        <md-icon>image</md-icon>
                        <label for="tmpImg">Temporary Brand Image...</label>
                        <md-input name="tmpImg" id="tmpImg" v-model="tmpImg" type="text"></md-input>
                      </md-field>
                      <div class="col-md-12 text-center">
                        <div class="fileinput fileinput-new text-center" data-provides="fileinput">
                          <div class="fileinput-new thumbnail">
                            <img :src="defaultImage" alt="..." />
                          </div>
                          <div class="fileinput-preview fileinput-exists thumbnail"></div>
                          <div>
                            <span class="btn btn-rose btn-round btn-file">
                              <span v-if="isDefault" class="fileinput-new">Select image</span>
                              <span v-else class="fileinput-new">Change</span>
                              <input type="file" name="..." @change="imageChange" id="image" />
                            </span>
                            <span
                              v-if="!isDefault"
                              @click="imageRemove"
                              class="btn btn-danger btn-round btn-file"
                            >
                              <span class="fileinput-new">
                                <i class="fa fa-times"></i> Remove
                              </span>
                            </span>
                          </div>
                        </div>
                      </div>

                      <div
                        class="md-layout-item md-size-100 text-right"
                        style="display: flex; flex-direction: column-reverse;"
                      >
                        <md-progress-bar
                          style="width: 100%"
                          md-mode="indeterminate"
                          v-if="sending"
                        />
                        <md-button @click="validateUser" class="md-raised md-success">Update Profile</md-button>
                      </div>
                    </div>
                  </md-card-content>
                </md-card>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="notifications">
      <div v-if="successNotif" class="alert alertTop alert-danger">
        <span>
          <b>SUCCESS</b> : Yuhuuu! You're logged In!
        </span>
        <button
          type="button"
          aria-hidden="true"
          class="close"
          @click="removeNotify('successNotif')"
        >
          <md-icon style="color: white">clear</md-icon>
        </button>
      </div>
      <div v-if="wrongUsernameNotif" class="alert alertTop alert-danger">
        <span>
          <b>ERROR ALERT</b> : Wrong email, please make sure you register or verify that it is written correctly ...
        </span>
        <button
          type="button"
          aria-hidden="true"
          class="close"
          @click="removeNotify('wrongUsernameNotif')"
        >
          <md-icon style="color: white">clear</md-icon>
        </button>
      </div>
      <div v-if="wrongPasswordNotif" class="alert alertTop alert-danger">
        <span>
          <b>ERROR ALERT</b> : Wrong password, please make sure that it is written correctly ...
        </span>
        <button
          type="button"
          aria-hidden="true"
          class="close"
          @click="removeNotify('wrongPasswordNotif')"
        >
          <md-icon style="color: white">clear</md-icon>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../../src/main";
import { mapMutations, mapGetters } from "vuex";
import axios from "axios";
import { validationMixin } from "vuelidate";
import {
  required,
  email,
  minLength,
  maxLength
} from "vuelidate/lib/validators";

import { EditProfileForm } from "@/pages";

export default {
  bodyClass: "login-page",
  mixins: [validationMixin],
  data() {
    return {
      successNotif: false,
      wrongUsernameNotif: false,
      wrongPasswordNotif: false,
      sending: false,
      brandName: null,
      email: null,
      password: null,
      image: null,
      isDefault: true,
      tmpImg: null,
      defaultImage: require("@/assets/img/image_placeholder.jpg")
    };
  },
  validations: {
    email: {
      required,
      email
    },
    brandName: {
      required
    },
    password: {
      required,
      minLength: minLength(8)
    },
    defaultImage: {
      required
    }
  },
  methods: {
    ...mapGetters(["auth"]),
    ...mapMutations(["UPDATE_LOGIN", "UPDATE_ACTIVATE"]),
    submit: async function(e) {
      this.sending = false;
      let registrationInfo = new FormData();
      registrationInfo.append("email", this.email);
      registrationInfo.append("name", this.brandName);
      registrationInfo.append("password", this.password);
      registrationInfo.append("image", this.image);
      axios
        .post("http://localhost:3000/api/brand/signUp", registrationInfo, {
          headers: { "X-Requested-With": "XMLHttpRequest" }
        })
        .then(response => {
          if (response.data.status === "success") {
            this.UPDATE_LOGIN(true);
            router.push({ path: "/" });
          } else if (response.data.status === "wrong password") {
            this.wrongPasswordNotif = true;
          } else {
            this.wrongUsernameNotif = true;
          }
        })
        .catch(err => console.log(err.response));
    },
    getValidationClass(fieldName) {
      const field = this.$v[fieldName];

      if (field) {
        return {
          "md-invalid": field.$invalid && field.$dirty
        };
      }
    },
    validateUser() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.sending = true;

        this.submit();
      }
    },
    removeNotify(notifyClass) {
      this[notifyClass] = false;
    },
    imageChange(e) {
      e.preventDefault();
      this.image = e.target.files[0];
      let reader = new FileReader();
      let file = e.target.files[0];
      reader.onloadend = () => {
        this.defaultImage = reader.result;
      };
      this.isDefault = false;
      reader.readAsDataURL(file);
    },
    imageRemove(e) {
      this.defaultImage = require("@/assets/img/image_placeholder.jpg");
      this.isDefault = true;
    }
  }
};
</script>

<style scoped>
.row {
  width: 100%;
}

.md-error {
  transform: translate3d(0, -8px, 0) !important;
}

.card {
  font-size: 0.875rem;
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: sans-serif;
  line-height: 1.15;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -ms-overflow-style: scrollbar;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}

article,
aside,
dialog,
figcaption,
figure,
footer,
header,
hgroup,
main,
nav,
section {
  display: block;
}

body {
  margin: 0;
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fafafa;
}

h1,
h2,
h3,
h4,
h5,
h6 {
  margin-top: 0;
  margin-bottom: 0.5rem;
}

p {
  margin-top: 0;
  margin-bottom: 1rem;
}

ol,
ul,
dl {
  margin-top: 0;
  margin-bottom: 1rem;
}

a {
  color: #9c27b0;
  text-decoration: none;
  background-color: transparent;
  -webkit-text-decoration-skip: objects;
}

a:hover {
  color: #0a6ebd;
  text-decoration: underline;
}

button {
  border-radius: 0;
}

input,
button,
select,
optgroup,
textarea {
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
}

button,
input {
  overflow: visible;
}

button,
select {
  text-transform: none;
}

button,
html [type="button"],
[type="reset"],
[type="submit"] {
  -webkit-appearance: button;
}

h4,
.h4 {
  font-size: 1.5rem;
}

.container {
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

@media (min-width: 576px) {
  .container {
    max-width: 540px;
  }
}

@media (min-width: 768px) {
  .container {
    max-width: 720px;
  }
}

@media (min-width: 992px) {
  .container {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .container {
    max-width: 1140px;
  }
}

.col-1,
.col-2,
.col-3,
.col-4,
.col-5,
.col-6,
.col-7,
.col-8,
.col-9,
.col-10,
.col-11,
.col-12,
.col,
.col-auto,
.col-sm-1,
.col-sm-2,
.col-sm-3,
.col-sm-4,
.col-sm-5,
.col-sm-6,
.col-sm-7,
.col-sm-8,
.col-sm-9,
.col-sm-10,
.col-sm-11,
.col-sm-12,
.col-sm,
.col-sm-auto,
.col-md-1,
.col-md-2,
.col-md-3,
.col-md-4,
.col-md-5,
.col-md-6,
.col-md-7,
.col-md-8,
.col-md-9,
.col-md-10,
.col-md-11,
.col-md-12,
.col-md,
.col-md-auto,
.col-lg-1,
.col-lg-2,
.col-lg-3,
.col-lg-4,
.col-lg-5,
.col-lg-6,
.col-lg-7,
.col-lg-8,
.col-lg-9,
.col-lg-10,
.col-lg-11,
.col-lg-12,
.col-lg,
.col-lg-auto,
.col-xl-1,
.col-xl-2,
.col-xl-3,
.col-xl-4,
.col-xl-5,
.col-xl-6,
.col-xl-7,
.col-xl-8,
.col-xl-9,
.col-xl-10,
.col-xl-11,
.col-xl-12,
.col-xl,
.col-xl-auto {
  position: relative;
  width: 100%;
  min-height: 1px;
  padding-right: 15px;
  padding-left: 15px;
}

@media (min-width: 576px) {
  .col-sm {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }
  .col-sm-auto {
    flex: 0 0 auto;
    width: auto;
    max-width: none;
  }
  .col-sm-1 {
    flex: 0 0 8.333333%;
    max-width: 8.333333%;
  }
  .col-sm-2 {
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
  }
  .col-sm-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }
  .col-sm-4 {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
  .col-sm-5 {
    flex: 0 0 41.666667%;
    max-width: 41.666667%;
  }
  .col-sm-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
  .col-sm-7 {
    flex: 0 0 58.333333%;
    max-width: 58.333333%;
  }
  .col-sm-8 {
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }
  .col-sm-9 {
    flex: 0 0 75%;
    max-width: 75%;
  }
  .col-sm-10 {
    flex: 0 0 83.333333%;
    max-width: 83.333333%;
  }
  .col-sm-11 {
    flex: 0 0 91.666667%;
    max-width: 91.666667%;
  }
  .col-sm-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .order-sm-first {
    order: -1;
  }
  .order-sm-last {
    order: 13;
  }
  .order-sm-0 {
    order: 0;
  }
  .order-sm-1 {
    order: 1;
  }
  .order-sm-2 {
    order: 2;
  }
  .order-sm-3 {
    order: 3;
  }
  .order-sm-4 {
    order: 4;
  }
  .order-sm-5 {
    order: 5;
  }
  .order-sm-6 {
    order: 6;
  }
  .order-sm-7 {
    order: 7;
  }
  .order-sm-8 {
    order: 8;
  }
  .order-sm-9 {
    order: 9;
  }
  .order-sm-10 {
    order: 10;
  }
  .order-sm-11 {
    order: 11;
  }
  .order-sm-12 {
    order: 12;
  }
  .offset-sm-0 {
    margin-left: 0;
  }
  .offset-sm-1 {
    margin-left: 8.333333%;
  }
  .offset-sm-2 {
    margin-left: 16.666667%;
  }
  .offset-sm-3 {
    margin-left: 25%;
  }
  .offset-sm-4 {
    margin-left: 33.333333%;
  }
  .offset-sm-5 {
    margin-left: 41.666667%;
  }
  .offset-sm-6 {
    margin-left: 50%;
  }
  .offset-sm-7 {
    margin-left: 58.333333%;
  }
  .offset-sm-8 {
    margin-left: 66.666667%;
  }
  .offset-sm-9 {
    margin-left: 75%;
  }
  .offset-sm-10 {
    margin-left: 83.333333%;
  }
  .offset-sm-11 {
    margin-left: 91.666667%;
  }
}

@media (min-width: 992px) {
  .col-lg {
    flex-basis: 0;
    flex-grow: 1;
    max-width: 100%;
  }
  .col-lg-auto {
    flex: 0 0 auto;
    width: auto;
    max-width: none;
  }
  .col-lg-1 {
    flex: 0 0 8.333333%;
    max-width: 8.333333%;
  }
  .col-lg-2 {
    flex: 0 0 16.666667%;
    max-width: 16.666667%;
  }
  .col-lg-3 {
    flex: 0 0 25%;
    max-width: 25%;
  }
  .col-lg-4 {
    flex: 0 0 33.333333%;
    max-width: 33.333333%;
  }
  .col-lg-5 {
    flex: 0 0 41.666667%;
    max-width: 41.666667%;
  }
  .col-lg-6 {
    flex: 0 0 50%;
    max-width: 50%;
  }
  .col-lg-7 {
    flex: 0 0 58.333333%;
    max-width: 58.333333%;
  }
  .col-lg-8 {
    flex: 0 0 66.666667%;
    max-width: 66.666667%;
  }
  .col-lg-9 {
    flex: 0 0 75%;
    max-width: 75%;
  }
  .col-lg-10 {
    flex: 0 0 83.333333%;
    max-width: 83.333333%;
  }
  .col-lg-11 {
    flex: 0 0 91.666667%;
    max-width: 91.666667%;
  }
  .col-lg-12 {
    flex: 0 0 100%;
    max-width: 100%;
  }
  .order-lg-first {
    order: -1;
  }
  .order-lg-last {
    order: 13;
  }
  .order-lg-0 {
    order: 0;
  }
  .order-lg-1 {
    order: 1;
  }
  .order-lg-2 {
    order: 2;
  }
  .order-lg-3 {
    order: 3;
  }
  .order-lg-4 {
    order: 4;
  }
  .order-lg-5 {
    order: 5;
  }
  .order-lg-6 {
    order: 6;
  }
  .order-lg-7 {
    order: 7;
  }
  .order-lg-8 {
    order: 8;
  }
  .order-lg-9 {
    order: 9;
  }
  .order-lg-10 {
    order: 10;
  }
  .order-lg-11 {
    order: 11;
  }
  .order-lg-12 {
    order: 12;
  }
  .offset-lg-0 {
    margin-left: 0;
  }
  .offset-lg-1 {
    margin-left: 8.333333%;
  }
  .offset-lg-2 {
    margin-left: 16.666667%;
  }
  .offset-lg-3 {
    margin-left: 25%;
  }
  .offset-lg-4 {
    margin-left: 33.333333%;
  }
  .offset-lg-5 {
    margin-left: 41.666667%;
  }
  .offset-lg-6 {
    margin-left: 50%;
  }
  .offset-lg-7 {
    margin-left: 58.333333%;
  }
  .offset-lg-8 {
    margin-left: 66.666667%;
  }
  .offset-lg-9 {
    margin-left: 75%;
  }
  .offset-lg-10 {
    margin-left: 83.333333%;
  }
  .offset-lg-11 {
    margin-left: 91.666667%;
  }
}

.form-control {
  display: block;
  width: 100%;
  padding: 0.4375rem 0;
  font-size: 1rem;
  line-height: 1.5;
  color: #495057;
  background-color: rgba(0, 0, 0, 0);
  background-clip: padding-box;
  border: 1px solid #d2d2d2;
  border-radius: 0;
  box-shadow: none;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.form-control::placeholder {
  color: #6c757d;
  opacity: 1;
}

.btn {
  display: inline-block;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  user-select: none;
  border: 1px solid transparent;
  padding: 0.46875rem 1rem;
  font-size: 1rem;
  line-height: 1.5;
  border-radius: 0.25rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out,
    border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

.btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}

.btn-link {
  font-weight: 400;
  color: #9c27b0;
  background-color: transparent;
}

.btn-lg,
.btn-group-lg > .btn {
  padding: 1.125rem 2.25rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}

.collapse {
  display: none;
}

.input-group {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  width: 100%;
}

.input-group > .form-control,
.input-group > .custom-select,
.input-group > .custom-file {
  position: relative;
  flex: 1 1 auto;
  width: 1%;
  margin-bottom: 0;
}

.input-group > .form-control:not(:first-child),
.input-group > .custom-select:not(:first-child) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.input-group-prepend,
.input-group-append {
  display: flex;
}

.input-group-prepend {
  margin-right: -1px;
}

.input-group-text {
  display: flex;
  align-items: center;
  padding: 0.4375rem 0;
  margin-bottom: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #495057;
  text-align: center;
  white-space: nowrap;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 0;
}

.input-group > .input-group-prepend > .btn,
.input-group > .input-group-prepend > .input-group-text,
.input-group > .input-group-append:not(:last-child) > .btn,
.input-group > .input-group-append:not(:last-child) > .input-group-text,
.input-group
  > .input-group-append:last-child
  > .btn:not(:last-child):not(.dropdown-toggle),
.input-group
  > .input-group-append:last-child
  > .input-group-text:not(:last-child) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.card {
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  border: 1px solid #eeeeee;
  border-radius: 0.25rem;
}

.card-body {
  flex: 1 1 auto;
  padding: 1.25rem;
}

.card-title {
  margin-bottom: 0.75rem;
}

.card-header {
  padding: 0.75rem 1.25rem;
  margin-bottom: 0;
  background-color: #fff;
  border-bottom: 1px solid #eeeeee;
}

.card-header:first-child {
  border-radius: calc(0.25rem - 1px) calc(0.25rem - 1px) 0 0;
}

.card-footer {
  padding: 0.75rem 1.25rem;
  background-color: #fff;
  border-top: 1px solid #eeeeee;
}

.card-footer:last-child {
  border-radius: 0 0 calc(0.25rem - 1px) calc(0.25rem - 1px);
}

.justify-content-center {
  justify-content: center !important;
}

.mr-auto,
.mx-auto {
  margin-right: auto !important;
}

.mb-auto,
.my-auto {
  margin-bottom: auto !important;
}

.ml-auto,
.mx-auto {
  margin-left: auto !important;
}

.btn {
  position: relative;
  padding: 12px 30px;
  margin: 0.3125rem 1px;
  font-size: 0.75rem;
  font-weight: 400;
  line-height: 1.428571;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0;
  cursor: pointer;
  background-color: transparent;
  border: 0;
  border-radius: 0.2rem;
  outline: 0;
  transition: box-shadow 0.2s cubic-bezier(0.4, 0, 1, 1),
    background-color 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: box-shadow, transform;
}

.btn.btn-rose {
  color: #fff;
  background-color: #e91e63;
  border-color: #e91e63;
  box-shadow: 0 2px 2px 0 rgba(233, 30, 99, 0.14),
    0 3px 1px -2px rgba(233, 30, 99, 0.2), 0 1px 5px 0 rgba(233, 30, 99, 0.12);
}

.btn.btn-rose.btn-link {
  background-color: transparent;
  color: #e91e63;
  box-shadow: none;
}

.btn.btn-danger {
  color: #fff;
  background-color: #f44336;
  border-color: #f44336;
  box-shadow: 0 2px 2px 0 rgba(244, 67, 54, 0.14),
    0 3px 1px -2px rgba(244, 67, 54, 0.2), 0 1px 5px 0 rgba(244, 67, 54, 0.12);
}

.btn,
.btn.btn-default {
  color: #fff;
  background-color: #999999;
  border-color: #999999;
  box-shadow: 0 2px 2px 0 rgba(153, 153, 153, 0.14),
    0 3px 1px -2px rgba(153, 153, 153, 0.2),
    0 1px 5px 0 rgba(153, 153, 153, 0.12);
}

.btn.btn-link,
.btn.btn-default.btn-link {
  background-color: transparent;
  color: #999999;
  box-shadow: none;
}

.btn.btn-white,
.btn.btn-white:focus,
.btn.btn-white:hover {
  background-color: #fff;
  color: #999999;
}

.btn.btn-white.btn-link {
  color: #fff;
  background: transparent;
  box-shadow: none;
}

.btn.btn-lg,
.btn-group-lg > .btn,
.btn-group-lg .btn {
  padding: 1.125rem 2.25rem;
  font-size: 0.875rem;
  line-height: 1.333333;
  border-radius: 0.2rem;
}

.btn.btn-sm,
.btn-group-sm > .btn,
.btn-group-sm .btn {
  padding: 0.40625rem 1.25rem;
  font-size: 0.6875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}

.btn.btn-round {
  border-radius: 30px;
}

.btn.btn-fab,
.btn.btn-just-icon {
  font-size: 24px;
  height: 41px;
  min-width: 41px;
  width: 41px;
  padding: 0;
  overflow: hidden;
  position: relative;
  line-height: 41px;
}

.btn.btn-fab .material-icons,
.btn.btn-fab .fa,
.btn.btn-just-icon .material-icons,
.btn.btn-just-icon .fa {
  margin-top: 0;
  position: absolute;
  width: 100%;
  transform: none;
  left: 0;
  top: 0;
  height: 100%;
  line-height: 41px;
  font-size: 20px;
}

form {
  margin-bottom: 1.125rem;
}

.card form {
  margin: 0;
}

.navbar form {
  margin-bottom: 0;
}

.navbar form .bmd-form-group {
  display: inline-block;
  padding-top: 0;
}

.navbar form .btn {
  margin-bottom: 0;
}

.form-control {
  background: no-repeat center bottom, center calc(100% - 1px);
  background-size: 0 100%, 100% 100%;
  border: 0;
  height: 36px;
  transition: background 0s ease-out;
  padding-left: 0;
  padding-right: 0;
  border-radius: 0;
  font-size: 14px;
}

.form-control:focus,
.bmd-form-group.is-focused .form-control {
  background-size: 100% 100%, 100% 100%;
  transition-duration: 0.3s;
  box-shadow: none;
}

.form-control::-moz-placeholder {
  color: #aaaaaa;
  font-weight: 400;
  font-size: 14px;
}

.form-control:-ms-input-placeholder {
  color: #aaaaaa;
  font-weight: 400;
  font-size: 14px;
}

.form-control::-webkit-input-placeholder {
  color: #aaaaaa;
  font-weight: 400;
  font-size: 14px;
}

.form-control,
.is-focused .form-control {
  background-image: linear-gradient(
      to top,
      #9c27b0 2px,
      rgba(156, 39, 176, 0) 2px
    ),
    linear-gradient(to top, #d2d2d2 1px, rgba(210, 210, 210, 0) 1px);
}

.bmd-form-group .form-control,
.bmd-form-group label,
.bmd-form-group input::placeholder {
  line-height: 1.1;
}

.form-control,
label,
input::placeholder {
  line-height: 1.1;
}

.input-group .input-group-text {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 15px 0 15px;
  background-color: transparent;
  border-color: transparent;
}

html * {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body,
h1,
h2,
h3,
h4,
h5,
h6,
.h1,
.h2,
.h3,
.h4 {
  font-family: "Roboto", "Helvetica", "Arial", sans-serif;
  font-weight: 300;
  line-height: 1.5em;
}

h4,
.h4 {
  font-size: 1.125rem;
  line-height: 1.4em;
  font-weight: 300;
}

.title,
.title a,
.card-title,
.card-title a,
.info-title,
.info-title a,
.footer-brand,
.footer-brand a,
.footer-big h5,
.footer-big h5 a,
.footer-big h4,
.footer-big h4 a,
.media .media-heading,
.media .media-heading a {
  color: #3c4858;
  text-decoration: none;
}

.description,
.card-description,
.footer-big p {
  color: #999999;
}
a {
  color: #9c27b0;
}

.animation-transition-general,
.sidebar
  .sidebar-wrapper
  > .nav
  [data-toggle="collapse"]
  ~ div
  > ul
  > li
  > a
  span,
.sidebar
  .sidebar-wrapper
  .user
  .user-info
  [data-toggle="collapse"]
  ~ div
  > ul
  > li
  > a
  span,
.sidebar .nav p,
.sidebar .logo a.logo-mini,
.sidebar .logo a.logo-normal,
.sidebar .user .photo,
.sidebar .user .user-info > a > span,
.login-page .card-login,
.lock-page .card-profile {
  -webkit-transition: all 300ms linear;
  -moz-transition: all 300ms linear;
  -o-transition: all 300ms linear;
  -ms-transition: all 300ms linear;
  transition: all 300ms linear;
}

.page-header {
  min-height: 100vh;
  max-height: 1000px;
  display: flex !important;
  height: 100%;
  background-position: center center;
  background-size: cover;
  padding: 0;
  margin: 0;
  border: 0;
  color: #fff;
  position: relative;
  align-items: center;
}

.page-header .page-header-image {
  position: absolute;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.page-header .content-center {
  position: absolute;
  top: 50%;
  left: 50%;
  z-index: 2;
  -ms-transform: translate(-50%, -50%);
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
  color: #ffffff;
  padding: 0 15px;
  width: 100%;
  max-width: 880px;
}

.page-header footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.page-header .container {
  height: 100%;
  z-index: 1;
}

.header-filter {
  position: relative;
}

.header-filter:before,
.header-filter:after {
  position: absolute;
  z-index: 1;
  width: 100%;
  height: 100%;
  display: block;
  left: 0;
  top: 0;
  content: "";
}

.header-filter::before {
  background: rgba(0, 0, 0, 0.5);
}

.header-filter .container {
  z-index: 2;
  position: relative;
}

.card {
  border: 0;
  margin-bottom: 30px;
  margin-top: 30px;
  border-radius: 6px;
  color: #333333;
  background: #fff;
  width: 100%;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.card .card-title {
  margin-top: 0.625rem;
}

.card .card-body,
.card .card-footer {
  padding: 0.9375rem 1.875rem;
}

.card .card-body + .card-footer {
  padding-top: 0rem;
  border: 0;
  border-radius: 6px;
}

.card .card-footer {
  display: flex;
  align-items: center;
  background-color: transparent;
  border: 0;
}

.card .card-header {
  border-bottom: none;
  background: transparent;
}

.card .card-header-rose .card-icon,
.card .card-header-rose .card-text,
.card .card-header-rose:not(.card-header-icon):not(.card-header-text),
.card.bg-rose,
.card.card-rotate.bg-rose .front,
.card.card-rotate.bg-rose .back {
  background: linear-gradient(60deg, #ec407a, #d81b60);
}

.card .card-header-rose .card-icon,
.card .card-header-rose:not(.card-header-icon):not(.card-header-text),
.card .card-header-rose .card-text {
  box-shadow: 0 4px 20px 0px rgba(0, 0, 0, 0.14),
    0 7px 10px -5px rgba(233, 30, 99, 0.4);
}

.card [class*="card-header-"],
.card[class*="bg-"] {
  color: #fff;
}

.card [class*="card-header-"] .card-title a,
.card [class*="card-header-"] .card-title,
.card [class*="card-header-"] .icon i,
.card[class*="bg-"] .card-title a,
.card[class*="bg-"] .card-title,
.card[class*="bg-"] .icon i {
  color: #fff;
}

.card {
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.14);
}

.card .table tr:first-child td {
  border-top: none;
}

.card .card-title {
  margin-top: 0;
  margin-bottom: 3px;
}

.card .card-body {
  padding: 0.9375rem 20px;
  position: relative;
}

.card .card-body .form-group {
  margin: 8px 0 0;
}

.card .card-header {
  z-index: 3 !important;
}

.card .card-header .card-title {
  margin-bottom: 3px;
}

.card .card-body + .card-footer,
.card .card-footer {
  padding: 0;
  padding-top: 10px;
  margin: 0 15px 10px;
  border-radius: 0;
  justify-content: space-between;
  align-items: center;
}

.card [class*="card-header-"] {
  margin: 0px 15px 0;
  padding: 0;
  position: relative;
}

.card [class*="card-header-"] .card-title + .card-category {
  color: rgba(255, 255, 255, 0.8);
}

.card [class*="card-header-"] .card-title + .card-category a {
  color: #fff;
}

.card
  [class*="card-header-"]:not(.card-header-icon):not(.card-header-text):not(.card-header-image) {
  border-radius: 3px;
  margin-top: -20px;
  padding: 15px;
}

a {
  color: #9c27b0;
}

.wrapper {
  position: relative;
  top: 0;
  height: 100vh;
}

.wrapper:after {
  display: table;
  clear: both;
  content: " ";
}

.wrapper.wrapper-full-page {
  height: auto;
  min-height: 100vh;
}

.login-page .card-login .card-header {
  margin-top: -40px;
  margin-bottom: 20px;
}

.login-page .card-login {
  -webkit-transform: translate3d(0, 0, 0);
  -moz-transform: translate3d(0, 0, 0);
  -o-transform: translate3d(0, 0, 0);
  -ms-transform: translate3d(0, 0, 0);
  transform: translate3d(0, 0, 0);
}

.login-page .card-login .card-body {
  padding: 0px 30px 0px 10px;
}

.login-page .card-login .card-body .input-group .input-group-text {
  padding: 15px 15px 0 15px;
}

.login-page .card-login .card-body .input-group .form-control {
  padding-bottom: 10px;
  margin: 17px 0 0 0;
}

.login-page .card-login .social-line .btn {
  margin-left: 5px;
  margin-right: 5px;
}

.social-line {
  padding: 0.9375rem 0;
}

.login-page .card-login .card-header {
  margin-top: -40px !important;
  margin-bottom: 20px;
}

.login-page .card-login .social-line {
  padding: 0;
  margin-top: 15px;
}

.login-page .card-login .card-title {
  margin-top: 10px;
  margin-bottom: 10px;
  font-weight: 700;
}

img {
  vertical-align: middle;
  border-style: none;
}

::-webkit-file-upload-button {
  font: inherit;
  -webkit-appearance: button;
}

.btn-file {
  position: relative;
  overflow: hidden;
  vertical-align: middle;
}

.thumbnail {
  border: 0 none;
  border-radius: 4px;
  padding: 0;
}

.btn-file > input {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  font-size: 23px;
  cursor: pointer;
  filter: alpha(opacity=0);
  opacity: 0;
  direction: ltr;
}

.fileinput {
  display: inline-block;
  margin-bottom: 9px;
}

.fileinput .thumbnail {
  display: inline-block;
  margin-bottom: 10px;
  overflow: hidden;
  text-align: center;
  vertical-align: middle;
  max-width: 250px;
  box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.42),
    0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}

.fileinput .thumbnail > img {
  max-height: 100%;
  width: 100%;
}

.fileinput .btn {
  vertical-align: middle;
}

.fileinput-exists .fileinput-new,
.fileinput-new .fileinput-exists {
  display: none;
}

.fileinput .thumbnail.img-circle {
  border-radius: 50%;
  max-width: 100px;
}

.fileinput .thumbnail > img {
  max-height: 100%;
  width: 100%;
}

.fileinput .btn {
  vertical-align: middle;
}

.fileinput-exists .fileinput-new,
.fileinput-new .fileinput-exists {
  display: none;
}

.thumbnail {
  border: 0 none;
  border-radius: 4px;
  padding: 0;
}
</style>
