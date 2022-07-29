import React, { memo } from 'react'
import { getCount, getSizeImage } from '@/utils/format-utils'
import { SongCoverWrapper } from './style'

// 歌曲封面组件
function SongCover(props) {
    console.log('#$$$', props)
    const { info, songList, width = 140 } = props
  
    // pic
    const picUrl = (info && info.picUrl) || (songList && songList.coverImgUrl) 
    // playCount 播放次数 
    const playCount = (info && info.playCount) || (songList && songList.playCount) 
    // name
    const name = (info && info.name) || (songList && songList.name) 
    // nickname
    const nickname = (info && info.copywriter) || (songList && songList.creator.nickname) 
  
    return (
      <SongCoverWrapper width={width}>
        <div className="cover-wrapper">
          <img src={getSizeImage(picUrl, 140)} alt="" />
          <div className="cover-mask sprite_cover">
            <div className="bottom-bar sprite_cover">
              <span>
                <i className="sprite_icon erji"></i>
                {getCount(playCount)}
              </span>
              <i className="sprite_icon play"></i>
            </div>
          </div>
        </div>
        <div className="cover-title text-nowrap">by-{name}</div>
        <div className="cover-source text-nowrap">
          by {(info && info.copywriter) || nickname}
        </div>
      </SongCoverWrapper>
    )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps;
}

export default memo( SongCover, arePropsEqual)

