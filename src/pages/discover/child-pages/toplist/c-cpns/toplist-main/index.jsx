import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { ToplistMainWrapper } from './style'
import ThemeHeaderRcm from '@/components/theme-header-rcm'
import { getToplistItemAction } from '../../store/actionCreator'

import SongItem from '../song-item'
import { formatMinuteSecond } from '@/utils/format-utils.js'

function ToplistMain() {
    const dispatch = useDispatch()

    const { playCount, currentToplistId, currentToplist } = useSelector(
        (state) => ({
            playCount: state.getIn([
                'toplist',
                'currentToplistTitleInfo',
                'playCount',
            ]),
            currentToplistId: state.getIn(['toplist', 'currentToplistId']),
            currentToplist: state.getIn(['toplist', 'currentToplist'])
        }),
        shallowEqual
    )

    console.log('currentToplist',currentToplist)

    useEffect(() => {
        dispatch(getToplistItemAction(currentToplistId))
    }, [dispatch, currentToplistId])


    const rightSlot = (
        <span>
            播放：<em style={{ color: '#c20c0c' }}>{playCount}</em>次
        </span>
    )

    return (
        <ToplistMainWrapper>
            <ThemeHeaderRcm title="歌曲列表"
                keywords={[]}
                showIcon={false}
                right={rightSlot} />
            <div className='toplist-main'>
                <div className="main-header">
                    <div className="sprite_table header-item"></div>
                    <div className="sprite_table header-item header-title">标题</div>
                    <div className="sprite_table header-item header-time">时长</div>
                    <div className="sprite_table header-item header-singer">歌手</div>
                </div>
                <div className='main-list'>
                    {
                        currentToplist && currentToplist.map((item, index) => {
                            return <SongItem
                                key={item.id}
                                currentRanking={index + 1}
                                className="song_item"
                                coverPic={index < 3 ? item.al.picUrl : ''}
                                duration={formatMinuteSecond(item.dt)}
                                songName={item.name}
                                singer={item.ar[0].name}
                                songId={item.id}
                            />
                        })
                    }
                </div>
            </div>
        </ToplistMainWrapper>
    )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps
}

export default memo(ToplistMain, arePropsEqual)