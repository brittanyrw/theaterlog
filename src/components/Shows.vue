<template>
  <div class="shows">
    <ul class="show-container">
      <li
        v-for="show in shows"
        :key="show.sys.id"
        class="show"
        :class="[{ upcoming: show.upcoming }]"
      >
        <div
          v-if="
            show.upcoming == false &&
              (show.favorite || show.rating || show.multi)
          "
          class="show-opinion"
        >
          <div v-if="show.favorite" class="fav-view">
            <font-awesome-icon icon="star" class="fav-icon" />
          </div>
          <div v-if="show.rating" class="review">
            <img
              :src="require(`../assets/${show.rating}.svg`)"
              :alt="`Impression of the show is ${show.rating}`"
            />
          </div>
          <div v-if="show.multi" class="multi-view">{{ show.multi }}</div>
          <p v-if="show.price >= 0" class="show-price">
            ${{ Math.floor(show.price) }}
          </p>
        </div>
        <div class="show-info">
          <p v-if="show.upcoming" class="upcoming-tag">upcoming</p>
          <p class="type">{{ show.type }}</p>
          <div class="show-name">
            <p v-if="show.link">
              <a
                :href="show.link"
                class="upcoming-show-link"
                target="_blank"
                :title="`Go to website for ${show.name}`"
                >{{ show.name }}</a
              >
            </p>
            <p v-else>{{ show.name }}</p>
          </div>
          <div class="show-content">
            <p class="show-theater">{{ show.theater.name }}</p>
            <p class="show-location">{{ show.theater.city }}</p>
            <p v-if="show.upcoming" class="show-date">
              {{
                moment(show.date)
                  .add(1, "d")
                  .format("MMMM YYYY")
              }}
            </p>
            <p v-else class="show-date">
              {{
                moment(show.date)
                  .add(1, "d")
                  .format("MMMM DD, YYYY")
              }}
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
                <a
                  v-if="show.song.name"
                  :href="show.song.videoLink"
                  target="_blank"
                  :title="`View video for ${show.song.name} from ${show.name}`"
                >
                  {{ show.song.name }}
                </a>
              </p>
            </div>
          </div>
        </div>
      </li>
    </ul>
    <div class="icon-attribute">
      Icons made by
      <a
        href="https://www.flaticon.com/authors/darius-dan"
        title="Darius Dan"
        target="_blank"
        >Darius Dan</a
      >
      from
      <a href="https://www.flaticon.com/" title="Flaticon" target="_blank"
        >www.flaticon.com</a
      >
      is licensed by
      <a
        href="http://creativecommons.org/licenses/by/3.0/"
        title="Creative Commons BY 3.0"
        target="_blank"
        >CC 3.0 BY</a
      >
    </div>
  </div>
</template>

<script>
export default {
  props: {
    shows: Array
  }
};
</script>

<style lang="scss" scoped>
@import "@/assets/styles/variables.scss";
@import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap");
.shows {
  padding: 40px 10px;
  background-color: $black;
  @media screen and (min-width: 662px) {
    padding: 20px;
  }
  .show-container {
    padding: 0;
    position: relative;
    margin-bottom: 20px;
    list-style: none;
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 662px) {
      display: grid;
      grid-template-columns: 1fr 1fr;
      grid-gap: 60px;
      padding: 20px;
    }
    @media screen and (min-width: 992px) {
      grid-template-columns: 1fr 1fr 1fr;
    }
    .show {
      border: 2px solid $purple;
      box-shadow: 9px 9px 0 $purple;
      outline: 3px solid $black;
      border-radius: 7px;
      background-color: $purple;
      margin-bottom: 50px;
      max-width: 400px;
      margin: 0 auto 40px auto;
      position: relative;
      width: 100%;
      @media screen and (min-width: 662px) {
        max-width: none;
        margin: 0;
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
            color: $purple;
            font-size: 35px;
            path {
              stroke: $black;
              stroke-width: 20px;
            }
          }
        }
        .review {
          img {
            width: 100%;
            background-color: $purple;
            border-radius: 50%;
            width: 40px;
            border: 1px solid $black;
          }
        }
        .multi-view,
        .show-price {
          background-color: $black;
          color: $purple;
          padding: 10px;
          border: 3px solid $purple;
          outline: 1px solid $black;
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
          border: 3px solid $black;
          background-color: $purple;
          z-index: 99;
          text-align: center;
        }
        .upcoming-tag {
          position: absolute;
          padding: 5px 10px;
          top: -38px;
          right: 110px;
          border: 3px solid $black;
          background-color: $purple;
          z-index: 99;
          text-align: center;
        }
        .show-name {
          background-color: $black;
          color: $purple;
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
              color: $purple;
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
        background-color: $black;
        color: $purple;
        position: absolute;
        padding: 10px;
        bottom: 0;
        width: 100%;
        p {
          margin: 0;
        }
        .fav-song-label {
          background-color: $purple;
          border: 3px solid $black;
          padding: 5px;
          color: $black;
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
              color: $purple;
            }
          }
        }
      }
      &.upcoming {
        background-color: $black;
        .show-name {
          background-color: $purple;
          color: $black;
          a.upcoming-show-link {
            color: $black;
          }
        }
        .show-content {
          padding-bottom: 20px;
          color: $purple;
        }

        .type,
        .upcoming-tag {
          background-color: $black;
          color: $purple;
          border: 3px solid $purple;
          outline: 3px solid $black;
        }
      }
    }
  }
  .icon-attribute {
    background-color: $purple;
    padding: 20px;
    border-radius: 3px;
    color: $black;
    a {
      color: $black;
    }
  }
}
</style>
