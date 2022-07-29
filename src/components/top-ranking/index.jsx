import React, { memo } from 'react'

import { TopRankingWrapper } from './style'

import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getSizeImage } from '@/utils/format-utils.js'
import { getFindIdIndex } from '@/utils/math-utils.js'

import {
    getSongDetailAction,
    changeFirstLoad,
    getAddSongDetailAction,
} from '../../pages/player/store/actionCreator'

import { message } from 'antd'


function TopRanking(props) {

    const { info } = props

    const { tracks = [] } = info

    const { playList } = useSelector(
        state => ({
            playList: state.getIn(['player', 'playList']),
        }),
        shallowEqual
    )

    const dispatch = useDispatch()

    //播放音乐
    const playMusic = (e, item) => {
        //阻止超链接跳转
        e.preventDefault()
        //派发action 获取歌曲详情
        dispatch(getSongDetailAction(item.id))
        //不是首次加载，播放音乐
        dispatch(changeFirstLoad(false))
    }

    // 添加到播放列表
    const addPlayList = (e, item) => {
        // 阻止超链接跳转
        e.preventDefault()
        // 获取歌曲详情,添加到播放列表
        dispatch(getAddSongDetailAction(item.id))
        // 提示添加成功或失败
        const index = getFindIdIndex(playList, item.id)
        switch (index) {
            case -1:
                message.success({ content: '添加成功' })
                //#region 设置本地存储(暂时先不做)
                // localPlayList.push(item.id)
                // localStorage.setItem('localPlayList', JSON.stringify(localPlayList))
                //#endregion
                break
            default:
                message.success({ content: '不能添加重复的歌曲' })
        }
    }
    return (
        <TopRankingWrapper>
            <div className='ranking-header'>
                <div className='image'>
                    <img src={getSizeImage(info.coverImgUrl, 80)} alt="" />
                    <div className='image_cover'>
                        {info.name}
                    </div>
                </div>
                <div className='tit'>
                    <div>
                        <h3>{info.name}</h3>
                    </div>
                    <div className='btn'>
                        <a href="/discover/recommend" className='no-link sprite_02 text-indent play'></a>
                        <a href="/discover/recommend" className='no-link sprite_02 text-indent favourite'></a>
                    </div>
                </div>
            </div>
            <div className='ranking-list'>
                {tracks &&
                    tracks.length > 0 &&
                    tracks.slice(0, 10).map((item, index) => {
                        return (
                            <div key={item.id} className="list-item">
                                <div className='number'>{index + 1}</div>
                                <a href="/play" className='song-name text-nowrap' onClick={e => playMusic(e, item)}>
                                    {item.name}
                                </a>
                                <div className='oper'>
                                    <a
                                        href="/discover/recommend"
                                        className="sprite_02 btn play"
                                        onClick={e => playMusic(e, item)}
                                    >
                                        {item.name}
                                    </a>
                                    <a
                                        href="/discover/recommend"
                                        className="sprite_icon2 btn addto"
                                        onClick={e => addPlayList(e, item)}
                                    >
                                        {item.name}
                                    </a>
                                    <a href="/play" className="no-link sprite_02 btn favourite">
                                        {item.name}
                                    </a>
                                </div>
                            </div>
                        )
                    })}
            </div>
            <div className='ranking-footer'>
                <a href="/all" className="no-link show-all">
                    查看全部&gt;
                </a>
            </div>
        </TopRankingWrapper>
    )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps;
}

export default memo(TopRanking, arePropsEqual)