import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faRepeat, faHeart, faCity, faCalendarCheck, faMoneyBillWave, faChair, faStar, faMusic, faHouseChimneyWindow, faBroom, faSeedling, faPenFancy, faFire, faUmbrella, faMicrophoneLines, faBook, faBookBookmark, faUtensils, faCrown, faBreadSlice, faHouse, faNewspaper, faChess, faEnvelope, faGuitar, faBookBible, faMagnifyingGlass, faCakeCandles, faRobot } from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(faRepeat, faHeart,faCity, faCalendarCheck, faMoneyBillWave, faChair, faStar, faMusic, faHouseChimneyWindow, faBroom, faSeedling, faPenFancy, faFire, faUmbrella, faMicrophoneLines, faBook, faBookBookmark, faUtensils, faCrown, faBreadSlice, faHouse, faNewspaper, faChess, faEnvelope, faGuitar, faBookBible, faMagnifyingGlass, faCakeCandles, faRobot)

createApp(App)
  .component('font-awesome-icon', FontAwesomeIcon)
  .mount('#app')
