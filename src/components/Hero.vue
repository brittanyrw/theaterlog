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
        <div class="show-years">
          <h3>Show Years</h3>
          <ul class="show-year-list">
            <li
              v-for="(yearAmount, year) in countArray(years)"
              :key="year"
              class="show-year"
            >
              <p class="year">
                {{ year }}
              </p>
              <p class="year-amount">{{ yearAmount }}</p>
            </li>
          </ul>
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
        <div class="show-years show-seats">
          <h3>Seat Locations</h3>
          <ul class="show-year-list">
            <li
              v-for="(seatAmount, seat) in countArray(seats)"
              :key="seat"
              class="show-year"
            >
              <p class="year">
                {{ seat }}
              </p>
              <p class="year-amount">{{ seatAmount }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="birthday-shows-section">
      <h3>Birthday Shows</h3>
      <p>Shows seen for my birthday.</p>
      <ul class="birthday-shows">
        <li class="birthday-show-list">
          <p class="show-year">2022</p>
          <div class="shows">
            <p>Little Shop of Horrors, KPOP, Hadestown</p>
          </div>
        </li>
        <li class="birthday-show-list">
          <p class="show-year">2021</p>
          <div class="shows">
            <p>Hadestown, Little Shop of Horrors, Waitress, Beyond Babel, Six</p>
          </div>
        </li>
        <li class="birthday-show-list">
          <p class="show-year">2019</p>
          <div class="shows">
            <p>Little Shop of Horrors</p>
          </div>
        </li>
        <li class="birthday-show-list">
          <p class="show-year">2016</p>
          <div class="shows">
            <p>Hamilton, Falsettos, Heathers, Sister Act</p>
          </div>
        </li>
        <li class="birthday-show-list">
          <p class="show-year">2015</p>
          <div class="shows">
            <p>Spring Awakening, Something Rotten</p>
          </div>
        </li>
      </ul>
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
    years() {
      let yearList = [];
      this.viewedShows.forEach(function(each) {
        yearList.push(new Date(each.date).getFullYear());
      });
      return yearList;
    },
    seats() {
      let seatList = [];
      this.viewedShows.forEach(function(each) {
        if(each.seatLevel){
          seatList.push(each.seatLevel);
        }
      });
      return seatList;
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
      font-weight: bold;
    }
  }
}

.show-years {
  .show-year-list {
    display: flex;
    flex-wrap: wrap;
    .show-year {
      border: 2px solid $black;
      margin-bottom: 5px;
      display: flex;
      margin-right: 5px;
      .year {
        margin: 0;
        padding: 5px;
      }
      .year-amount {
        padding: 5px;
        border-left: 2px solid $black;
        color: $purple;
        background-color: $black;
        margin: 0;
      }
    }
  }
}

.show-seats {
  padding: 20px;
}

.birthday-shows-section {
  padding: 20px;
  .birthday-shows {
    display: flex;
    flex-wrap: wrap;
    .birthday-show-list {
      border: 2px solid $black;
      margin-right: 2px;
      margin-bottom: 5px;
      flex-grow: 1;
      display: flex;
      .show-year {
        padding: 5px;
        background-color: $black;
        color: $purple;
        margin: 0;
      }
      .shows {
        padding: 5px;
        p {
          margin: 0;
        }
      }
    }
  } 
}

.statistics {
  border-bottom: 3px solid $black;
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
      border-left: 5px solid $black;
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
            background-color: $black;
            color: $purple;
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
        background-color: $black;
        color: $purple;
      }
      &:nth-child(1) {
        .city-amount {
          height: 145px;
        }
      }
      &:nth-child(2) {
        .city-amount {
          height: 105px;
        }
      }
      &:nth-child(3) {
        .city-amount {
          height: 78px;
        }
      }
      &:nth-child(4) {
        .city-amount {
          height: 49px;
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
          color: $purple;
          background-color: $black;
        }
        .review-img-wrapper {
          text-align: center;
          margin: auto;
          img {
            width: 40px;
          }
        }
      }
    }
  }
}
</style>
