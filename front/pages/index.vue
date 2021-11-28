<template>
    <div>
        <v-container v-if = "!me">
            <NuxtLink to = "/login">
            로그인
            </NuxtLink>
        </v-container> 
        <v-container v-else>
            <main />
        </v-container>
    </div>
</template>

<script>


export default {
    data() {
        return {
            name: 'Nuxt.js',
        };
    }, 
    computed: {
      me() {
        return this.$store.state.users.me;
      },    
    },
}; 
</script>

<style>

</style>