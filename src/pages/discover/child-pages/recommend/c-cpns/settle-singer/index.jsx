import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { getSettleSingerAction } from '../../store/actionCreator'

import { SETTLE_SINGER_COUNT } from '@/common/constants.js'
import { ArtistHeaderLine, SingerCover } from '../artist-hot-composition'
import { SettleSingerWrapper } from './style'

function SettleSinger() {

    const { settleSinger } = useSelector(
        state => ({
            settleSinger: state.getIn(['recommend', 'settleSinger']),
        }),
        shallowEqual
    )

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getSettleSingerAction(SETTLE_SINGER_COUNT))
    }, [dispatch])

    return (
        <SettleSingerWrapper>
            <ArtistHeaderLine titleSlot="入驻歌手" rightSlot="查看全部 >" />
            <div className="singer-container">
                {settleSinger && settleSinger.map(item => {
                    return <SingerCover key={item.id} info={item} />
                })}
            </div>
        </SettleSingerWrapper>

    )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps;
}

export default memo(SettleSinger, arePropsEqual)