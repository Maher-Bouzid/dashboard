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
              <md-table v-model="products" table-header-color="green">
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
                      <md-button class="md-info md-just-icon">
                        <md-icon>person</md-icon>
                      </md-button>
                    </router-link>

                    <md-button class="md-danger md-just-icon" @click="deleteProduct(item._id)">
                      <md-icon>close</md-icon>
                    </md-button>
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
      selected: [],
      products: []
    };
  },
  methods: {
    deleteProduct(id) {
      axios
        .delete(`http://127.0.0.1:3000/api/products/${id}`)
        .then(({ data }) =>
          this.products.forEach((element, index) => {
            if (element._id === data._id) {
              this.products.splice(index, 1);
            }
          })
        )
        .catch(err => console.log(err));
    }
  },
  async beforeMount() {
    let { data } = await axios.get(`http://localhost:3000/api/brand/one`);
    this.products = data.products;
  }
};
</script>
