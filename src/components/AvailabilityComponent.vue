<template>
  <div>
    <md-table>
      <md-table-row style="margin-left:20px">
        <md-table-head style="padding-left:20px">Color</md-table-head>
        <md-table-head>Size</md-table-head>
        <md-table-head>Quantity</md-table-head>
        <md-table-head>Remove</md-table-head>
      </md-table-row>

      <md-table-row v-for="(item, index) in availability" :key="index">
        <md-table-cell style="padding-left:30px">
          <input type="text" v-model="item.color" />
        </md-table-cell>
        <md-table-cell>
          <input type="text" v-model="item.size" />
        </md-table-cell>
        <md-table-cell>
          <input type="number" v-model="item.quantity" />
        </md-table-cell>

        <md-table-cell>
          <md-button @click="removeItem" class="md-danger md-just-icon md-small-size" style="height: 30px; min-width: 31px; width: 30px;">
            <md-icon>close</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
      <md-table-row v-for="(item, index) in availability" :key="index">
        <md-table-cell style="padding-left:30px">
          <md-button type="button" class="md-success md-round" @click="AddItem">Add variant</md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      availability: [
        {
          color: "",
          size: "",
          quantity: 0
        }
      ]
    };
  },
  methods: {
    AddItem() {
      this.availability.push({
        name: "",
        quantity: 0,
        amount: 0,
        total: 0
      });
      console.log(this.availability);
    },
    removeItem() {
      this.availability.splice(this.availability, 1);
    }
  }
};
</script>
