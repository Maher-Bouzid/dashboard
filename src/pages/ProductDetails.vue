<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Product Details</h4>
            <p class="category">Availability details for your product</p>
          </md-card-header>

          <md-card-content :key="test">
            <div v-for="(color, index) in Object.keys(colors)" :key="index">
              <div>
                <md-table md-card :key="test2">
                  <md-table-toolbar>
                    <div class="md-layout">
                      <div class="md-layout-item md-small-size-100 md-size-80">
                        <div class="md-autocomplete" v-if="color === 'new'">
                          <md-autocomplete
                            class="search"
                            v-model="newColor"
                            :md-options="$store.state.HTMLColors"
                            :md-open-on-focus="false"
                          >
                            <label>Choose the color...</label>
                          </md-autocomplete>
                        </div>
                        <h1 v-else class="md-title">
                          <b>{{ color }}</b>
                        </h1>
                      </div>
                      <div
                        class="md-layout-item md-small-size-100 md-size-20"
                        style="text-align: center"
                      >
                        <md-button
                          v-if="color === 'new'"
                          class="md-success md-round"
                          @click="confirmColorName"
                        >submit</md-button>
                        <md-button
                          v-else
                          type="button"
                          class="md-info md-round"
                          @click="AddItem(color)"
                        >Add variant</md-button>
                      </div>
                    </div>
                  </md-table-toolbar>

                  <md-table-row style="margin-left:20px">
                    <md-table-head style="padding-left:20px">Size</md-table-head>
                    <md-table-head>Quantity</md-table-head>
                    <md-table-head>Status</md-table-head>
                    <md-table-head>Actions</md-table-head>
                  </md-table-row>

                  <md-table-row v-for="(value, index) in Object.values(colors[color])" :key="index">
                    <md-table-cell
                      v-if="!(value[0] === 'size')"
                      style="padding-left:30px"
                    >{{ value[0] }}</md-table-cell>
                    <md-table-cell v-else style="padding-left:30px">
                      <div>
                        <md-menu md-size="big" class="big" md-align-trigger>
                          <md-button md-menu-trigger id="big">
                            <span
                              :style="[activeSize ? { color: 'black' } : { color: '#AAAAAA' }]"
                            >{{ newSize }}</span>
                            <md-icon>keyboard_arrow_down</md-icon>
                          </md-button>
                          <md-menu-content>
                            <md-menu-item
                              v-for="selectedSize in $store.state.sizes"
                              @click="
                            activeSize = true;
                            newSize = selectedSize;
                          "
                              :key="selectedSize"
                            >{{ selectedSize }}</md-menu-item>
                          </md-menu-content>
                        </md-menu>
                      </div>

                      <!-- <md-field>
                        <label>Choose the Size</label>
                        <md-input v-model="newSize" type="text"></md-input>
                      </md-field>-->
                    </md-table-cell>
                    <md-table-cell v-if="!(value[0] === 'size')">{{ value[1] }}</md-table-cell>
                    <md-table-cell v-else>
                      <md-field>
                        <label>Choose the Quantity</label>
                        <md-input v-model="newQte" type="number"></md-input>
                      </md-field>
                    </md-table-cell>
                    <md-table-cell>
                      <span
                        :class="getSpanClass(value[1])"
                      >{{ value[1] ? "In Stock" : "Out of Stock" }}</span>
                    </md-table-cell>
                    <md-table-cell v-if="value[0] === 'size'">
                      <md-button class="md-success md-round" @click="confirmItem(color, index)">
                        <md-icon>check</md-icon>
                      </md-button>
                    </md-table-cell>
                    <md-table-cell v-else>
                      <md-button
                        @click="addOne(color, index)"
                        class="md-success md-just-icon md-small-size"
                        style="height: 30px; min-width: 31px; width: 30px;"
                      >
                        <md-icon style="font-size: 15px">add</md-icon>
                      </md-button>
                      <md-button
                        @click="removeOne(color, index)"
                        class="md-warning md-just-icon md-small-size"
                        style="height: 30px; min-width: 31px; width: 30px;"
                      >
                        <md-icon style="font-size: 15px">remove</md-icon>
                      </md-button>
                      <md-button
                        @click="removeAll(color, index)"
                        class="md-danger md-just-icon md-small-size"
                        style="height: 30px; min-width: 31px; width: 30px;"
                      >
                        <md-icon class="md-size-2x">close</md-icon>
                      </md-button>
                    </md-table-cell>
                  </md-table-row>
                </md-table>
              </div>
            </div>
          </md-card-content>
        </md-card>
        <div style="display: flex; justify-content: space-between">
          <md-button type="button" class="md-primary md-round" @click="addColor">Add new color</md-button>
          <md-button
            v-if="hasChanged"
            type="button"
            class="md-success md-round"
            @click="saveChanges"
          >Save Changes</md-button>
        </div>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <md-card class="md-card-profile">
          <div class="md-card-raised" style="padding: 20px">
            <img class="img" :src="product.images[0]" />
          </div>

          <md-card-content>
            <h6 class="category text-gray">{{ product.gender }} - {{ product.category }}</h6>
            <div style="display: flex; place-items: center; place-content: center;">
              <h4
                v-if="!editMode"
                class="card-title"
                style="line-height: 40px; margin-right: 10px"
              >{{ product.title }}</h4>
              <div v-else class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Product title</label>
                  <md-input v-model="product.title" type="text"></md-input>
                </md-field>
              </div>
              <md-button
                @click="activateEdit"
                v-if="!editMode"
                class="md-info md-just-icon"
                style="height: 20px; min-width: 20px; width: 20px;"
              >
                <md-icon style="font-size: 11px !important">edit</md-icon>
              </md-button>
              <md-button
                @click="doneEdit"
                v-else
                class="md-success md-just-icon"
                style="height: 20px; min-width: 20px; width: 20px;"
              >
                <md-icon style="font-size: 11px !important">done</md-icon>
              </md-button>
            </div>
            <p v-if="!editMode" class="card-description">{{ product.description }}</p>
            <div v-else class="md-layout-item md-small-size-100 md-size-100">
              <md-field maxlength="5">
                <label>Product description</label>
                <md-textarea v-model="product.description"></md-textarea>
              </md-field>
            </div>
            <div class="card-footer">
              <div class="md-layout">
                <div class="md-layout-item md-size-33">
                  <p>{{ product.rating }} Stars</p>
                </div>
                <div class="md-layout-item md-size-33">
                  <p>{{ product.reviews.length }} Reviews</p>
                </div>
                <div v-if="!editMode" class="md-layout-item md-size-33">
                  <p>{{ product.price }} USD</p>
                </div>
                <div v-else class="md-layout-item md-size-33">
                  <md-field>
                    <label>Price</label>
                    <md-input v-model="product.price" type="number"></md-input>
                  </md-field>
                </div>
              </div>
            </div>
          </md-card-content>
        </md-card>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      editMode: false,
      product: null,
      colors: {},
      test: 0,
      test2: 0,
      newColor: "",
      newQte: 0,
      newSize: "",
      hasChanged: false,
      activeSize: false
    };
  },
  methods: {
    getSpanClass(quantity) {
      if (quantity > 0) {
        return "badge badge-pill badge-success";
      } else {
        return "badge badge-pill badge-warning";
      }
    },
    activateEdit() {
      this.editMode = true;
    },
    doneEdit() {
      this.editMode = false;
      this.hasChanged = true;
    },
    AddItem(color) {
      this.colors[color].push(["size", "qte"]);
      this.test2++;
      this.hasChanged = true;
    },
    confirmItem(color, index) {
      this.colors[color][index] = [this.newSize, this.newQte];
      this.newSize = "";
      this.newQte = 0;
    },
    addColor() {
      this.colors["new"] = {};
      this.test++;
    },
    confirmColorName() {
      this.colors[this.newColor] = [];
      delete this.colors["new"];
      this.newColor = "";
      this.hasChanged = true;
    },
    addOne(color, index) {
      this.colors[color][index][1] = ++this.colors[color][index][1];
      this.test++;
      this.hasChanged = true;
    },
    removeOne(color, index) {
      this.colors[color][index][1] = --this.colors[color][index][1];
      this.test++;
      this.hasChanged = true;
    },
    removeAll(color, index) {
      this.colors[color].splice(index, 1);
      this.test++;
      this.hasChanged = true;
    },
    saveChanges() {
      var tmp = [];
      Object.keys(this.colors).forEach(color => {
        this.colors[color].forEach(variant => {
          tmp.push({
            color: color,
            size: variant[0],
            quantity: variant[1]
          });
        });
        this.product.availability = tmp;
      });
      let productId = window.location.pathname.slice(10);
      axios
        .put(`http://localhost:3000/api/products/${productId}`, this.product)
        .then(({ data }) => console.log(data))
        .catch(err => console.log(err));
    }
  },
  async beforeMount() {
    let productId = window.location.pathname.slice(10);
    let { data } = await axios.get(
      `http://localhost:3000/api/products/${productId}`
    );
    data.availability.map(elem => {
      console.log(elem);
      if (Array.isArray(this.colors[elem.color])) {
        this.colors[elem.color].push([elem.size, elem.quantity]);
      } else {
        this.colors[elem.color] = [[elem.size, elem.quantity]];
      }
    });
    console.log(this.colors);
    this.product = data;
  }
};
</script>

<style lang="scss" scoped>
.badge {
  display: inline-block;
  border-radius: 12px;
  padding: 5px 12px;
  text-transform: uppercase;
  font-size: 10px;
  color: #ffffff;
  font-weight: 500;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;

  &:not(:last-child) {
    margin-right: 5px;
  }
}

.badge-success[href]:hover,
.badge-success[href]:focus {
  background-color: darken(#5cb85c, 5%);
}

.badge-warning[href]:hover,
.badge-warning[href]:focus {
  background-color: darken(#f0ad4e, 5%);
  color: #ffffff;
}

.badge-danger[href]:hover,
.badge-danger[href]:focus {
  background-color: darken(#d9534f, 5%);
}

.badge-success {
  background-color: #5cb85c;
}
.badge-warning {
  background-color: #f0ad4e;
}
.badge-danger {
  background-color: #d9534f;
}

::v-deep .md-list-item-content > .md-icon:last-child {
  margin-left: 0px;
}

::v-deep .md-error {
  transform: translate3d(0, -8px, 0) !important;
}
::v-deep #price .md-field {
  margin: -8px;
}

::v-deep #qte .md-field {
  margin: -8px;
}

::v-deep #color .md-field {
  margin: -8px;
}

::v-deep #tags div {
  justify-content: flex-start !important;
}
.big {
  width: 100% !important;
}
#big {
  width: 100% !important;
  background-color: transparent !important;
  border: none !important;
  color: black;
  -webkit-box-shadow: none;
  box-shadow: none;
  border-bottom: 1px purple solid !important;
  text-transform: none;
}

::v-deep #big .md-button-content {
  width: 100%;
  color: black;
  display: flex;
  justify-content: space-between;
  margin-left: 0px;
}
::v-deep #big .md-ripple {
  padding: 12px 0px;
}

#big .md-button-content .md-icon {
  color: black !important;
  margin: 0px;
}
#big .md-ripple {
  padding: 12px 5px;
}

#big span {
  font-size: 1.2em;
}

.pick-size {
  margin-bottom: 20px;
}

.errorspan {
  color: red;
  font-size: 0.9em;
}
::v-deep .btn {
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
::v-deep .btn:not(:disabled):not(.disabled) {
  cursor: pointer;
}
::v-deep .btn-link {
  font-weight: 400;
  color: #9c27b0;
  background-color: transparent;
}
::v-deep .btn-lg,
::v-deep .btn-group-lg > .btn {
  padding: 1.125rem 2.25rem;
  font-size: 1.25rem;
  line-height: 1.5;
  border-radius: 0.3rem;
}
::v-deep .btn {
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
::v-deep .btn.btn-rose {
  color: #fff;
  background-color: #e91e63;
  border-color: #e91e63;
  box-shadow: 0 2px 2px 0 rgba(233, 30, 99, 0.14),
    0 3px 1px -2px rgba(233, 30, 99, 0.2), 0 1px 5px 0 rgba(233, 30, 99, 0.12);
}
::v-deep .btn.btn-rose.btn-link {
  background-color: transparent;
  color: #e91e63;
  box-shadow: none;
}
::v-deep .btn.btn-danger {
  color: #fff;
  background-color: #f44336;
  border-color: #f44336;
  box-shadow: 0 2px 2px 0 rgba(244, 67, 54, 0.14),
    0 3px 1px -2px rgba(244, 67, 54, 0.2), 0 1px 5px 0 rgba(244, 67, 54, 0.12);
}
::v-deep .btn,
::v-deep .btn.btn-default {
  color: #fff;
  background-color: #999999;
  border-color: #999999;
  box-shadow: 0 2px 2px 0 rgba(153, 153, 153, 0.14),
    0 3px 1px -2px rgba(153, 153, 153, 0.2),
    0 1px 5px 0 rgba(153, 153, 153, 0.12);
}
::v-deep .btn.btn-link,
::v-deep .btn.btn-default.btn-link {
  background-color: transparent;
  color: #999999;
  box-shadow: none;
}
::v-deep .btn.btn-white,
::v-deep .btn.btn-white:focus,
::v-deep .btn.btn-white:hover {
  background-color: #fff;
  color: #999999;
}
::v-deep .btn.btn-white.btn-link {
  color: #fff;
  background: transparent;
  box-shadow: none;
}
::v-deep .btn.btn-lg,
::v-deep .btn-group-lg > .btn,
::v-deep .btn-group-lg .btn {
  padding: 1.125rem 2.25rem;
  font-size: 0.875rem;
  line-height: 1.333333;
  border-radius: 0.2rem;
}
::v-deep .btn.btn-sm,
::v-deep .btn-group-sm > .btn,
::v-deep .btn-group-sm .btn {
  padding: 0.40625rem 1.25rem;
  font-size: 0.6875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}
::v-deep .btn.btn-round {
  border-radius: 30px;
}
::v-deep .btn.btn-fab,
::v-deep .btn.btn-just-icon {
  font-size: 24px;
  height: 41px;
  min-width: 41px;
  width: 41px;
  padding: 0;
  overflow: hidden;
  position: relative;
  line-height: 41px;
}
::v-deep .btn.btn-fab .material-icons,
::v-deep .btn.btn-fab .fa,
::v-deep .btn.btn-just-icon .material-icons,
::v-deep .btn.btn-just-icon .fa {
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
::v-deep .navbar form .btn {
  margin-bottom: 0;
}
::v-deep .login-page .card-login .social-line .btn {
  margin-left: 5px;
  margin-right: 5px;
}

img {
  vertical-align: middle;
  border-style: none;
}

::-webkit-file-upload-button {
  font: inherit;
  -webkit-appearance: button;
}
::v-deep .btn-file {
  position: relative;
  overflow: hidden;
  vertical-align: middle;
}
::v-deep .thumbnail {
  border: 0 none;
  border-radius: 4px;
  padding: 0;
}

::v-deep .btn-file > input {
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

::v-deep .fileinput {
  display: inline-block;
  margin-bottom: 9px;
}

::v-deep .fileinput .thumbnail {
  display: inline-block;
  margin-bottom: 10px;
  overflow: hidden;
  text-align: center;
  vertical-align: middle;
  max-width: 250px;
  box-shadow: 0 10px 30px -12px rgba(0, 0, 0, 0.42),
    0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2);
}
::v-deep .fileinput .thumbnail > img {
  max-height: 100%;
  width: 100%;
}
::v-deep .fileinput .btn {
  vertical-align: middle;
}
::v-deep .fileinput-exists .fileinput-new,
::v-deep .fileinput-new .fileinput-exists {
  display: none;
}
::v-deep .fileinput .thumbnail.img-circle {
  border-radius: 50%;
  max-width: 100px;
}
::v-deep .fileinput .thumbnail > img {
  max-height: 100%;
  width: 100%;
}
::v-deep .fileinput .btn {
  vertical-align: middle;
}
::v-deep .fileinput-exists .fileinput-new,
::v-deep .fileinput-new .fileinput-exists {
  display: none;
}
::v-deep .thumbnail {
  border: 0 none;
  border-radius: 4px;
  padding: 0;
}
::v-deep .btn.btn-rose {
  color: #fff;
  background-color: #e91e63;
  border-color: #e91e63;
  box-shadow: 0 2px 2px 0 rgba(233, 30, 99, 0.14),
    0 3px 1px -2px rgba(233, 30, 99, 0.2), 0 1px 5px 0 rgba(233, 30, 99, 0.12);
}
::v-deep .btn.btn-rose.btn-link {
  background-color: transparent;
  color: #e91e63;
  box-shadow: none;
}
::v-deep .btn.btn-danger {
  color: #fff;
  background-color: #f44336;
  border-color: #f44336;
  box-shadow: 0 2px 2px 0 rgba(244, 67, 54, 0.14),
    0 3px 1px -2px rgba(244, 67, 54, 0.2), 0 1px 5px 0 rgba(244, 67, 54, 0.12);
}
::v-deep .btn,
::v-deep .btn.btn-default {
  color: #fff;
  background-color: #999999;
  border-color: #999999;
  box-shadow: 0 2px 2px 0 rgba(153, 153, 153, 0.14),
    0 3px 1px -2px rgba(153, 153, 153, 0.2),
    0 1px 5px 0 rgba(153, 153, 153, 0.12);
}
</style>
