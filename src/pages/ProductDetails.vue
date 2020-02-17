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
                    <md-field v-if="color === 'new'">
                      <label>Choose the color</label>
                      <md-input v-model="newColor" type="text"></md-input>
                      <md-button @click="confirmColorName">submit</md-button>
                    </md-field>
                    <h1 v-else class="md-title">
                      <b>{{ color }}</b>
                    </h1>
                    <md-button type="button" class="md-success md-round" @click="AddItem(color)">Add variant</md-button>
                  </md-table-toolbar>

                  <md-table-row style="margin-left:20px">
                    <md-table-head style="padding-left:20px">Size</md-table-head>
                    <md-table-head>Quantity</md-table-head>
                    <md-table-head>Status</md-table-head>
                    <md-table-head>Actions</md-table-head>
                  </md-table-row>

                  <md-table-row v-for="(value, index) in Object.values(colors[color])" :key="index">
                    <md-table-cell v-if="!(value[0] === 'size')" style="padding-left:30px">{{ value[0] }}</md-table-cell>
                    <md-table-cell v-else style="padding-left:30px">
                      <md-field>
                        <label>Choose the Size</label>
                        <md-input v-model="newSize" type="text"></md-input>
                      </md-field>
                    </md-table-cell>
                    <md-table-cell v-if="!(value[0] === 'size')">{{ value[1] }}</md-table-cell>
                    <md-table-cell v-else>
                      <md-field>
                        <label>Choose the Size</label>
                        <md-input v-model="newQte" type="number"></md-input>
                      </md-field>
                    </md-table-cell>
                    <md-table-cell
                      ><span :class="getSpanClass(value[1])">{{ value[1] ? "In Stock" : "Out of Stock" }}</span></md-table-cell
                    >
                    <md-table-cell v-if="value[0] === 'size'">
                      <md-button @click="confirmItem(color, index)">submit</md-button>
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
          <div class="md-layout-item md-size-50 text-right">
            <md-button class="md-round md-success" @click="updateProduct">Update Product</md-button>
          </div>
        </md-card>
        <md-button type="button" class="md-success md-round" @click="addColor">Add new color</md-button>
        <md-button v-if="hasChanged" type="button" class="md-success md-round" @click="saveChanges">Save Changes</md-button>
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <md-card class="md-card-profile">
          <div class="md-card-raised" style="padding: 20px">
            <img class="img" :src="product.images[0]" />
          </div>

          <md-card-content>
            <h6 class="category text-gray">{{ product.gender }} - {{ product.category }}</h6>
            <div style="display: flex; place-items: center; place-content: center;">
              <h4 v-if="!editMode" class="card-title" style="line-height: 40px; margin-right: 10px">
                {{ product.title }}
              </h4>
              <div v-else class="md-layout-item md-small-size-100 md-size-50">
                <md-field>
                  <label>Product title</label>
                  <md-input v-model="product.title" type="text"></md-input>
                </md-field>
              </div>
              <md-button @click="activateEdit" v-if="!editMode" class="md-info md-just-icon" style="height: 20px; min-width: 20px; width: 20px;">
                <md-icon style="font-size: 11px !important">edit</md-icon>
              </md-button>
              <md-button @click="doneEdit" v-else class="md-success md-just-icon" style="height: 20px; min-width: 20px; width: 20px;">
                <md-icon style="font-size: 11px !important">done</md-icon>
              </md-button>
            </div>
            <p v-if="!editMode" class="card-description">
              {{ product.description }}
            </p>
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
                    <label>Price </label>
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
      hasChanged: false
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
      console.log(this.colors[color]);
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
      console.log(this.colors);
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
    },
    removeOne(color, index) {
      this.colors[color][index][1] = --this.colors[color][index][1];
      this.test++;
    },
    removeAll(color, index) {
      this.colors[color].splice(index, 1);
      this.test++;
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
        console.log(this.product);
      });
    },
    updateProduct() {
      Object.values(this.colors).forEach(async color => {
        await color.forEach(async availability => {
          await axios.put(`http://localhost:3000/api/products/${this.productId}/availability`, availability);
        });
      });
    }
  },
  async beforeMount() {
    let productId = window.location.pathname.slice(10);
    console.log(productId);
    let { data } = await axios.get(`http://localhost:3000/api/products/${productId}`);
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

<style lang="scss">
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
</style>
