<template>
  <div v-if="!!mostRated">
    <md-table v-model="mostRated" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item._id }}</md-table-cell>
        <md-table-cell md-label="Prodct Name">{{ item.title }}</md-table-cell>
        <md-table-cell md-label="Brand">{{ item.brand.name }}</md-table-cell>
        <md-table-cell md-label="Sold Quantity">{{ item.rating.toFixed(2) }}</md-table-cell>
        <md-table-cell md-label="Revenue Generated">${{ item.price }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ordered-table-for-ranks",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
    products: Array
  },
  data() {
    return {
      selected: []
    };
  },
  computed: {
    mostRated() {
      return this.products;
    }
  },
  watch: {
    mostRated: function() {}
  }
};
</script>
