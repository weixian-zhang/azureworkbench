<template>
  <v-app id="App">
    <v-toolbar :flat="true" dark>
      <v-toolbar-title>Azure Workbench</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn flat to="/designer">
            Designer
      </v-btn>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <!--subscription -->
        <v-select
          :items="subscriptions"
          v-model="subscriptionSelected"
          item-text="displayName"
          item-value="subscriptionId"
          @change="onSubscriptionChange"
          label="Subscription"
          single-line
          return-object
        ></v-select>

        <v-select
          :items="resourceGroups"
          v-model="resourceGroupSelected"
          item-text="name"
          item-value="name"
          @change="onRGChange"
          label="Resource Group"
          single-line
        ></v-select>
        
        <v-menu>
              <v-btn flat>
                  Dropdown
              </v-btn>
              <v-list>
                <v-list-tile>
                  <v-list-tile-title>Signout</v-list-tile-title>
                </v-list-tile>
              </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>

    <v-container fluid class="pa-0 ma-0">
      <router-view />
    </v-container>

  </v-app>
</template>

<script>

    import { Urls } from './models/urls';
    import { store } from './helpers/store'
    import {ProvisionContext} from './models/provision-context'

    export default {

      components: {
      },

        data () {
          return {
            subscriptionSelected: null,
            subscriptions:[],
            resourceGroups: [],
            resourceGroupSelected: null,
            provisionContext: null
          }
      },

      mounted() {
          var urls = new Urls();

          this.provisionContext= new ProvisionContext();
          this.$store.commit('updateProvisionContext', this.provisionContext)

          //get subscriptions
          axios({
            method: 'get',
            url: '/arm/scrp',
            data: {
              
            },
            validateStatus: (status) => {
              return true; // I'm always returning true, you may want to do it depending on the status received
            },
            }).catch(error => {
                console.log(error.message);
            }).then(response => {
                this.subscriptions = response.data;
            });

          //get resource groups
          axios({
            method: 'get',
            url: '/arm/rg',
            data: {
              
            },
            validateStatus: (status) => {
              return true; // I'm always returning true, you may want to do it depending on the status received
            },
            }).catch(error => {
                console.log(error.message);
            }).then(response => {
                this.resourceGroups = response.data;
            });

      },

      methods: {
        signout: function(){
            axios({
              method: 'get',
              url: '/account/signout',

              validateStatus: (status) => {
                return true; // I'm always returning true, you may want to do it depending on the status received
              },
              }).catch(error => {
                  console.log(error.message);
              }).then(response => {
                  
              });
        },

        onSubscriptionChange: function(subscription) {
          this.provisionContext.subscriptionId = subscription.subscriptionId;
          this.provisionContext.subscriptionName = subscription.subscriptionName
          this.$store.commit('updateProvisionContext', this.provisionContext)
        },

        onRGChange: function(rgName) {
          this.provisionContext.resourceGroupName = rgName;
          this.$store.commit('updateProvisionContext', this.provisionContext)
        }
      }
    }

</script>

<style>
</style>
