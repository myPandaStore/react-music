import React, { memo, useEffect, useState, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux';

import { SongListWrapper } from './style';
import ThemeHeader from '@/components/theme-header-rcm';
import { SONG_LIST_LIMIT } from '@/common/constants.js';

import { getSongListAction } from './store/actionCreators';

import SongCover from '@/components/song-cover';

import { Pagination } from 'antd';

function JMSong() {

    const [offset, setOffset] = useState(0);
    console.log('setOffset', setOffset)

    const dispatch = useDispatch();

    // other hook
    // useEffect(() => {
    //     dispatch(getSongListAction(SONG_LIST_LIMIT, 0));
    // }, [dispatch]);

    useEffect(() => {
        dispatch(getSongListAction(SONG_LIST_LIMIT, offset));
    }, [offset, dispatch]);

    const { songList } = useSelector(
        (state) => ({
            songList: state.getIn(['songList', 'songList']),
        }),
        shallowEqual
    );

    const changePage = useCallback((currentPage) => {
        // offset=(当前页数-1)*limit
        const targePageCount = (currentPage - 1) * SONG_LIST_LIMIT;
        setOffset(targePageCount);
        window.scroll(0, 0);
    }, []);

    const rightSlot = (
        <span>

        </span>
    )

    return (
        <SongListWrapper className='w980'>
            <ThemeHeader title="全部" keywords={[]} />
            <div className='content'>
                {
                    songList.map((songItem) => {
                        return (
                            <SongCover key={songItem.id} songList={songItem} width={150} />
                        )
                    })
                }
            </div>
            < Pagination
                defaultCurrent={1}
                total={370}
                onChange={(currentPage) => changePage(currentPage)}
            />
        </SongListWrapper>
    )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps;
}

export default memo(JMSong, arePropsEqual)