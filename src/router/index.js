import React from "react"
import { Redirect } from 'react-router-dom'

// import JMDiscover from '@/pages/discover'
// import JMFriend from '@/pages/friend'
// import JMMine from '@/pages/mine'

const JMDiscover = React.lazy(() => import('../pages/discover'))
const JMFriend = React.lazy(() => import('../pages/friend'))
const JMMine = React.lazy(() => import('@/pages/mine'))

//discover的子路由
const JMRecommend = React.lazy(() => import('../pages/discover/child-pages/recommend'))
const JMToplist = React.lazy(() => import('@/pages/discover/child-pages/toplist'))
const JMsongs = React.lazy(() => import('@/pages/discover/child-pages/songs'))
const JMDjradio = React.lazy(() => import('@/pages/discover/child-pages/djradio'))
const JMArtist = React.lazy(() => import('@/pages/discover/child-pages/artist'))
const JMAlbum = React.lazy(() => import('@/pages/discover/child-pages/album'))


const routes = [
    { path: '/', exact:true, render: () => <Redirect to="/discover" />},
    {
      path: '/discover' ,
      component: JMDiscover,
      routes: [
        {
            path: '/discover',
            exact: true,
            render: () => <Redirect to="/discover/recommend" />,
        },
        {path: '/discover/recommend', component: JMRecommend},
        {path: '/discover/ranking', component: JMToplist},
        {path: '/discover/songs', component: JMsongs},
        {path: '/discover/djradio', component: JMDjradio},
        {path: '/discover/artist', component: JMArtist},
        {path: '/discover/album', component: JMAlbum}

        
      ]
    },
    { path: '/mine', component: JMMine },
    { path: '/friend', component: JMFriend },

]

export default routes