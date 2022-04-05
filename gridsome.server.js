// Server API makes it possible to hook into various parts of Gridsome
// on server-side and add custom data to the GraphQL data layer.
// Learn more: https://gridsome.org/docs/server-api/

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`
const axios = require('axios');

module.exports = function (api) {
  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          allowlist: [/^vuetify/]
        })
      ])
    }
  })


  api.loadSource(async (actions) => {
    const { data:{data} } = await axios.get("http://localhost:1337/api/events?populate=*");
    const collection = actions.addCollection({
      typeName: "Event",
      path:'/events/:id'
    });
    for (const event of data) {
      collection.addNode({
        id: event.id,
        path:`/events/${event.id}`,
        title: event.attributes.title,
        description: event.attributes.description,
        price: event.attributes.price,
        date: event.attributes.date,
        duration: event.attributes.duration,
        image: event.attributes.image.data.attributes.url,
        category: event.attributes.categories.data[0].id,
      });
    }
  });
  api.createPages(({ createPage }) => {
    // Use the Pages API here: https://gridsome.org/docs/pages-api/
  });
}
