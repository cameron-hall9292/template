import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'


//google OAuth2.0

import vue3GoogleLogin from 'vue3-google-login';


/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret } from '@fortawesome/free-solid-svg-icons'

import { fas } from '@fortawesome/free-solid-svg-icons'
/* add icons to the library */
library.add(faUserSecret, fas)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(vue3GoogleLogin, {

  clientId: '729026114786-va0v5qo6c7f98qlqosb3um6jkjpacf6e.apps.googleusercontent.com', // Replace with your actual client ID
})
.mount('#app')
