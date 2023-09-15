<template>
  <section class="hero">
    <header>
      <div class="overview">
        <div class="marquee">
          <h1>Theater Log</h1>
        </div>
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
              <p class="stat-title">Total Shows</p>
              <p class="stat-number">{{ viewedShows.length }}</p>
            </div>
            <div class="counter upcoming-stat">
              <p class="stat-title">Upcoming</p>
              <p class="stat-number">{{ upcomingCounter }}</p>
            </div>
            <div class="counter musical-stat">
              <p class="stat-title">Musicals</p>
              <p class="stat-number">{{ valueCount("type", "musical") }}</p>
            </div>
            <div class="counter play-stat">
              <p class="stat-title">Plays</p>
              <p class="stat-number">{{ valueCount("type", "play") }}</p>
            </div>
            <div class="counter dance-stat">
              <p class="stat-title">Dances</p>
              <p class="stat-number">{{ valueCount("type", "dance") }}</p>
            </div>
            <div class="counter spent-stat">
              <p class="stat-title">Total Spent</p>
              <p class="stat-number">
                ${{ Math.floor(count("price")).toLocaleString() }}
              </p>
            </div>
            <div class="counter ticket-stat">
              <p class="stat-title">Average Ticket Cost</p>
              <p class="stat-number">
                ${{ Math.floor(count("price") / viewedShows.length) }}
              </p>
            </div>
          </div>
        </div>
        <h3>Show Locations</h3>
        <ul class="show-location-list">
          <li
            v-for="(cityAmount, city) in countArray(cities)"
            :key="city"
            class="show-location"
          >
            <p class="city-amount">{{ cityAmount }}</p>

            <p class="city">
              {{ city }}
            </p>
          </li>
        </ul>
      </div>
      <div class="stats-sidebar">
        <div class="review-legend">
          <h3>Review Legend</h3>
          <ul class="review-emoji-list">
            <li
              v-for="(ratingAmount, rating) in countArray(ratings)"
              :key="rating"
            >
              <div class="review-img-wrapper">
                <img
                  :alt="`${rating} emoji`"
                  class="emoji"
                  :src="require(`@/assets/${rating}.svg`)"
                />
              </div>
              <p class="rating-name">
                {{ rating }}
                <span class="rating-amount">{{ ratingAmount }}</span>
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
        if (
          each.theater.city === "White Plains, NY" ||
          each.theater.city === "New York, NY"
        ) {
          cityList.push("NYC");
        } else if (
          each.theater.city === "Bethesda, MD" ||
          each.theater.city === "Columbia, MD" ||
          each.theater.city === "Washington, DC"
        ) {
          cityList.push("DC");
        } else if (each.theater.city === "Austin, TX") {
          cityList.push("Austin");
        } else if (each.theater.city === "London, UK") {
          cityList.push("London");
        } else if (each.theater.city === "Atlanta, GA") {
          cityList.push("Atlanta");
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
  border: 10px solid $dark-purple;
  background-color: $white;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    height: 43px;
    width: 105%;
    left: -2.5%;
    top: -4.5%;
    background-color: $very-dark-purple;
  }
  header {
    border-bottom: 3px solid $very-dark-purple;
    @media screen and (min-width: 662px) {
      display: flex;
    }
    .overview {
      padding: 20px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      position: relative;
      @media screen and (min-width: 662px) {
        flex-basis: 75%;
        border-right: 5px solid $very-dark-purple;
      }
      h1 {
        font-family: "Abril Fatface", cursive;
        margin: 0;
        letter-spacing: 1.5px;
        font-size: 40px;
        @media screen and (min-width: 662px) {
          font-size: 60px;
        }
      }
      .marquee {
        position: absolute;
        top: -37%;
        background: #6661af;
        color: white;
        padding: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        border: 4px solid #545092;
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
        border-top: 3px solid $very-dark-purple;
        border-bottom: 3px solid $very-dark-purple;
        a {
          padding: 5px 10px;
          background-color: $pink;
          color: $black;
          text-decoration: none;
          border: 3px solid $very-dark-purple;
        }
        a:hover {
          background-color: $very-dark-purple;
          color: $white;
          transition: 0.5s;
        }
        @media screen and (min-width: 662px) {
          border-top: 0;
        }
      }

      .info {
        .fa-star {
          font-size: 24px;
          path {
            fill: $yellow;
            stroke: black;
            stroke-width: 20px;
          }
        }
        .multi-example {
          border: 2px solid $black;
          padding: 5px;
          display: inline-block;
          background-color: $light-blue;
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
      color: darken($purple, 10%);
      font-weight: bold;
    }
  }
}

.statistics {
  border-bottom: 3px solid $very-dark-purple;
  @media screen and (min-width: 992px) {
    display: grid;
    grid-template-columns: 1.5fr 1fr;
  }

  .statistics-content {
    padding: 10px;
    @media screen and (min-width: 662px) {
      padding: 20px;
    }
  }

  .stats-sidebar {
    @media screen and (min-width: 992px) {
      border-left: 5px solid $very-dark-purple;
    }
  }

  .stats-wrapper {
    .stats {
      display: flex;
      flex-wrap: wrap;
      .counter {
        border: 2px solid $black;
        margin-right: 10px;
        margin-bottom: 10px;
        p {
          display: inline-block;
          margin: 0;
          padding: 5px;
          font-size: 18px;
          @media screen and (min-width: 662px) {
            padding: 10px;
          }
          &:last-child {
            border-left: 2px solid $black;
          }
        }
        &.total-stat,
        &.spent-stat {
          p:last-child {
            background-color: $pink;
          }
        }
        &.upcoming-stat,
        &.ticket-stat {
          p:last-child {
            background-color: $light-purple;
          }
        }
        &.musical-stat {
          p:last-child {
            background-color: $yellow;
          }
        }
        &.play-stat {
          p:last-child {
            background-color: $light-blue;
          }
        }
        &.dance-stat {
          p:last-child {
            background-color: $green;
          }
        }
      }
    }
  }

  .show-location-list {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;
    .show-location {
      border: 2px solid $black;
      margin-right: 10px;
      margin-bottom: 10px;
      p {
        margin: 0;
        padding: 5px;
      }
      .city {
        border-top: 2px solid $black;
        font-size: 12px;
        @media screen and (min-width: 992px) {
          width: 80px;
        }
      }
      .city-amount {
        font-size: 14px;
      }
      &:nth-child(1) {
        .city-amount {
          background-color: $pink;
          height: 140px;
        }
      }
      &:nth-child(2) {
        .city-amount {
          background-color: $light-purple;
          height: 100px;
        }
      }
      &:nth-child(3) {
        .city-amount {
          background-color: $yellow;
          height: 73px;
        }
      }
      &:nth-child(4) {
        .city-amount {
          background-color: $light-blue;
          height: 44px;
        }
      }
      &:nth-child(5) {
        .city-amount {
          background-color: $green;
        }
      }
    }
  }

  .review-legend {
    padding: 20px;
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
          color: $black;
        }
        .review-img-wrapper {
          text-align: center;
          margin: auto;
          img {
            width: 40px;
          }
        }
        &:nth-child(1),
        &:nth-child(6) {
          .rating-amount {
            background-color: $pink;
          }
        }
        &:nth-child(2),
        &:nth-child(7) {
          .rating-amount {
            background-color: $light-purple;
          }
        }
        &:nth-child(3),
        &:nth-child(8) {
          .rating-amount {
            background-color: $yellow;
          }
        }
        &:nth-child(4),
        &:nth-child(9) {
          .rating-amount {
            background-color: $light-blue;
          }
        }
        &:nth-child(5) {
          .rating-amount {
            background-color: $green;
          }
        }
      }
    }
  }
}
</style>
