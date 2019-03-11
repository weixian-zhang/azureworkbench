<template id="vmDialog">
    <v-layout row justify-center>
        <v-dialog v-model="openDialog" max-width="600px" max-height="900px" scrollable persistent>
            <v-card flat tile>
                <v-card-title>
                    <span class="headline">Virtual Machine</span>
                </v-card-title>
                <v-card-text>
                    <v-container grid-list-md>
                        <v-layout wrap>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Name" required v-model="vmContext.Name"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-select
                                :items="['0-17', '18-29', '30-54', '54+']"
                                label="Region"
                                required
                                ></v-select>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field
                                label="New VNet Addres"
                                hint="10.0.0.0/16"
                                persistent-hint
                                required
                                v-model="vmContext.NewNetworkAddressSpace"
                                ></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="New Public IP Name" required  v-model="vmContext.NewPrimaryPublicIPName"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Admin Username" required v-model="vmContext.AdminUserName"></v-text-field>
                            </v-flex>
                            <v-flex xs12 sm6 md4>
                                <v-text-field label="Admin Password" required v-model="vmContext.AdminPassword"></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                    <small>*indicates required field</small>
                </v-card-text>
                <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" flat @click="openDialog = false">Close</v-btn>
                <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-layout>
</template>


<script>

    import { store } from '../helpers/store'

    export default {
    
      name: "VMDialog",

      data () {
          return {
              openDialog: false,
              vmContext: null
          }
      },

      mounted: {
          
      },

      methods: {
        openModal: function(vmContext) {
            this.openDialog = true;

            this.vmContext = vmContext;
        },
        save: function(){
           var provisionContext = this.$store.getters.provisionContext;
           provisionContext.resourceIcons.push(this.vmContext);
           this.$store.commit('updateProvisionContext', provisionContext)

           this.openDialog = false;
        }
       }
    }

</script>