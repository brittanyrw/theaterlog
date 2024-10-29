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
            <a href="https://musicalwebdev.com" target="_blank">Brittany Walker</a>. View the code
            <a href="https://github.com/brittanyrw/theaterlog" target="_blank">on GitHub.</a>
          </p>
          <nav>
            <ul>
              <li>Skip To:</li>
              <li><a href="#stats">Statistics</a></li>
              <li><a href="#shows">Shows</a></li>
            </ul>
          </nav>
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
              <font-awesome-icon icon="star" class="fav-icon" />
              = favorite shows
            </li>
            <li>
              <span class="multi-example">4</span> = times a show was seen
            </li>
          </ul>
        </div>
      </div>
    </header>
    <div class="main-statistics" id="stats">
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
          <div class="counter ticket-stat">
            <p class="stat-title">Broadway Theaters</p>
            <p class="stat-number">
              {{
              Math.floor((valueCountTheaters("broadway", true) / 41) * 100)
            }}%
            </p>
          </div>
          <div class="counter ticket-stat">
            <p class="stat-title">West End Theaters</p>
            <p class="stat-number">
              {{
                Math.floor((valueCountTheaters("westEnd", true) / 40) * 100)
              }}%
            </p>
          </div>
          <!-- <div class="counter total-time-stat">
            <p class="stat-title">Total Time Watched</p>
            <p class="stat-number">{{ totalTime }}</p>
          </div>
          <div class="counter avg-time-stat">
            <p class="stat-title">Average Show Length</p>
            <p class="stat-number">{{ averageTime }}</p>
          </div>
          <div class="counter shortest-show-stat">
            <p class="stat-title">Shortest Show</p>
            <p class="stat-number">{{ shortestShow.name }} <span>{{ shortestShow.duration }}</span></p>
          </div>
          <div class="counter longest-show-stat">
            <p class="stat-title">Longest Show</p>
            <p class="stat-number">{{ longestShow.name }}
              <span>{{ longestShow.duration }}</span>
            </p>
          </div> -->
        </div>
      </div>
    </div>
    <div class="statistics">
      <div class="statistics-content">
        <h3>Show Locations</h3>
        <ul class="show-location-list">
          <li v-for="(cityAmount, city) in countArray(cities)" :key="city" class="show-location">
            <p class="city-amount">{{ cityAmount }}</p>

            <p class="city">
              {{ city }}
            </p>
          </li>
        </ul>
        <div class="show-years">
          <h3>Show Years</h3>
          <ul class="show-year-list">
            <li v-for="year in getYearlyStats" :key="year.year" class="show-year">
              <p class="year">
                {{ year.year }}
              </p>
              <p class="year-amount">{{ year.count }}</p>
            </li>
          </ul>
        </div>
        <div class="show-years">
          <h3>Show Cost Per Year</h3>
          <ul class="show-year-list">
            <li v-for="stat in getYearlyStats" :key="stat.year" class="show-year">
              <p class="year">
                {{ stat.year }}
              </p>
              <p class="year-amount">
                ${{ stat.totalPrice }}
              </p>
            </li>
          </ul>
        </div>
        <div class="show-years show-seats">
          <h3>Seat Locations</h3>
          <ul class="show-year-list">
            <li v-for="(seatAmount, seat) in countArray(seats)" :key="seat" class="show-year">
              <p class="year">
                {{ seat }}
              </p>
              <p class="year-amount">{{ seatAmount }}</p>
            </li>
          </ul>
        </div>
      </div>
      <div class="stats-sidebar">
        <div class="review-legend">
          <h3>Review Legend</h3>
          <ul class="review-emoji-list">
            <li v-for="(ratingAmount, rating) in countArray(ratings)" :key="rating">
              <div class="review-img-wrapper">
                <img :alt="`${rating} emoji`" class="emoji" :src="getEmojiUrl(rating)" />
              </div>
              <p class="rating-name">
                {{ rating }}
                <span class="rating-amount">{{ ratingAmount }}</span>
              </p>
            </li>
          </ul>
        </div>
        <div class="birthday-shows-section">
          <div class="birthday-header">
            <h3>Birthday Shows</h3>
            <p>Shows seen for my birthday.</p>
          </div>
          <ul class="birthday-shows">
            <li class="birthday-show-list">
              <p class="show-year">2024</p>
              <div class="shows">
                <p>Six, Showstopper, Cabaret, Starlight Express, Operation Mincemeat, Hadestown</p>
              </div>
            </li>
            <li class="birthday-show-list">
              <p class="show-year">2022</p>
              <div class="shows">
                <p>Little Shop of Horrors, KPOP, Hadestown</p>
              </div>
            </li>
            <li class="birthday-show-list">
              <p class="show-year">2021</p>
              <div class="shows">
                <p>
                  Hadestown, Little Shop of Horrors, Waitress, Beyond Babel, Six
                </p>
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
      </div>
    </div>
    <!-- <div class="map-section">
    <div v-for="(level, index) in seatLevels" :key="level" class="levels">
      <h3 v-if="level === 'balcony'">Balcony</h3>
      <h3 v-if="level === 'mezzanine'">Mezzanine</h3>
      <h3 v-if="level === 'orchestra'">Orchestra</h3>

      <div :class="level">
        <div v-for="area in seatAreas" :key="area" class="areas">
          <div :class="area">
            <div v-for="section in seatSections" :key="section" class="sections">
              <div :class="[section, getSeatCount(level, area, section) === 0 ? 'zero' : '']">
                <span>{{ getSeatCount(level, area, section) }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="stage">Stage</div>
  </div> -->
    <div class="show-years show-repeats">
      <h3>Show Repeats</h3>
      <ul class="show-year-list">
        <li v-for="show in countShowsWithIcon(otherShows)" :key="show.icon" class="show-year">
          <div class="repeat-content">
            <p class="year">
              <font-awesome-icon :icon="show.icon" class="fav-icon" />
              {{ show.name }}
            </p>
            <p class="year-amount">{{ show.count }}</p>
          </div>
        </li>
      </ul>
  <h4>For these shows I was a volunteer usher:</h4>
  <ul class="show-year-list">
    <li v-for="show in countShowsWithIcon(volunteerShows)" :key="show.icon" class="show-year">
      <div class="repeat-content">
        <p class="year">
          <font-awesome-icon :icon="show.icon" class="fav-icon" />
          {{ show.name }}
        </p>
        <p class="year-amount">{{ show.count }}</p>
      </div>
    </li>
  </ul>
    </div>
    <!-- <div class="show-years actor-repeats">
      <h3>Actor Repeats</h3>
      <ul class="show-year-list">
        <li v-for="actor in actorShowCounts" :key="actor.name" class="show-year">
          <div class="repeat-content">
            <p class="year">{{ actor.name }}</p>
            <p class="year-amount">{{ actor.count }}</p>
          </div>
        </li>
      </ul>
    </div> -->
  </section>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  shows: Array,
  actors: Array,
  theaters: Array
});

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

const viewedShows = computed(() => {
  return props.shows.filter(item => !item.upcoming);
});

const upcomingCounter = computed(() => {
  return props.shows.reduce(
    (res, item) => (item.upcoming ? res + 1 : res),
    0
  );
});

// const seatLevels = ['balcony', 'mezzanine', 'orchestra'];
// const seatAreas = ['back', 'center', 'front'];
// const seatSections = ['left', 'middle', 'right'];

// const getSeatCount = (seatLevel, seatArea, seatSection) => {
//   return viewedShows.value.filter(seat =>
//     (!seatLevel || (seat.seatLevel && seat.seatLevel.toLowerCase() === seatLevel)) &&
//     (!seatArea || (seat.seatArea && seat.seatArea.toLowerCase() === seatArea)) &&
//     (!seatSection || (seat.seatSection && seat.seatSection.toLowerCase() === seatSection))
//   ).length;
// };

const ratings = computed(() => {
  let reviewList = [];
  viewedShows.value.forEach(each => {
    if (each.rating) {
      reviewList.push(each.rating);
    }
  });
  return reviewList;
});

const cities = computed(() => {
  let cityList = [];
  viewedShows.value.forEach(each => {
    if (each.theater.city === "White Plains, NY" || each.theater.city === "New York, NY") {
      cityList.push("NYC");
    } else if (each.theater.city === "Tysons, VA" || each.theater.city === "Bethesda, MD" || each.theater.city === "Columbia, MD" || each.theater.city === "Washington, DC") {
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
});

const seats = computed(() => {
  let seatList = [];
  viewedShows.value.forEach(each => {
    if (each.seatLevel) {
      seatList.push(each.seatLevel);
    }
  });
  return seatList;
});

const getYearlyStats = computed(() => {
  const yearlyCounts = {};

  viewedShows.value.forEach(item => {
    const year = new Date(item.date).getFullYear();

    if (!yearlyCounts[year]) {
      yearlyCounts[year] = {
        count: 0,
        totalPrice: 0
      };
    }

    yearlyCounts[year].count++;
    yearlyCounts[year].totalPrice += item.price;
  });

  const result = Object.keys(yearlyCounts)
    .map(year => {
      const { count, totalPrice } = yearlyCounts[year];
      return {
        year: Number(year),
        count,
        averagePrice: Math.floor(totalPrice / count),
        totalPrice: Math.floor(totalPrice)
      };
    })
    .sort((a, b) => b.year - a.year);

  return result;
});

// const showsWithTime = computed(() => {
//   return viewedShows.value.filter(show => show.time !== null);
// });

// const totalTime = computed(() => {
//   const totalMinutes = showsWithTime.value.reduce((sum, show) => sum + show.time, 0);
//   const hours = Math.floor(totalMinutes / 60);
//   const minutes = totalMinutes % 60;
//   return `${hours} hrs ${minutes} mins`;
// });

// const shortestShow = computed(() => {
//   if (showsWithTime.value.length === 0) return 'N/A';
//   const minDuration = Math.min(...showsWithTime.value.map(show => show.time));
//   const show = showsWithTime.value.find(show => show.time === minDuration);
//   const hours = Math.floor(minDuration / 60);
//   const minutes = minDuration % 60;
//   const duration = `${hours} hrs ${minutes} mins`;
//   return {
//     name: show.name,
//     duration: duration
//   }
// });

// const longestShow = computed(() => {
//   if (showsWithTime.value.length === 0) return 'N/A';
//   const maxDuration = Math.max(...showsWithTime.value.map(show => show.time));
//   const show = showsWithTime.value.find(show => show.time === maxDuration);
//   const hours = Math.floor(maxDuration / 60);
//   const minutes = maxDuration % 60;
//   const duration = `${hours} hrs ${minutes} mins`;
//   return {
//     name: show.name,
//     duration: duration
//   }
// });

// const averageTime = computed(() => {
//   if (showsWithTime.value.length === 0) return 'N/A';
//   const totalMinutes = showsWithTime.value.reduce((sum, show) => sum + show.time, 0);
//   const avgMinutes = totalMinutes / showsWithTime.value.length;
//   const hours = Math.floor(avgMinutes / 60);
//   const minutes = Math.round(avgMinutes % 60);
//   return `${hours} hrs ${minutes} mins`;
// });

// const actorShowCounts = computed(() => {
//   const actorCount = {};

//   viewedShows.value.forEach(show => {
//     if (show.actors) { // Check if show.actors is not null
//       show.actors.forEach(actor => {
//         if (actorCount[actor]) {
//           actorCount[actor].count++;
//         } else {
//           actorCount[actor] = { name: actor, count: 1 };
//         }
//       });
//     }
//   });

//   return Object.values(actorCount)
//     .filter(item => item.count > 2)
//     .sort((a, b) => b.count - a.count);
// });

// methods
const valueCount = (key, value) => {
  return viewedShows.value.filter(show => show[key] === value).length;
};

const valueCountTheaters = (key, value) => {
  return props.theaters.filter(theater => theater[key] === value).length;
};

const count = (key) => {
  return viewedShows.value.reduce(
    (res, show) => (show[key] ? res + show[key] : res),
    0
  );
};

const countArray = (array = []) => {
  const countedArray = {};

  array.forEach(el => {
    countedArray[el] = (countedArray[el] || 0) + 1;
  });

  const sortedCountedObj = Object.entries(countedArray).sort(
    (a, b) => b[1] - a[1]
  );

  return Object.fromEntries(sortedCountedObj);
};

const countShowsWithIcon = (shows) => {
  const showCount = {};

  shows.forEach(item => {
    const { name, icon } = item;

    if (showCount[name]) {
      showCount[name].count++;
    } else {
      showCount[name] = { name: name, count: 1, icon: icon };
    }
  });

  return Object.values(showCount)
    .filter(item => item.count >= 2)
    .sort((a, b) => b.count - a.count);
};

const volunteerShows = computed(() => {
  return viewedShows.value.filter(show =>
    ["Wicked", "Beauty and the Beast", "Mary Poppins"].includes(show.name)
  );
});

const otherShows = computed(() => {
  return viewedShows.value.filter(show =>
    !["Wicked", "Beauty and the Beast", "Mary Poppins"].includes(show.name)
  );
});

</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap");

.hero {
  header {
    border-bottom: 3px solid var(--black);

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
        border-right: 3px solid var(--black);
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
        border-top: 3px solid var(--black);
        border-bottom: 3px solid var(--black);

        a {
          padding: 5px 10px;
          background-color: var(--black);
          color: var(--purple);
          text-decoration: none;
          border: 3px solid var(--black);
        }

        a:hover {
          background-color: var(--purple);
          color: var(--black);
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
          border: 2px solid var(--black);
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
      color: var(--black);
      font-weight: bold;
    }
  }
}

.show-years {
  .show-year-list {
    display: flex;
    flex-wrap: wrap;

    .show-year {
      border: 2px solid var(--black);
      margin-bottom: 5px;
      display: flex;
      margin-right: 5px;

      .year {
        margin: 0;
        padding: 5px;
      }

      .year-amount {
        padding: 5px;
        border-left: 2px solid var(--black);
        color: var(--purple);
        background-color: var(--black);
        margin: 0;
      }
    }
  }
}

nav {
  a {
    padding: 5px 10px;
    background-color: var(--black);
    color: var(--purple);
    text-decoration: none;
    border: 3px solid var(--black);
    margin: 10px;
    display: inline-block;
  }

  a:hover {
    background-color: var(--purple);
    color: var(--black);
    transition: 0.5s;
  }
}

.show-repeats,
.actor-repeats {
  padding: 20px;
}

.repeat-content {
  display: flex;
}

.hide-show {
  display: none !important;
}

.birthday-shows-section {
  padding: 20px;

  .birthday-header {
    text-align: center;
  }

  .birthday-shows {
    display: flex;
    flex-wrap: wrap;

    .birthday-show-list {
      border: 2px solid var(--black);
      margin-right: 2px;
      margin-bottom: 5px;
      flex-grow: 1;
      display: flex;

      .show-year {
        padding: 5px;
        background-color: var(--black);
        color: var(--purple);
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

.main-statistics {
  padding: 20px;
  border-bottom: 3px solid var(--black);
  background-color: var(--black);

  .stats-wrapper {
    display: flex;

    .stats {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .counter {
        background-color: var(--purple);
        padding: 15px;
        text-align: center;
        margin: 10px;
        border: 2px solid var(--purple);
        -webkit-box-shadow: 5px 5px 0 var(--purple);
        box-shadow: 9px 9px 0 var(--purple);
        border-radius: 7px;
        color: var(--black);
        outline: 3px solid var(--black);
        flex-grow: 1;

        @media screen and (min-width: 922px) {
          flex-grow: 0;
        }

        .stat-number {
          font-size: 35px;
          font-weight: bold;
          margin: 0;

          @media screen and (min-width: 922px) {
            font-size: 40px;
          }
        }

        .stat-title {
          margin: 0;
        }
      }
    }
  }
}

.statistics {
  border-bottom: 3px solid var(--black);

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
      border-left: 5px solid var(--black);
    }

    .show-years {
      padding: 20px;
      text-align: center;

      .show-year-list {
        justify-content: center;
      }
    }
  }

  .show-location-list {
    display: flex;
    align-items: flex-end;
    flex-wrap: wrap;

    .show-location {
      border: 2px solid var(--black);
      margin-right: 10px;
      margin-bottom: 10px;

      p {
        margin: 0;
        padding: 5px;
      }

      .city {
        border-top: 2px solid var(--black);
        font-size: 12px;

        @media screen and (min-width: 992px) {
          width: 80px;
        }
      }

      .city-amount {
        font-size: 14px;
        background-color: var(--black);
        color: var(--purple);
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
          border: 2px solid var(--black);
          padding: 5px 0 5px 5px;
          margin-bottom: 5px;
          text-transform: capitalize;
        }

        .rating-amount {
          padding: 5px;
          border-left: 2px solid var(--black);
          color: var(--purple);
          background-color: var(--black);
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

.map-section {
  max-width: 700px;
  margin: auto;
  text-align: center;
}

.balcony,
.mezz,
.orchestra {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}

.back,
.front,
.center {
  display: flex;
  flex-direction: row;
  justify-content: center;
}

.sections {
  display: flex;
  align-items: center;
  justify-content: center;
}

.sections span {
  display: block;
  margin: 5px;
  height: 40px;
  width: 40px;
  border: 3px solid;
  display: flex;
  border-radius: 50%;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  border: 3px solid var(--black);
  padding: 5px;
}

.areas {
  width: 100%;
  align-self: center;
  flex-direction: column;
  justify-content: center;
}


.counter.shortest-show-stat,
.counter.longest-show-stat {
  .stat-number {
    font-size: 21px !important;
  }

  span {
    display: block;
  }
}
</style>
