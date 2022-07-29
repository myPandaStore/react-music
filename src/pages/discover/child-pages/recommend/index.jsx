import React, { memo } from 'react'
import {
  RecommendWrapper,
  Content,
  RecommendLeft,
  RecommendRight
} from './style'

import TopBanners from './c-cpns/top-banners'
import HotRecommend from './c-cpns/hot-recommend'
import NewAlbum from './c-cpns/new-album'
import RecommendRanking from './c-cpns/recommend-ranking'
import HotArtist from './c-cpns/hot-artist'
import UserLogin from './c-cpns/user-login'
import SettleSinger from './c-cpns/settle-singer'

function JMRecommend() {
  return (
    <RecommendWrapper>
      {/* 轮播图 */}
      <TopBanners />
      {/* 主体内容 */}
      <Content>
        {/* 主体推荐页左侧 */}
        <RecommendLeft>
          {/* 热门推荐 */}
          <HotRecommend />
          {/* 新碟上架 */}
          <NewAlbum />
          {/* 榜单 */}
          <RecommendRanking />
        </RecommendLeft>
        {/* 主体推荐页右侧 */}
        <RecommendRight>
          {/* 登录 */}
          <UserLogin />
          {/* 入驻歌手 */}
          <SettleSinger />
          {/* 热门主播 */}
          <HotArtist />
        </RecommendRight>
      </Content>
    </RecommendWrapper>
  )
}

function arePropsEqual(prevProps, nextProps) {
  return prevProps === nextProps;
}

export default memo(JMRecommend, arePropsEqual)
