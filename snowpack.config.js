/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
  mount: {
    public: '/',
    src: '/_dist_'
  },
  routes: [
    { match: 'routes', src: '.*', dest: '/index.html' }
  ],
  plugins: [
    '@snowpack/plugin-svelte',
    '@snowpack/plugin-dotenv'
  ]
}
