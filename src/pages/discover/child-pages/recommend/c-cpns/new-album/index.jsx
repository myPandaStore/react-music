import React, { memo, useEffect, useRef } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'


import { getNewAlbumsAction } from '../../store/actionCreator'

import ThemeHeaderRmc from '../../../../../../components/theme-header-rcm'
import AlbumCover from '../../../../../../components/album-cover'
import { NewAlbumWrapper } from './style'

import { Carousel } from 'antd'

function NewAlbum() {

    const showIcon = {isShowIcon: true}

    const dispatch = useDispatch()

    const { newAlbums } = useSelector(
        state => ({
            newAlbums: state.getIn(['recommend', 'newAlbums']),
        }),
        shallowEqual
    )

    console.log(newAlbums)
    const albumRef = useRef()

    useEffect(() => {
        dispatch(getNewAlbumsAction())
    }, [dispatch])

    return (
        <NewAlbumWrapper>
            <ThemeHeaderRmc
                title="新碟上架"
                keywords={[]}
                showIcon = {showIcon}
            />
            <div className="content">
                <div className='inner'>
                    <Carousel dots={false} ref={albumRef}>
                        {[0, 1].map(item => {
                            return (
                                <div key={item} className="page">
                                    {/* item * 5, (item+1) * 5   第一次遍历0  5  第二次遍历 5  10  */}
                                    {newAlbums && newAlbums.slice(item * 5, (item + 1) * 5).map(cItem => {
                                        return (
                                            <AlbumCover
                                                key={cItem.id}
                                                info={cItem}
                                                size={100}
                                                width={118}
                                                bgp="-570px"
                                            >
                                                {cItem.name}
                                            </AlbumCover>
                                        )
                                    })}
                                </div>
                            )
                        })}
                    </Carousel>
                </div>
            </div>

        </NewAlbumWrapper>
    )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps;
}

export default memo(NewAlbum, arePropsEqual)