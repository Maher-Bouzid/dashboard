<template>
  <div
    class="subscribe-line subscribe-line-image"
    data-parallax="true"
    :style="{
      'background-image': `url(${require('../assets/img/ecommerce-header.jpg')})`
    }"
  >
    <div class="container">
      <div class="row">
        <div class="col-md-6 ml-auto mr-auto">
          <div class="text-center">
            <h3 class="title">Subscribe to our Newsletter</h3>

            <p class="description">Join our newsletter and get news in your inbox every week! We hate spam too, so no worries about this.</p>
          </div>
          <div class="card card-raised card-form-horizontal">
            <div class="card-body">
              <form method action>
                <div class="row">
                  <div class="col-sm-8">
                    <div class="input-group">
                      <div class="input-group-prepend">
                        <span class="input-group-text">
                          <i class="material-icons">mail</i>
                        </span>
                      </div>
                      <input type="text" class="form-control" placeholder="Your Email..." />
                    </div>
                  </div>
                  <div class="col-sm-4">
                    <md-button class="md-rose md-block">Subscribe</md-button>
                  </div>
                </div>
              </form>
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
