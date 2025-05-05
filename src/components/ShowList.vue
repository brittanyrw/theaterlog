<template>
  <div class="shows" id="shows">
    <!-- <div class="theater-stats">
      <h2>
        <font-awesome-icon icon="building" /> Theater Visits
      </h2>
      <div class="theater-groups">
        <div class="theater-group" v-if="broadwayTheaters.length > 0">
          <h3>Broadway</h3>
          <div class="theater-badges">
            <div class="theater-badge" v-for="theater in broadwayTheaters" :key="theater.name">
              <span class="theater-name">{{ theater.name }}</span>
              <span class="theater-count">{{ theater.count }}</span>
            </div>
          </div>
        </div>
        <div class="theater-group" v-if="westEndTheaters.length > 0">
          <h3>West End</h3>
          <div class="theater-badges">
            <div class="theater-badge" v-for="theater in westEndTheaters" :key="theater.name">
              <span class="theater-name">{{ theater.name }}</span>
              <span class="theater-count">{{ theater.count }}</span>
            </div>
          </div>
        </div>
        <div class="theater-group" v-if="otherTheaters.length > 0">
          <h3>Other Theaters</h3>
          <div class="theater-badges">
            <div class="theater-badge" v-for="theater in otherTheaters" :key="theater.name">
              <span class="theater-name">{{ theater.name }}</span>
              <span class="theater-count">{{ theater.count }}</span>
            </div>
          </div>
        </div>
      </div>
    </div> -->
    <div class="filters">
      <div class="filter-container">
        <label for="category-filter">Category:</label>
        <select v-model="selectedCategory" id="category-filter">
          <option value="">All</option>
          <option v-for="category in categories" :key="category" :value="category">{{ category }}</option>
        </select>
      </div>
      <div class="filter-container">
        <label for="year-filter">Year:</label>
        <select v-model="selectedYear" id="year-filter">
          <option value="">All</option>
          <option v-for="year in years" :key="year" :value="year">{{ year }}</option>
        </select>
      </div>
      <div class="filter-container">
        <label for="location-filter">Location:</label>
        <select v-model="selectedLocation" id="location-filter">
          <option value="">All</option>
          <option v-for="location in locations" :key="location" :value="location">{{ location }}</option>
        </select>
      </div>
      <div class="filter-container">
        <label for="review-filter">Review:</label>
        <select v-model="selectedReview" id="review-filter">
          <option value="">All</option>
          <option v-for="review in reviews" :key="review" :value="review">{{ review }}</option>
        </select>
      </div>
      <div class="total">Total: {{ filteredShows.length }}</div>
    </div>
    <p v-if="filteredShows.length === 0" class="no-results">Oops! There are no shows to display.</p>
    <ul class="show-container">
      <li v-for="(show, index) in filteredShows" :key="show.sys.id" class="show" :class="[{ upcoming: show.upcoming }, { 'review-displayed': showReviews[index] }]">
        <div class="show-wrapper">
          <div v-if="show.upcoming == false &&
            (show.favorite || show.rating || show.multi)
            " class="show-opinion">
            <div v-if="show.favorite" class="fav-view">
              <font-awesome-icon icon="star" class="fav-icon" />
            </div>
            <div v-if="show.rating" class="review">
              <img :src="getEmojiUrl(show.rating)" :alt="`Impression of the show is ${show.rating}`" @click="toggleReview(index)" v-if="show.reviewContent"/>
              <img :src="getEmojiUrl(show.rating)" :alt="`Impression of the show is ${show.rating}`" v-else/>
            </div>
            <div v-if="showCount[show.name] > 1" class="multi-view">{{ showCount[show.name] }}</div>
            <p v-if="show.price >= 0" class="show-price">
              ${{ Math.floor(show.price) }}
            </p>
          </div>
          <div class="show-info">
            <p v-if="show.upcoming" class="upcoming-tag">upcoming</p>
            <p class="type">{{ show.type }}</p>
            <div class="show-name">
              <p v-if="show.link">
                <a :href="show.link" class="upcoming-show-link" target="_blank"
                  :title="`Go to website for ${show.name}`">{{ show.name }}</a>
              </p>
              <p v-else>{{ show.name }}</p>
            </div>
            <div class="show-content">
              <p class="show-theater">{{ show.theater.name }}</p>
              <p class="show-location">{{ show.theater.city }}</p>
              <p v-if="show.upcoming" class="show-date">
                {{ formatDate(new Date(show.date)) }}
              </p>
              <p v-else class="show-date">
                {{ formatDate(new Date(show.date), true) }}
              </p>
            </div>
          </div>
          <div v-if="show.song && !show.upcoming" class="favs">
            <p class="fav-song-label">Fav Song</p>
            <div class="fav-song">
              <div class="fav-song-content">
                <p class="song-label">
                  <font-awesome-icon icon="music" class="fs-icon" />
                </p>
                <p class="song-name">
                  <a v-if="show.song.name" :href="show.song.videoLink" target="_blank"
                    :title="`View video for ${show.song.name} from ${show.name}`">
                    {{ show.song.name }}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
        <Transition>
          <div class="show-review-content" v-show="showReviews[index]" v-if="show.reviewContent">
            <div class="review-thoughts">{{ show.reviewContent }}</div>
          </div>
        </Transition>
      </li>
    </ul>
    <div class="icon-attribute">
      Emoji icons made by
      <a href="https://www.flaticon.com/authors/darius-dan" title="Darius Dan" target="_blank">Darius Dan</a>
      from
      <a href="https://www.flaticon.com/" title="Flaticon" target="_blank">www.flaticon.com</a>
      is licensed by
      <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0
        BY</a>
    </div>
  </div>
</template>


<script setup>
import { ref, computed } from 'vue';

const emojiMap = {
  love: new URL('@/assets/love.svg', import.meta.url).href,
  happy: new URL('@/assets/happy.svg', import.meta.url).href,
  meaningful: new URL('@/assets/meaningful.svg', import.meta.url).href,
  funny: new URL('@/assets/funny.svg', import.meta.url).href,
  dislike: new URL('@/assets/dislike.svg', import.meta.url).href,
  sad: new URL('@/assets/sad.svg', import.meta.url).href,
  'happy-sad': new URL('@/assets/happy-sad.svg', import.meta.url).href,
  meh: new URL('@/assets/meh.svg', import.meta.url).href,
  confused: new URL('@/assets/confused.svg', import.meta.url).href
};

const getEmojiUrl = (rating) => {
  return emojiMap[rating] || '';
};

const formatDate = (date, includeDay = false) => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + 1);

  const options = {
    year: 'numeric',
    month: 'long',
    ...(includeDay && { day: '2-digit' })
  };

  return new Intl.DateTimeFormat('en-US', options).format(newDate);
};

const props = defineProps({
  shows: Array,
  theaters: Array
});

const selectedYear = ref('');
const selectedLocation = ref('');
const selectedReview = ref('');
const selectedCategory = ref('');

const cityMapping = {
  'White Plains, NY': 'New York, NY',
  'Columbia, MD': 'Washington, DC',
  'Bethesda, MD': 'Washington, DC',
  'Tysons, VA': 'Washington, DC',
  'Arlington, VA': 'Washington, DC',
};

const mapCity = (city) => {
  return cityMapping[city] || city;
};

const locations = computed(() => {
  const mappedCities = props.shows.map(show => mapCity(show.theater.city));
  return [...new Set(mappedCities)];
});

const years = computed(() => {
  return [...new Set(props.shows.map(show => new Date(show.date).getFullYear()))];
});

const reviews = computed(() => {
  return ['love', 'happy', 'meaningful', 'funny', 'dislike', 'sad', 'happy-sad', 'meh', 'confused'];
});

const categories = computed(() => {
  return ['play', 'musical', 'dance'];
});

const filteredShows = computed(() => {
  return props.shows.filter(show => {
    const showYear = new Date(show.date).getFullYear();
    const matchesYear = selectedYear.value ? showYear === parseInt(selectedYear.value) : true;
    const matchesLocation = selectedLocation.value ? mapCity(show.theater.city) === selectedLocation.value : true;
    const matchesReview = selectedReview.value ? show.rating === selectedReview.value : true;
    const matchesCategory = selectedCategory.value ? show.type === selectedCategory.value : true;

    return matchesYear && matchesLocation && matchesReview && matchesCategory;
  });
});

const showReviews = ref([]);

const showCount = computed(() => {
  return props.shows.reduce((countMap, show) => {
    countMap[show.name] = (countMap[show.name] || 0) + 1;
    return countMap;
  }, {});
});

// Logic for theater stats
const theaterCount = computed(() => {
  const counts = {};
  props.shows.forEach(show => {
    const theaterName = show.theater.name;
    counts[theaterName] = (counts[theaterName] || 0) + 1;
  });
  return counts;
});

// Get the full theater info from theaterCollection
const allTheaters = computed(() => {
  // Create mapping of theater names to their details
  const theaterMap = {};
  if (props.theaters && props.theaters.length > 0) {
    props.theaters.forEach(theater => {
      theaterMap[theater.name] = {
        city: theater.city,
        broadway: theater.broadway,
        westEnd: theater.westEnd
      };
    });
  }
  
  // Create array of theaters with counts
  return Object.entries(theaterCount.value).map(([name, count]) => {
    const theaterInfo = theaterMap[name] || {};
    return {
      name,
      count,
      broadway: theaterInfo.broadway === true,
      westEnd: theaterInfo.westEnd === true,
      city: theaterInfo.city || ''
    };
  });
});

// Group theaters by type
const broadwayTheaters = computed(() => {
  return allTheaters.value
    .filter(theater => theater.broadway && theater.count > 2)
    .sort((a, b) => b.count - a.count);
});

const westEndTheaters = computed(() => {
  return allTheaters.value
    .filter(theater => theater.westEnd && theater.count > 2)
    .sort((a, b) => b.count - a.count);
});

const otherTheaters = computed(() => {
  return allTheaters.value
    .filter(theater => !theater.broadway && !theater.westEnd && theater.count > 2)
    .sort((a, b) => b.count - a.count);
});

const toggleReview = (index) => {
  showReviews.value[index] = !showReviews.value[index];
};
</script>



<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap");

.theater-stats {
  padding: 20px;
  margin-bottom: 20px;
  color: var(--purple);
}

.theater-stats h2 {
  color: var(--purple);
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: "Abril Fatface";
}

.theater-groups {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.theater-group h3 {
  color: var(--purple);
  margin-bottom: 10px;
  font-family: "Abril Fatface";
  font-size: 1.2rem;
}

.theater-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.theater-badge {
  background-color: var(--purple);
  color: var(--black);
  padding: 8px 12px;
  border-radius: 5px;
  border: 2px solid var(--black);
  box-shadow: 3px 3px 0 var(--black);
  display: flex;
  align-items: center;
  gap: 10px;
}

.theater-name {
  font-weight: bold;
}

.theater-count {
  background-color: var(--black);
  color: var(--purple);
  border-radius: 50%;
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

.shows {
  padding: 40px 10px;
  background-color: var(--black);

  @media screen and (min-width: 662px) {
    padding: 20px;
  }

  .show-container {
    padding: 0;
    position: relative;
    margin-bottom: 20px;
    list-style: none;
    /* display: grid;
    grid-template-columns: 1fr; */
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @media screen and (min-width: 662px) {
      /* display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 60px; */
      padding: 20px;
    }

    @media screen and (min-width: 992px) {
      /* grid-template-columns: 1fr 1fr 1fr; */
    }

    .show {
      border: 2px solid var(--purple);
      box-shadow: 9px 9px 0 var(--purple);
      outline: 3px solid var(--black);
      border-radius: 7px;
      background-color: var(--purple);
      margin-bottom: 50px;
      max-width: 400px;
      margin: 0 auto 40px auto;
      position: relative;
      width: 100%;

      @media screen and (min-width: 662px) {
        max-width: none;
        margin: 20px;
        width: 325px;
      }

      .show-opinion {
        position: absolute;
        left: -30px;
        top: 5px;
        z-index: 1;
        text-align: center;

        .fav-view,
        .review,
        .multi-view {
          margin-bottom: 10px;
        }

        .fav-view {
          .fav-icon {
            color: var(--purple);
            font-size: 35px;

            path {
              stroke: var(--black);
              stroke-width: 20px;
            }
          }
        }

        .review {
          img {
            width: 100%;
            background-color: var(--purple);
            border-radius: 50%;
            width: 40px;
            border: 1px solid var(--black);
          }
        }

        .multi-view,
        .show-price {
          background-color: var(--black);
          color: var(--purple);
          padding: 10px;
          border: 3px solid var(--purple);
          outline: 1px solid var(--black);
        }

        .multi-view {
          display: inline-block;
        }

        .show-price {
          margin: 0;
          text-align: center;
        }
      }

      .show-info {
        position: relative;

        .type {
          position: absolute;
          padding: 5px 10px;
          top: -38px;
          right: 10px;
          border: 3px solid var(--black);
          background-color: var(--purple);
          z-index: 99;
          text-align: center;
        }

        .upcoming-tag {
          position: absolute;
          padding: 5px 10px;
          top: -38px;
          right: 110px;
          border: 3px solid var(--black);
          background-color: var(--purple);
          z-index: 99;
          text-align: center;
        }

        .show-name {
          background-color: var(--black);
          color: var(--purple);
          padding: 20px;

          p {
            font-size: 25px;
            font-family: "Abril Fatface";
            text-align: center;
            letter-spacing: 1.5px;
            margin: 0;

            @media screen and (min-width: 1200px) {
              font-size: 30px;
            }

            a {
              color: var(--purple);
              text-decoration: none;
            }
          }
        }
      }

      .show-content {
        text-align: center;
        padding: 10px 20px 60px 20px;

        @media screen and (min-width: 662px) {
          padding: 20px 35px 75px 35px;
        }
      }

      .favs {
        background-color: var(--black);
        color: var(--purple);
        position: absolute;
        padding: 10px;
        bottom: 0;
        width: 100%;

        p {
          margin: 0;
        }

        .fav-song-label {
          background-color: var(--purple);
          border: 3px solid var(--black);
          padding: 5px;
          color: var(--black);
          position: absolute;
          font-size: 14px;
          top: -15px;

          @media screen and (min-width: 662px) {
            left: 20px;
          }
        }

        .fav-song {
          .fav-song-content {
            padding: 15px 0 10px 0;
            display: flex;
            justify-content: center;

            .song-label {
              margin-right: 10px;
            }

            .song-name a {
              text-decoration: none;
              color: var(--purple);
            }
          }
        }
      }

      &.upcoming {
        background-color: var(--black);

        .show-name {
          background-color: var(--purple);
          color: var(--black);

          a.upcoming-show-link {
            color: var(--black);
          }
        }

        .show-content {
          padding-bottom: 20px;
          color: var(--purple);
        }

        .type,
        .upcoming-tag {
          background-color: var(--black);
          color: var(--purple);
          border: 3px solid var(--purple);
          outline: 3px solid var(--black);
        }
      }
    }
  }

  .icon-attribute {
    background-color: var(--purple);
    padding: 20px;
    border-radius: 3px;
    color: var(--black);
    font-size: 12px !important;

    a {
      color: var(--black);
    }
  }
}

.filters {
  display: flex;
  flex-wrap: wrap;
  padding: 20px;
  margin-bottom: 20px;

  label {
    color: var(--purple);
  }

  .total {
    color: var(--purple);
    margin-left: auto;
  }

  select {
    background: var(--purple);
    color: var(--black);
    font-size: 16px;
    padding: 5px;
    margin-left: 10px;
    border-color: var(--purple);
    text-transform: capitalize;
  }

  .filter-container {
    margin-right: 10px;
    margin-bottom: 10px;
  }
}

@media screen and (max-width: 425px) {
  .filters {
    padding-top: 0;
    margin-bottom: 40px;
    flex-direction: column;

    .total {
      margin-left: 0;
    }
  }
}

.no-results {
  color: var(--purple);
  margin: auto;
  text-align: center;
  font-size: 16px;
}

.show-review-content {
  padding: 20px;
}

.review-displayed .show-review-content {
  max-width: 700px;
}

.review-displayed .show-wrapper {
  width: 325px;
  border-right: 3px solid var(--black);
}

.review-displayed .favs {
  position: relative !important;
}

.review-displayed.show {
  display: flex;
  width: 100% !important;
}

.see-review {
  font-size: 12px;
  font-family: sans-serif;
}

.v-enter-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
