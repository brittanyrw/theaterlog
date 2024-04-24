export interface Show {
  title: Shows;
  link: string | "";
  date: string;
  price: number;
  fav: boolean;
  upcoming: boolean;
  multi: number  | 0;
  type: ShowTypes;
  rating: Ratings  | "";
  favSong: Song | "";
  theater: Theater;
  seat: string;
  seatLevel: SeatLevels;
  actors: string[] | "";
}

export interface Actor {
  name: string;
  shows: Shows[] | "";
}

interface Song {
  name: string;
  link: string;
}

interface Theater {
  name: Theaters;
  city: City;
  broadway: boolean;
}

export type ShowTypes =
  | "Musical"
  | "Play"
  | "Dance";

  export type Ratings =
  | "Love"
  | "Happy"
  | "Funny"
  | "Meaningful"
  | "Dislike"
  | "Sad"
  | "Happy and Sad"
  | "Meh"
  | "Confused";

  export type Theaters =
  | "Abe Burrows Theatre (NYU)"
  | "Adelphi Theatre"
  | "Al Hirschfeld Theatre"
  | "Arena Stage"
  | "Atlas Performing Arts Center"
  | "August Wilson Theatre"
  | "Barrymore Theatre"
  | "Bass Concert Hall"
  | "Bernard Jacobs Theatre"
  | "Booth Theatre"
  | "Broadhurst Theatre"
  | "Broadway Theatre"
  | "Brooks Atkinson Theatre"
  | "Circle in the Square Theatre"
  | "Constellation Theatre Company"
  | "County Hall"
  | "Duchess Theatre"
  | "Folger Theatre"
  | "Ford's Theatre"
  | "Fox Theatre"
  | "Golden Theatre"
  | "Imperial Theatre"
  | "John F. Kennedy Center for the Performing Arts"
  | "Judson Theater"
  | "Keegan Theatre"
  | "Lunt-Fontanne Theatre"
  | "Lyceum Theatre"
  | "Minskoff Theatre"
  | "Music Box Theatre"
  | "National Theatre"
  | "New Amsterdam Theatre"
  | "New World Stages"
  | "Playhouse Theatre"
  | "Richard Rodgers Theatre"
  | "Round House Theatre"
  | "St. James Theatre"
  | "St. Martin's Theatre"
  | "Shakespeare Theatre Company"
  | "Shubert Theatre"
  | "Studio 54"
  | "Toby's Dinner Theatre"
  | "Victoria Palace Theatre"
  | "Vivian Beaumont Theater"
  | "Walter Kerr Theatre"
  | "Westside Theatre Upstairs"
  | "White Plains Performing Arts Center"
  | "Winter Garden Theatre"
  | "Woolly Mammoth Theatre"
  | "Zach Theatre";

  export type City =
  | "Washington, DC"
  | "New York, NY"
  | "White Plains, NY"
  | "Atlanta, GA"
  | "London, UK";

  export type SeatLevels =
  | "Orchestra"
  | "Orchestra - Small Theater"
  | "Front Row Orchestra"
  | "Mezzanine"
  | "Front Row Mezzanine"
  | "Balcony"
  | "Front Row Balcony";

export type Shows =
  | "1984"
  | "A Strange Loop"
  | "A View From A Bridge"
  | "ain't no mo'"
  | "Aladdin"
  | "Alvin Ailey American Dance Theater"
  | "American Idiot"
  | "American Son"
  | "Anastasia"
  | "Angels in America: Part 1"
  | "Avenue Q"
  | "Back to the Future"
  | "Baskerville: A Sherlock Holmes Mystery"
  | "Beauty and the Beast"
  | "Beyond Babel"
  | "Book of Mormon"
  | "Bright Star"
  | "Cabaret"
  | "Chicago"
  | "Dear Evan Hansen"
  | "Eclipsed"
  | "Elephant Man"
  | "Falsettos"
  | "Frozen"
  | "Fun Home"
  | "Hadestown"
  | "Hamilton"
  | "Heathers"
  | "In the Heights"
  | "Into the Woods"
  | "Kiss Me Kate"
  | "KPOP"
  | "Legally Blonde the Musical"
  | "Les Miserables"
  | "Little Shop of Horrors"
  | "Mary Poppins"
  | "Mary Stuart"
  | "Matilda"
  | "Merrily We Roll Along"
  | "Miss Saigon"
  | "Moulin Rouge"
  | "Mousetrap"
  | "My Fair Lady"
  | "Natasha, Pierre & The Great Comet of 1812"
  | "New York, New York"
  | "Newsies"
  | "Next to Normal"
  | "Once Upon a One More Time"
  | "Once"
  | "Puffs"
  | "Rent"
  | "Shrek the Musical"
  | "Sister Act"
  | "Six"
  | "Something Rotten"
  | "South Pacific"
  | "Spring Awakening (ASL)"
  | "Stereophonic"
  | "Sweeney Todd"
  | "The Black Watch"
  | "The Color Purple"
  | "The King and I"
  | "The Lion King"
  | "The Play That Goes Wrong"
  | "The Tempest"
  | "tick, tick... BOOM!"
  | "Urinetown"
  | "Waitress"
  | "West Side Story"
  | "Wicked"
  | "Witness for the Prosecution"
  | "Wolf Hall: Part 1"
  | "Wolf Hall: Part 2";
