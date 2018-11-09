import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Music from '@/components/music'
import News from '@/components/news'
import MusicListews from '@/components/musicList'
import MusicDetail from '@/components/musicDetail'

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
    },
     {
       path: '/musicList',
       name: 'MusicListe',
       component: MusicListews
    },
    {
      path: '/musicDetail',
      name: 'MusicDetail',
      component: MusicDetail
    }
  ]
})
