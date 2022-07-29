import React, { memo } from 'react'

import { SongItemWrapper } from './style'
import { NavLink } from 'react-router-dom'
import { getSizeImage } from '@/utils/format-utils.js'

import { useDispatch } from 'react-redux'

import { getSongDetailAction } from '@/pages/player/store'

import { PlayCircleOutlined } from '@ant-design/icons'

function SongItem(props) {

    const {
        currentRanking,
        coverPic,
        duration,
        singer,
        songId,
        songName,
        className = '',
    } = props

    const dispatch = useDispatch()

    const playMusic = (e, isTo = false) => {
        // 如果不跳转,那么组织超链接的默认行为
        if (!isTo) e.preventDefault()
        dispatch(getSongDetailAction(songId))
        // 播放音乐
        document.getElementById('audio').autoplay = true
    }

    return (
        <SongItemWrapper className={className} isPic={coverPic}>
            <div className='song-item rank-count'>{currentRanking}</div>
            {coverPic && (
                <NavLink
                    to="/discover/song"
                    className="song-item"
                    onClick={(e) => playMusic(e, true)}
                >
                    <img src={getSizeImage(coverPic, 50)} alt="" />
                </NavLink>
            )}
            <div className="song-item song-info">
                <PlayCircleOutlined
                    className="font-active"
                    onClick={(e) => playMusic(e)}
                />
                <a href="/play" onClick={(e) => playMusic(e)} className="text-nowrap">
                    {songName}
                </a>
            </div>
            <div className="song-item duration">{duration}</div>
            <NavLink
                to="/discover/song"
                className="song-item singer"
                onClick={(e) => playMusic(e, true)}
            >
                {singer}
            </NavLink>
        </SongItemWrapper>
    )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps
}

export default memo(SongItem, arePropsEqual)
