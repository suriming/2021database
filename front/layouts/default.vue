<template>
  <v-app id="inspire">
    <v-app-bar
      app
      shrink-on-scroll>
      <v-spacer></v-spacer>

          <v-toolbar-title color="#3F51B5">
            <nuxt-link to ="/">연세톡</nuxt-link>
          </v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-main class="grey lighten-3">
      <v-spacer></v-spacer>
      <v-container fill-height justify-center>
        <v-row align="center" justify-center>
        <v-col cols="12">
            <v-sheet
            min-height="70vh"
            rounded="lg"
            >
              <nuxt />
            </v-sheet>
        </v-col>
        </v-row>
      </v-container>   
    </v-main> 
  </v-app>
</template>


<script>

  export default {
      head() {
          return {
              title: '연세톡',
          };
      },
    }

</script>

<style>

</style>