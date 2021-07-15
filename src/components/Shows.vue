<template>
  <div class="shows">
    <div class="row">
      <div
        v-for="show in shows"
        v-bind:key="show.id"
        class="show"
        v-bind:class="[{ upcoming: show.upcoming }]"
      >
        <div
          v-if="
            show.upcoming == false && (show.fav || show.review || show.multi)
          "
          class="show-opinion"
        >
          <div v-if="show.fav" class="fav-view">
            <font-awesome-icon icon="star" class="fav-icon" />
          </div>
          <div v-if="show.review" class="review">
            <img
              v-bind:src="require('../assets/' + show.review + '.svg')"
              v-bind:alt="show.review + ' emoji'"
            />
          </div>
          <div v-if="show.multi" class="multi-view">{{ show.multi }}</div>
          <p v-if="show.price >= 0" class="show-price">${{ show.price }}</p>
        </div>
        <div class="show-info">
          <p class="type">{{ show.type }}</p>
          <div class="show-name">
            <p v-if="show.link">
              <a
                v-bind:href="show.link"
                target="_blank"
                :title="'Go to website for ' + show.name"
                >{{ show.name }}</a
              >
            </p>
            <p v-else>{{ show.name }}</p>
          </div>
          <div class="show-content">
            <p class="show-theater">{{ show.theater }}</p>
            <p class="show-location">{{ show.location }}</p>
            <p class="show-date">{{ show.date }}</p>
          </div>
        </div>
        <div v-if="show.favSong" class="favs">
          <p class="fav-song-label">Fav Song</p>
          <div class="fav-song">
            <div class="fav-song-content">
              <p class="song-label">
                <font-awesome-icon icon="music" class="fs-icon" />
              </p>
              <p class="song-name">
                <a
                  v-bind:href="show.favSongLink"
                  target="_blank"
                  :title="`View video for ${show.favSong} from ${show.name}`">
                  {{ show.favSong }}
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
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
import { showList } from "../data/shows";

export default {
  name: "Shows",
  data: function() {
    return {
      shows: showList,
      rowLength: 3
    };
  },
  computed: {
    rowCount: function() {
      return Math.ceil(this.shows.length / this.rowLength);
    }
  },
  methods: {
    itemCountInRow: function(index) {
      return this.shows.slice(
        (index - 1) * this.rowLength,
        index * this.rowLength
      );
    }
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
  .row {
    padding: 0;
    position: relative;
    margin-bottom: 20px;
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
          background-color: orange;
          padding: 5px 10px;
          top: -38px;
          right: 10px;
          border: 3px solid $black;
          background-color: $purple;
          z-index: 99;
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
          padding: 20px 35px 90px 35px;
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
        position: relative;
        border: 3px solid dimgray;
        outline: none;
        &:before {
          position: absolute;
          content: "";
          height: 100%;
          width: 100%;
          background-color: rgba(255,255,255,.5);
          top: 0;
          left: 0;
          z-index: 1;
        }
        .type {
          border: 3px solid dimgray;
          &:before {
            position: absolute;
            content: "";
            height: 100%;
            width: 100%;
            background-color: rgba(255,255,255,.5);
            top: 0;
            left: 0;
            z-index: 1;
          }
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
