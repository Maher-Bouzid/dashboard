<template>
  <div class="content">
    <div class="md-layout">
      <div class="md-layout-item md-medium-size-100 md-xsmall-size-100 md-size-100">
        <md-card>
          <md-card-header data-background-color="green">
            <h4 class="title">Simple Table</h4>
            <p class="category">Here is a subtitle for this table</p>
          </md-card-header>
          <md-card-content>
            <div>
              <md-table v-model="brands" table-header-color="green">
                <md-table-row slot="md-table-row" slot-scope="{ item }">
                  <md-table-cell md-label="Brand">{{ item.name }}</md-table-cell>
                  <md-table-cell md-label="Since">
                    <span>{{ item.creationDate | moment("MMMM Do, YYYY") }}</span>
                  </md-table-cell>
                  <md-table-cell md-label="Products">{{ item.products.length }}</md-table-cell>
                  <md-table-cell md-label="Salary">{{ item.salary }}</md-table-cell>
                  <md-table-cell class="text-center" md-label="Actions">
                    <md-button class="md-info md-just-icon">
                      <md-icon>person</md-icon>
                    </md-button>
                    <md-button class="md-success md-just-icon">
                      <md-icon>edit</md-icon>
                    </md-button>
                    <md-button class="md-danger md-just-icon">
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
  name: "brands",
  data() {
    return {
      selected: [],
      brands: []
    };
  },
  async beforeMount() {
    let { data } = await axios.get(
      " https://prodigy-rbk.herokuapp.com/api/brand"
    );
    this.brands = data;
  }
};
</script>
