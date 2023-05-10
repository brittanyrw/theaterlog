<template>
  <section class="hero">
    <header>
      <div class="overview">
        <h1>Theater Log</h1>
        <div class="overview-text">
          <p>
            Since watching Grease for the first time in 5th grade, I have been
            hooked on musicals! This app was built to keep track of all of the
            musicals and plays I have seen since 2008.
          </p>
          <p>
            Click on the show names to learn more about the show or current
            productions. And click on the song names to see a video of my
            favorite songs from each show!
          </p>
          <p class="portfolio-link">
            Created by
            <a href="https://musicalwebdev.com" target="_blank"
              >Brittany Walker</a
            >. View the code
            <a href="https://github.com/brittanyrw/theaterlog" target="_blank"
              >on GitHub.</a
            >
          </p>
        </div>
      </div>
      <div class="hero-sidebar">
        <div class="external-links">
          <h2>Other Logs</h2>
          <a href="https://thebookishlog.com" target="_blank">Bookish Log</a>
        </div>
        <div class="info">
          <ul>
            <li>
              <font-awesome-icon icon="star" class="fav-icon" /> = favorite
              shows
            </li>
            <li>
              <span class="multi-example">4</span> = times a show was seen
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="statistics">
      <div class="statistics-content">
        <h3>Statistics</h3>
        <div class="stats-wrapper">
          <div class="stats">
            <div class="counter total-stat">
              <p class="stat-number">{{ viewedShows.length }}</p>
              <p class="stat-title">Total Shows Seen</p>
            </div>
            <div class="counter upcoming-stat">
              <p class="stat-number">{{ upcomingCounter }}</p>
              <p class="stat-title">Upcoming</p>
            </div>
            <div class="counter musical-stat">
              <p class="stat-number">{{ valueCount("type", "musical") }}</p>
              <p class="stat-title">Musicals</p>
            </div>
            <div class="counter play-stat">
              <p class="stat-number">{{ valueCount("type", "play") }}</p>
              <p class="stat-title">Plays</p>
            </div>
            <div class="counter play-stat">
              <p class="stat-number">{{ valueCount("type", "dance") }}</p>
              <p class="stat-title">Dances</p>
            </div>
            <div class="counter price-stat">
              <p class="stat-number">
                ${{ Math.floor(count("price")).toLocaleString() }}
              </p>
              <p class="stat-title">Total Spent</p>
            </div>
            <div class="counter price-stat">
              <p class="stat-number">
                ${{ Math.floor(count("price") / viewedShows.length) }}
              </p>
              <p class="stat-title">Average Ticket Cost</p>
            </div>
          </div>
        </div>
      </div>
      <div class="stats-sidebar">
        <div class="review-legend">
          <h3>Review Legend</h3>
          <ul class="review-emoji-list">
            <li
              v-for="(ratingAmount, rating) in countArray(ratings)"
              :key="rating"
            >
              <img
                :alt="`${rating} emoji`"
                class="emoji"
                :src="require(`@/assets/${rating}.svg`)"
              />
              <p class="rating-name">
                {{ rating }}
                <span class="rating-amount">{{ ratingAmount }}</span>
              </p>
            </li>
          </ul>
          <h3>Show Locations</h3>
          <ul class="review-emoji-list">
            <li v-for="(cityAmount, city) in countArray(cities)" :key="city">
              <p class="rating-name">
                {{ city }}
                <span class="rating-amount">{{ cityAmount }}</span>
              </p>
            </li>
          </ul>
          <!-- <h3>Top Actors Seen</h3>
          <ul class="review-emoji-list">
            <li v-for="actor in actorsList" :key="actor.name">
              <p class="rating-name">
                {{ actor.name }}
                <span class="rating-amount">{{
                  actor.theaterShowCollection.total
                }}</span>
              </p>
            </li>
          </ul> -->
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    shows: Array,
    actors: Array
  },
  computed: {
    viewedShows() {
      return this.shows.filter(item => !item.upcoming);
    },
    upcomingCounter: function() {
      const result = this.shows.reduce(
        (res, item) => (item.upcoming ? res + item.upcoming : res),
        0
      );
      return result;
    },
    ratings() {
      let reviewList = [];
      this.viewedShows.forEach(function(each) {
        reviewList.push(each.rating);
      });
      return reviewList;
    },
    cities() {
      let cityList = [];
      this.viewedShows.forEach(function(each) {
        if (each.theater.city === "White Plains, NY") {
          cityList.push("New York, NY");
        } else if (
          each.theater.city === "Bethesda, MD" ||
          each.theater.city === "Columbia, MD"
        ) {
          cityList.push("Washington, DC");
        } else {
          cityList.push(each.theater.city);
        }
      });
      return cityList;
    },
    actorsList() {
      let actorData = this.actors;
      return actorData
        .sort(
          (a, b) =>
            b.theaterShowCollection.total - a.theaterShowCollection.total
        )
        .filter(actor => actor.theaterShowCollection.total > 2);
    }
  },
  methods: {
    valueCount(key, value) {
      return this.viewedShows.filter(show => show[key] === value).length;
    },
    count(key) {
      return this.viewedShows.reduce(
        (res, show) => (show[key] ? res + show[key] : res),
        0
      );
    },
    countArray(arr) {
      var countedArray = {};

      arr.forEach(function(el) {
        countedArray[el] = countedArray[el] + 1 || 1;
      });

      const sortedCountedObj = Object.entries(countedArray).sort(
        (a, b) => b[1] - a[1]
      );
      countedArray = Object.fromEntries(sortedCountedObj);
      return countedArray;
    }
  }
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
@import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap");

.hero {
  header {
    border-bottom: 3px solid $black;
    @media screen and (min-width: 662px) {
      display: flex;
    }
    .overview {
      padding: 20px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      @media screen and (min-width: 662px) {
        flex-basis: 75%;
        border-right: 3px solid $black;
      }
      h1 {
        font-family: "Abril Fatface", cursive;
        margin: 0;
        letter-spacing: 1.5px;
        font-size: 40px;
      }
    }
    .hero-sidebar {
      @media screen and (min-width: 662px) {
        width: 300px;
      }

      .external-links,
      .info {
        padding: 20px;
      }

      .external-links {
        border-top: 3px solid $black;
        border-bottom: 3px solid $black;
        a {
          padding: 5px 10px;
          background-color: $black;
          color: $purple;
          text-decoration: none;
          border: 3px solid $black;
        }
        a:hover {
          background-color: $purple;
          color: $black;
          transition: 0.5s;
        }
        @media screen and (min-width: 662px) {
          border-top: 0;
        }
      }

      .info {
        .fa-star {
          font-size: 24px;
        }
        .multi-example {
          border: 2px solid $black;
          padding: 5px;
          display: inline-block;
        }
        li:first-child {
          margin-bottom: 10px;
        }
        li {
          display: block;
        }
      }
    }
    .portfolio-link a {
      color: $black;
    }
  }
}

.statistics {
  border-bottom: 3px solid $black;
  .statistics-content {
    background-color: $black;
    color: $purple;
    padding: 20px;
    h3 {
      margin: 0;
    }
    .stats {
      display: flex;
      align-items: center;
      justify-content: center;
      flex-wrap: wrap;
      padding: 20px 0;
      @media screen and (min-width: 662px) {
        padding: 20px;
      }
      .counter {
        background-color: $purple;
        text-align: center;
        margin: 10px;
        border: 2px solid $purple;
        -webkit-box-shadow: 5px 5px 0 $purple;
        box-shadow: 9px 9px 0 $purple;
        border-radius: 7px;
        color: $black;
        outline: 3px solid $black;
        position: relative;
        .stat-number {
          font-size: 50px;
          font-weight: bold;
          margin: 0;
          padding: 10px 15px 0 15px;
        }
        .stat-title {
          margin: 0;
          padding: 0 15px 15px 15px;
        }
      }
    }
  }

  .review-legend {
    padding: 20px;
    border-top: 3px solid $black;
    text-align: center;
    h3 {
      margin-bottom: 0;
    }
    .review-emoji-list {
      li {
        text-align: center;
        margin: 10px;
        .rating-name {
          border: 2px solid $black;
          padding: 5px 0 5px 5px;
          margin-bottom: 5px;
        }
        .rating-amount {
          padding: 5px;
          border-left: 2px solid $black;
          background-color: $black;
          color: $purple;
        }
        img {
          width: 40px;
        }
      }
    }
  }
}
</style>
