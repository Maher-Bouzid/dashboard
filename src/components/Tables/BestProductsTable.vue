<template>
  <div v-if="!!products">
    <md-table v-model="products" :table-header-color="tableHeaderColor">
      <md-table-row slot="md-table-row" slot-scope="{ item }">
        <md-table-cell md-label="ID">{{ item._id._id }}</md-table-cell>
        <md-table-cell md-label="Name">{{ item._id.title }}</md-table-cell>
        <md-table-cell md-label="Sold Quantity">{{ item.qte }}</md-table-cell>
        <md-table-cell md-label="	
Revenue Generated">$ {{ item.amount }}</md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  name: "best-products-table",
  props: {
    tableHeaderColor: {
      type: String,
      default: ""
    },
    products: Array
  },
  data() {
    return {};
  }
};
</script>
