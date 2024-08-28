import './assets/main.css'
// ---
import { createApp } from 'vue'
import App from './App.vue'
import { fkPlugin, fkOptions } from './plugins/formkig.plugin'

createApp(App).use(fkPlugin, fkOptions).mount('#app')
