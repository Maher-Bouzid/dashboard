<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-size-66">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Product Details</h4>
            <p class="category">Availability details for your product</p>
          </md-card-header>

          <md-card-content>
            <div v-for="(color, indexs) in Object.keys(colors)" :key="indexs">
              <div>
                <md-table md-card>
                  <md-table-toolbar>
                    <h1 class="md-title">
                      <b>{{ color }}</b>
                    </h1>
                  </md-table-toolbar>

                  <md-table-row style="margin-left:20px">
                    <md-table-head style="padding-left:20px">Size</md-table-head>
                    <md-table-head>Quantity</md-table-head>
                    <md-table-head>Status</md-table-head>
                    <md-table-head>Actions</md-table-head>
                  </md-table-row>

                  <md-table-row v-for="(value, index) in Object.values(colors[color])" :key="index">
                    <md-table-cell style="padding-left:30px">{{ value.size }}</md-table-cell>
                    <md-table-cell>{{ value.quantity }}</md-table-cell>
                    <md-table-cell>
                      <span
                        :class="getSpanClass(value.quantity)"
                      >{{ value.quantity ? "In Stock" : "Out of Stock" }}</span>
                    </md-table-cell>
                    <md-table-cell>
                      <md-button
                        class="md-success md-just-icon md-small-size"
                        style="height: 30px; min-width: 31px; width: 30px;"
                        @click="increaseQuantity(color, index)"
                      >
                        <md-icon style="font-size: 15px">add</md-icon>
                      </md-button>
                      <md-button
                        class="md-warning md-just-icon md-small-size"
                        style="height: 30px; min-width: 31px; width: 30px;"
                        @click="decreaseQuantity(color, index)"
                      >
                        <md-icon style="font-size: 15px">remove</md-icon>
                      </md-button>
                      <md-button
                        class="md-danger md-just-icon md-small-size"
                        style="height: 30px; min-width: 31px; width: 30px;"
                        @click="removeQuantity(color, index)"
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
      </div>
      <div class="md-layout-item md-medium-size-100 md-size-33">
        <md-card class="md-card-profile">
          <div class="md-card-raised" style="padding: 20px">
            <img class="img" :src="product.images[0]" />
          </div>

          <md-card-content>
            <h6 class="category text-gray">{{ product.gender }} - {{ product.category }}</h6>
            <h4 class="card-title">{{ product.title }}</h4>
            <p class="card-description">{{ product.description }}</p>
            <div class="card-footer">
              <div class="md-layout">
                <div class="md-layout-item md-size-33">
                  <p>{{ product.rating }} Stars</p>
                </div>
                <div class="md-layout-item md-size-33">
                  <p>{{ product.reviews.length }} Reviews</p>
                </div>
                <div class="md-layout-item md-size-33">
                  <p>{{ product.price }} USD</p>
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
      product: null,
      productId: String,
      colors: {}
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
    increaseQuantity(color, index) {
      this.colors[color][index].quantity += 1;
    },
    decreaseQuantity(color, index) {
      this.colors[color][index].quantity -= 1;
    },
    removeQuantity(color, index) {
      this.colors[color][index].quantity = 0;
    },
    updateProduct() {
      Object.values(this.colors).forEach(async color => {
        await color.forEach(async availability => {
          await axios.put(
            `http://localhost:3000/api/products/${this.productId}/availability`,
            availability
          );
        });
      });
    }
  },
  async beforeMount() {
    this.productId = window.location.pathname.slice(10);
    let { data } = await axios.get(
      `http://localhost:3000/api/products/${this.productId}`
    );

    data.availability.map(elem => {
      !!this.colors[elem.color]
        ? this.colors[elem.color].push(elem)
        : (this.colors[elem.color] = [elem]);
    });
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
