module.exports = {
    head: {
        title: 'NodeBird',
    }, 
    modules: [
        '@nuxtjs/axios'
    ],
    buildModules: [
        '@nuxtjs/vuetify',
        '@nuxtjs/moment',
    ],
    moment: {
        locales: ['ko'],
    },
    build: {
      analyze: false,  
    },
    plugins: [
        { src: '~/plugins/myplugin.js', mode: 'client' }
    ],
    vuetify: {

    },
    // serverMiddleware: [
    //     ~api/index.js
    // ],
    axios: {
        // baseURL: 'https://localhost:3000'
        browserBaseURL: process.env.NODE_ENV === 'production' ? 'https://165.132.105.26:8600' : 'http://localhost:3085',
        baseURL: process.env.NODE_ENV === 'production' ? 'https://165.132.105.26:8600' : 'http://localhost:3085',
        https: false,
        // baseURL: `${window.location.protocol}//${window.location.hostname}:${config.apiPort}/api`
    }

};

const path = require('path');

module.exports = {
    outputDir: path.resolve('../back/public')
}