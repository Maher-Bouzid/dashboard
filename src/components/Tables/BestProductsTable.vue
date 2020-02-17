<template>
  <div>
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
    return {
      selected: []
      // users: [
      //   {
      //     id: 1,
      //     name: "Dakota Rice",
      //     salary: "$36,738",
      //     country: "Niger",
      //     city: "Oud-Turnhout"
      //   },
      //   {
      //     id: 2,
      //     name: "Minerva Hooper",
      //     salary: "$23,738",
      //     country: "Curaçao",
      //     city: "Sinaai-Waas"
      //   },
      //   {
      //     id: 3,
      //     name: "Sage Rodriguez",
      //     salary: "$56,142",
      //     country: "Netherlands",
      //     city: "Overland Park"
      //   },
      //   {
      //     id: 4,
      //     name: "Philip Chaney",
      //     salary: "$38,735",
      //     country: "Korea, South",
      //     city: "Gloucester"
      //   }
      // ]
    };
  }
};
</script>
