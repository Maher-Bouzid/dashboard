<template>
  <div v-if="!!bestSales">
    <md-table v-model="bestSales" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item._id._id }}</md-table-cell>
        <md-table-cell md-label="Prodct Name">{{ item._id.title }}</md-table-cell>
        <md-table-cell md-label="Brand">{{ item._id.brand.name }}</md-table-cell>
        <md-table-cell md-label="Sold Quantity">{{ item.qte }}</md-table-cell>
        <md-table-cell md-label="Revenue Generated">${{ item.amount }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "ordered-table",
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
    bestSales() {
      return this.products;
    }
  },
  watch: {
    bestSales: function() {}
  }
};
</script>
