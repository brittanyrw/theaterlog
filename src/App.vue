<template>
  <main id="main">
    <HeroSection :shows="shows" :actors="actors" :theaters="theaters" />
    <ShowList :shows="shows" />
  </main>
</template>

<script>
import { ref, onMounted } from 'vue';
import ShowList from './components/ShowList.vue';
import HeroSection from './components/HeroSection.vue';

export default {
  components: {
    ShowList,
    HeroSection,
  },
  setup() {
    const shows = ref([]);
    const actors = ref([]);
    const theaters = ref([]);

    const getShows = async () => {
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
            seatLevel
            seatArea
            seatSection
            icon
            theater {
              name
              city
            }
            song {
              name
              videoLink
            }
          }
        }
        actorCollection(limit: 500, order: name_ASC) {
          items {
            name
            theaterShowCollection(limit: 5) {
              total
              items {
                name
              }
            }
          }
        }
        theaterCollection {
          items {
            name
            city
            broadway
            westEnd
          }
        }
      }`;

      const fetchUrl = `https://graphql.contentful.com/content/v1/spaces/${import.meta.env.VITE_CONTENTFUL_SPACE_ID}`;
      const fetchOptions = {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query }),
      };

      try {
        const response = await fetch(fetchUrl, fetchOptions);
        const data = await response.json();
        return data.data;
      } catch (error) {
        throw new Error('Could not receive the data from Contentful!');
      }
    };

    onMounted(async () => {
      let data = await getShows();
      shows.value = data.showCollection.items;
      actors.value = data.actorCollection.items;
      theaters.value = data.theaterCollection.items;
    });

    return {
      shows,
      actors,
      theaters,
    };
  },
};
</script>

<style>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: "Verdana";
  background-color: var(--purple);
  color: var(--black);
}

#main {
  background-color: var(--purple);
  border: 7px solid var(--black);
  box-shadow: 10px 10px 0 var(--black);
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
