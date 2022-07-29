import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { HotRecommendWrapper } from './style'

import { HOT_RECOMMEND_LIMIT } from '@/common/constants'
import { getHostBannersAction } from '../../store/actionCreator'
import SongCover from 'components/song-cover'

import ThemeHeaderRmc from '@/components/theme-header-rcm'

function HotRecommend() {
    const showIcon = {isShowIcon: true}
    const dispatch = useDispatch()
    const { hotRecommends } = useSelector(
        state => ({
            hotRecommends: state.getIn(['recommend', 'hotRecommends']),
        }),
        shallowEqual
    )
    // console.log("@@@", hotRecommends)
    
    useEffect(() => {
        dispatch(getHostBannersAction(HOT_RECOMMEND_LIMIT))
    }, [dispatch])
    return (
        <HotRecommendWrapper>
            <ThemeHeaderRmc
                    title="热门推荐"
                    keywords={['华语', '流行', '摇滚', '民谣', '电子']}
                    showIcon = {showIcon}
                />
          
            <div className="recommend-list">
           
                {hotRecommends && hotRecommends.map(item => {
                    return (
                        <SongCover key={item.id} info={item} className="recommend-list">
                            {item.name}
                        </SongCover>
                    )
                })}
            </div>

        </HotRecommendWrapper>

    )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps;
}

export default memo(HotRecommend, arePropsEqual)