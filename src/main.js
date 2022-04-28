// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import axios from './api/request'
import { Message} from 'element-ui'

import '@/assets/css/base.css'

import { Button, Tag, Input, Breadcrumb, BreadcrumbItem, Menu, Submenu, MenuItem, MenuItemGroup, MessageBox,Dialog,Table,TableColumn, Form, FormItem, Pagination, Upload   } from 'element-ui'
Vue.use(Button)
Vue.use(Tag)
Vue.use(Input)
Vue.use(Breadcrumb)
Vue.use(BreadcrumbItem)
Vue.use(Menu)
Vue.use(Submenu)
Vue.use(MenuItem)
Vue.use(MenuItemGroup)
Vue.use(Dialog)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Pagination)
Vue.use(Upload)

Vue.config.productionTip = false

Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$message = Message

//保持session
// axios.defaults.withCredentials = true
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
