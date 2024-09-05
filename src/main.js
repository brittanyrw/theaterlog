import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faStar, faMusic, faHouseChimneyWindow, faBroom, faSeedling, faPenFancy, faFire, faUmbrella, faMicrophoneLines, faBook, faBookBookmark, faUtensils, faCrown, faBreadSlice, faHouse, faNewspaper, faChess, faEnvelope, faGuitar, faBookBible, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faStar, faMusic, faHouseChimneyWindow, faBroom, faSeedling, faPenFancy, faFire, faUmbrella, faMicrophoneLines, faBook, faBookBookmark, faUtensils, faCrown, faBreadSlice, faHouse, faNewspaper, faChess, faEnvelope, faGuitar, faBookBible, faMagnifyingGlass)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
