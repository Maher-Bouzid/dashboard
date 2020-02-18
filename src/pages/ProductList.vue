<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Product List</h4>
            <p class="category">Here is a a list of all your products</p>
          </md-card-header>
          <md-card-content>
            <div>
              <md-table v-model="products" table-header-color="green" :key="test">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="Image">
                    <img style="max-width: 200px" :src="item.images[0]" />
                  </md-table-cell>
                  <md-table-cell md-label="Title">{{ item.title }}</md-table-cell>
                  <md-table-cell md-label="Specs">{{ item.gender }} - {{ item.category }}</md-table-cell>
                  <md-table-cell md-label="Price">{{ item.price }}</md-table-cell>
                  <md-table-cell md-label="Reviews">{{ item.reviews.length }}</md-table-cell>
                  <md-table-cell md-label="Rating">{{ item.rating }}</md-table-cell>
                  <md-table-cell class="text-center" md-label="Actions">
                    <router-link :to="`/products/${item._id}`">
                      <md-button class="md-success md-just-icon">
                        <md-icon>edit</md-icon>
                      </md-button>
                    </router-link>

                    <md-button class="md-danger md-just-icon" @click="confirmDelete(item._id)">
                      <md-icon>close</md-icon>
                    </md-button>
                    <div id="notifications">
                      <div v-if="deleteNotif[item._id]" class="alert alertTop alert-success">
                        <span> <b>SUCCESS</b> : Are you sure you want to delete this product? </span>
                        <button type="button" aria-hidden="true" class="close" @click="deleteProduct(item._id)">
                          <md-icon style="color: white">check</md-icon>
                        </button>
                        <button type="button" aria-hidden="true" class="close" @click="removeNotify(item._id)">
                          <md-icon style="color: white">clear</md-icon>
                        </button>
                      </div>
                    </div>
                  </md-table-cell>
                </md-table-row>
              </md-table>
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
      test: 0,
      deleteNotif: {},
      selected: [],
      products: []
    };
  },
  methods: {
    confirmDelete(id) {
      console.log(id);
      this.deleteNotif[id] = true;
      this.test++;
      console.log(this.deleteNotif);
      console.log(this.test);
    },
    removeNotify(id) {
      this.deleteNotif[id] = false;
    },
    getSpanClass(quantity) {
      if (quantity > 0) {
        return "badge badge-pill badge-success";
      } else {
        return "badge badge-pill badge-warning";
      }
    },
    deleteProduct(id) {
      this.deleteNotif[id] = false;
      axios
        .delete(`https://prodigy-rbk.herokuapp.com/api/products/${id}`)
        .then(({ data }) =>
          this.products.forEach((element, index) => {
            if (element._id === data._id) {
              this.products.splice(index, 1);
            }
          })
        )
        .catch();
    }
  },
  async beforeMount() {
    let { data } = await axios.get(
      `https://prodigy-rbk.herokuapp.com/api/brand/one`
    );
    this.products = data.products;
  }
};
</script>
