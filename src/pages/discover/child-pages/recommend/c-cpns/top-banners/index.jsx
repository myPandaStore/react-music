//1.第三方开源库
import React, { memo, useState, useRef, useEffect, useCallback } from 'react'

//2.功能性东西
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getTopBannersAction } from '../../store/actionCreator'

//3.导入的组件
import { BannerWrapper, BannerLeft, BannerRight, BannerControl } from './style'
import { Carousel } from 'antd'

function TopBanners() {
    // 组件内state
    const [currentIndex, setCurrentIndex] = useState(0)

    // redux Hook 组件和redux关联: 获取数据和进行操作
    const dispatch = useDispatch()
    const { topBanners } = useSelector(
        state => ({
            // topBanners: state.get('recommend').get('topBanners')
            // 获取redux-reducer转换成Immutable对象的深层state
            topBanners: state.getIn(['recommend', 'topBanners']),
        }),

        //redux-immutable 解决了redux中的state不可变性的问题,因为要保证state不可变性,
        //在每次更新state之前都会将之前state进行一次拷贝,如果数据量大的话会非常消耗性能 
        //使用useSelector的缺点: 因为在useSelector的缺点在组件决定当前是否渲染之前会
        //进行一次引用对比,每次函数调用之后都会进行一次重新渲染 解决useSelector的缺点: 
        //使用shallowEqual进行优化,在组件决定是否被渲染之前,会进行一次浅层对比
        //如果该组件依赖的state并没有被更改,就不会进行渲染
        shallowEqual
    )


    const bannerRef = useRef()
    useEffect(() => {
        // 在组件渲染之后发送网络请求
        dispatch(getTopBannersAction())
    }, [dispatch])

    //useCallback作用:
    //有一个父组件，其中包含子组件，子组件接收一个函数作为props；通常而言，如果父组件更新了，子组件也会执行更新；但是大多数场景下，更新是没有必要的，我们可以借助useCallback来返回函数，然后把这个函数作为props传递给子组件；
    //这样，子组件就能避免不必要的更新。
    const bannerChange = useCallback((from, to) => {
        setCurrentIndex(to)
    }, [])

    const bgImage =
        topBanners &&
        topBanners[currentIndex] &&
        topBanners[currentIndex].imageUrl + '?imageView&blur=40x20'

    return (
        <BannerWrapper bgImage={bgImage}>
            <div className='banner w980'>
                <BannerLeft>
                    <Carousel
                        effect="fade"
                        autoplay={true}
                        ref={bannerRef}
                        beforeChange={bannerChange}
                    >
                        {topBanners && topBanners.map(item => {
                            return (
                                <div key={item.imageUrl}>
                                    <img src={item.imageUrl} alt={item.typeTitle} />
                                </div>
                            )
                        })}

                    </Carousel>
                </BannerLeft>
                <BannerRight />
                <BannerControl>
                    <button
                        className="btn"
                        onClick={() => bannerRef.current.prev()}
                    ></button>
                    <button
                        className="btn"
                        onClick={() => bannerRef.current.next()}
                    ></button>
                </BannerControl>
            </div>
        </BannerWrapper>
    )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps;
}

export default memo(TopBanners, arePropsEqual)
