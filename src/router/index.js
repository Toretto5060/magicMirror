import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Music from '@/components/music'
import News from '@/components/news'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }, {
      path: '/music',
      name: 'Music',
      component: Music
    }, {
      path: '/news',
      name: 'News',
      component: News
    }
  ]
})
