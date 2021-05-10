import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'

import DownloadIcon from 'vue-material-design-icons/Download.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import CheckIcon from 'vue-material-design-icons/Check.vue'
import CloseIcon from 'vue-material-design-icons/Close.vue'
import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue'
import ArrowRightIcon from 'vue-material-design-icons/ArrowRight.vue'
import ContentDuplicateIcon from 'vue-material-design-icons/ContentDuplicate.vue'
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue'
import AccountMultiplePlusIcon from 'vue-material-design-icons/AccountMultiplePlus.vue'
import ClockOutlineIcon from 'vue-material-design-icons/ClockOutline.vue'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import DotsHorizontalIcon from 'vue-material-design-icons/DotsHorizontal.vue'
import OpenInNewIcon from 'vue-material-design-icons/OpenInNew.vue'
import SendIcon from 'vue-material-design-icons/Send.vue'
import ContentSaveIcon from 'vue-material-design-icons/ContentSave.vue'

Vue.use(VueAxios, axios)
Vue.use(VueCookies)

Vue.component('download-icon', DownloadIcon)
Vue.component('delete-icon', DeleteIcon)
Vue.component('check-icon', CheckIcon)
Vue.component('close-icon', CloseIcon)
Vue.component('arrow-left-icon', ArrowLeftIcon)
Vue.component('arrow-right-icon', ArrowRightIcon)
Vue.component('content-duplicate-icon', ContentDuplicateIcon)
Vue.component('magnify-icon', MagnifyIcon)
Vue.component('account-multiple-plus-icon', AccountMultiplePlusIcon)
Vue.component('clock-outline-icon', ClockOutlineIcon)
Vue.component('plus-icon', PlusIcon)
Vue.component('dots-horizontal-icon', DotsHorizontalIcon)
Vue.component('open-in-new-icon', OpenInNewIcon)
Vue.component('send-icon', SendIcon)
Vue.component('content-save-icon', ContentSaveIcon)

Vue.config.productionTip = false


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
