<template>  
<v-card
    class="mx-auto"
    max-width="500"
  >
  
  <v-container>
    <v-card
    elevation="1"
    outlined
    shaped
    >
  <v-img :src="require('./1.jpg')"
      height="300px"
    ></v-img>
  <v-card-title>
      <v-btn color="primary" rounded @click.prevent="searchLocationEng">공학관</v-btn>
    </v-card-title>

    </v-card>

     <v-card
    elevation="1"
    outlined
    shaped
    >

  <v-img :src="require('./2.jpg')"
      height="300px"
    ></v-img>
      <v-card-title>
      <nuxt-link to="./friendpage">백양관</nuxt-link>
    </v-card-title>
    </v-card>

 <v-card
    elevation="1"
    outlined
    shaped
    >
  
  <v-img :src="require('./3.png')"
      height="300px"
    ></v-img>
  <v-card-title>
      <nuxt-link to="./friendpage">학생회관</nuxt-link>
    </v-card-title>
    </v-card>


     <v-card
    elevation="1"
    outlined
    shaped
    >

  <v-img :src="require('./4.jpg')"
      height="300px"
    ></v-img>
       <v-card-title>
      <nuxt-link to="./friendpage">신촌역</nuxt-link>
    </v-card-title>
    </v-card>


    <bottom-nav />
  </v-container>

  </v-card>
</template>

<script>
import BottomNav from '../components/BottomNav.vue';
  export default {
    components: {
        BottomNav,
    },
    computed:{
      me() {
        return this.$store.state.users.me;
      },
      isLoggedIn(){
        return this.$store.state.users.isLoggedIn;
      }    
    },
    methods: {
      searchLocationEng() {
        this.$store.dispatch('users/searchLocationEng', {
          id: this.$store.state.users.me.id,
          this_ssid: 'D101_wifi'
        })
      }
    }
  }

</script>