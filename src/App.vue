<template>
  <main id="app">
    <Hero :shows="shows" />
    <Shows :shows="shows" />
  </main>
</template>

<script>
import Shows from "./components/Shows.vue";
import Hero from "./components/Hero.vue";

export default {
  data() {
    return {
      shows: []
    };
  },
  components: {
    Shows,
    Hero
  },
  async created() {
    this.shows = await this.getShows();
  },
  methods: {
    getShows: async () => {
      const query = `{
        showCollection(order: date_DESC, limit: 200) {
          items {
            sys {
              id
            }
            name
            link
            date
            price
            favorite
            upcoming
            multi
            type
            rating
            theater {
              name
              city
            }
            song {
              name
              videoLink
            }
            linkedFrom {
              actorCollection (limit: 5) {
                total
                items {
                  name
                }
              }
            }
          }
        }
      }`;
      const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${process.env.VUE_APP_CONTENTFUL_SPACE_ID}`;
      const fetchOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.VUE_APP_CONTENTFUL_ACCESS_TOKEN}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ query })
      };

      try {
        const response = await fetch(fetchUrl, fetchOptions).then(response =>
          response.json()
        );
        return response.data.showCollection.items;
      } catch (error) {
        throw new Error("Could not receive the data from Contentful!");
      }
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Verdana";
  background-color: $purple;
  color: $black;
}

#app {
  background-color: $purple;
  border: 7px solid $black;
  box-shadow: 10px 10px 0 $black;
  border-radius: 7px 7px 7px 0;
  max-width: 1200px;
  margin: 50px auto;
  @media screen and (max-width: 1200px) {
    margin: 20px;
  }
}

ul {
  margin: 0;
  list-style: none;
  padding: 0;
  li {
    display: inline-block;
  }
}
</style>
