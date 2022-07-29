import React, { memo, useEffect } from 'react'

import ThemeHeaderRcm from '@/components/theme-header-rcm'
import TopList from '../../../../../../components/top-ranking'

import { getTopListAction } from '../../store/actionCreator'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'

import { RankingWrapper } from './style'

function RecommendRanking() {
    const showIcon = { isShowIcon: true }

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getTopListAction(19723756))
        dispatch(getTopListAction(3779629))
        dispatch(getTopListAction(2884035))
    }, [dispatch])

    const { upRanking = [], originRanking = [], newRanking = [] } = useSelector(state => ({
        upRanking: state.getIn(['recommend', 'upRanking']),
        originRanking: state.getIn(['recommend', 'originRanking']),
        newRanking: state.getIn(['recommend', 'newRanking'])
    }), shallowEqual)

    return (
        <RankingWrapper>
            <ThemeHeaderRcm title="榜单" keywords={[]} showIcon={showIcon} />
            <div className='ranking-info'>
                <TopList info={upRanking}/>
                <TopList info={newRanking}/>
                <TopList info={originRanking}/>
            </div>
        </RankingWrapper>
    )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps;
}

export default memo(RecommendRanking, arePropsEqual)