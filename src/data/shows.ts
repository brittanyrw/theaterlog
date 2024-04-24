import type { Show } from "./types";


export const showData: Show[] = [
  {
    title: "Beauty and the Beast",
    link: "url",
    date: "1-3-2023",
    price: 123.4,
    fav: true,
    upcoming: false,
    multi: 0,
    type: "Musical",
    rating: "Love",
    favSong: {
      name: "Epic III",
      link: "url",
    },
    theater: {
      name: "Al Hirschfeld Theatre",
      city: "Washington, DC",
      broadway: false
    },
    seat: "seat number here",
    seatLevel: "Front Row Orchestra",
    actors: ["Bob", "Sarah", "Jim"]
  }
 ]