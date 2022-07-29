import React, { memo } from 'react'

import { hotRadios } from '@/common/local-data.js'

import ArtistHeaderLine from '../artist-hot-composition/artist-header-line'

import HotCoverInfo from '../artist-hot-composition/hot-cover-info'

import { HotArtistWrapper } from './style'

function HotArtist() {
    return (
        <HotArtistWrapper>
            <ArtistHeaderLine titleSlot="热门主播" rightSlot="查看全部 >" />
            <div className="artist-container">
                {hotRadios.map(item => {
                    return <HotCoverInfo key={item.picUrl} info={item} />
                })}
            </div>
        </HotArtistWrapper>

    )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps;
}

export default memo(HotArtist, arePropsEqual)