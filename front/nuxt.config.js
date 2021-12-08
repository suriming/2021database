module.exports = {
    head: {
        title: 'NodeBird',
    }, 
    build: {
        vendor: ['socket.io-client']
      },
    modules: [
        '@nuxtjs/axios'
    ],
    buildModules: [
        '@nuxtjs/vuetify',
    ],
    plugins: [
        { src: '~/plugins/socket', mode:'client' }
    ],
    vuetify: {

    },
    // serverMiddleware: [
    //     ~api/index.js
    // ],
    axios: {
        baseURL: 'https://localhost:3000'
    }

};
