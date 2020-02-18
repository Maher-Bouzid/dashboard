<template>
  <div
    class="overlay"
    :style="{
      'background-image': `url(${require('../assets/img/ecommerce-header.jpg')})`,
      height: '80vh'
    }"
  >
    <div class="container layer">
      <div class="row" style="display: flex">
        <div class="col-md-6 ml-auto mr-auto" style="place-self: center">
          <div class="text-center">
            <h3 id="title">Add a Brand</h3>

            <p id="description">Add a brand to your brands community! They will recieve a confirmation email to set up their account</p>
          </div>
          <div id="card" class="card card-raised card-form-horizontal">
            <div class="card-body">
              <div class="md-layout">
                <div class="md-layout-item md-size-10" style="display: flex; justify-content: center; place-self: center">
                  <md-icon>
                    mail
                  </md-icon>
                </div>
                <div class="md-layout-item md-size-60" style="display: flex; justify-content: center; place-self: center">
                  <md-field class="md-form-group">
                    <label for="email">Email...</label>
                    <md-input name="email" id="email" v-model="email" type="email"></md-input>
                  </md-field>
                </div>
                <div class="md-layout-item md-size-30" style="display: flex; justify-content: center; place-self: center">
                  <md-button class="md-info md-block">Add brand</md-button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style>
.layer {
  background-color: rgba(0, 0, 0, 0.66);
  width: 100%;
  height: 100%;
}

#title {
  color: #fff;
  font-weight: 700;
  margin-top: 30px;
  margin-bottom: 25px;
  min-height: 32px;
  font-size: 1.5625rem;
  line-height: 1.4em;
}
#description {
  color: #999;
  font-size: 14px;
  margin: 0 0 10px;
}

#card {
  position: relative;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  border: 0;
  margin-bottom: 30px;
  margin-top: 30px;
  border-radius: 6px;
  color: rgba(0, 0, 0, 0.87);
  background: #fff;
  width: 100%;
  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
</style>
