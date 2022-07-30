import React, { memo, useRef, useState, useEffect, useCallback } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { headerLinks } from '../../common/local-data'

import { HeaderWrapper, HeaderLeft, HeaderRight } from './style'
import { debounce } from '@/utils/format-utils.js'

import {
    getSearchSongListAction,
    changeFocusStateAction,
} from './store/actionCreator'

function JMAppHeader() {

    const [isRedirect, setIsRedirect] = useState(false)
    const [value, setValue] = useState('')

    //确定头部点击高亮效果和底部红色小箭头
    function computedClassName({ isActive }) {
        return isActive ? 'header-item link-active' : "header-item"
    }

    //Header-Select-Item
    const showSelectItem = (item, index) => {
        if (index < 3) {
            return (
                <NavLink
                    key={item.title}
                    to={item.link}
                    // className={({isActive}) => isActive ? 'header-item link-active' : "header-item"}
                    className={computedClassName}
                >
                    <em>{item.title}</em>
                    <i className="icon"></i>
                </NavLink>
            )
        } else {
            return (
                <a href={item.link} key={item.title} className="header-item">
                    {item.title}
                </a>
            )
        }
    }

    const dispatch = useDispatch()
    const { searchSongList, focusState } = useSelector(
        (state) => ({
            searchSongList: state.getIn(['themeHeader', 'searchSongList']),
            focusState: state.getIn(['themeHeader', 'focusState']),
        }),
        shallowEqual
    )

    const inputRef = useRef()
    // (根据当前焦点状态设置input焦点)
    useEffect(() => {
        // 获取焦点
        if (focusState) inputRef.current.focus()
        // 失去焦点
        else inputRef.current.blur()
    }, [focusState])

    const changeInput = debounce((target) => {
        let value = target.value.trim()
        if (value.length < 1) return
        // 显示下拉框
        dispatch(changeFocusStateAction(true))
        // 发送网络请求
        dispatch(getSearchSongListAction(value))
    }, 400)

    // 获取焦点
    const handleFocus = useCallback(() => {
        // 更改为获取焦点状态
        dispatch(changeFocusStateAction(true))
        // 修改状态重定向状态
        setIsRedirect(false)
    }, [dispatch])

    // 表单回车:跳转到搜索详情
    const handleEnter = useCallback((e) => {
        dispatch(changeFocusStateAction(false))
        // 只要在搜索框回车: 都进行跳转
        setIsRedirect(true)
    }, [dispatch])

    // 点击当前item歌曲项
    // const changeCurrentSong = (id) => {
    //     //派发action
    //     dispatch(getSongDetailAction(id))
    //     // 隐藏下拉框
    //     dispatch(changeFocusStateAction(false))
    //     // 播放音乐
    //     document.getElementById('audio').autoplay = true
    // }

    return (
        <HeaderWrapper>
            <div className='content w1100'>
                <HeaderLeft>
                    <h1>
                        <a href="#/" className='logo sprite_01'>
                            网易云音乐
                        </a>
                    </h1>
                    <div className='header-group'>
                        {
                            headerLinks.map((item, index) => {
                                return showSelectItem(item, index)
                            })
                        }
                    </div>
                </HeaderLeft>
                <HeaderRight>
                    <div className='search-wrapper'>
                        <Input
                            ref={inputRef}
                            prefix={<SearchOutlined />}
                            className='search'
                            placeholder='音乐/电台/'
                            onChange={(e) => setIsRedirect(0) || setValue(e.target.value)}
                            onInput={({ target }) => changeInput(target)}
                            onFocus={handleFocus}
                            onPressEnter={(e) => handleEnter(e)}
                            value={value}
                        >
                        </Input>

                        {/* svg键盘图标 */}
                        <div className='icons-wrapper'>
                            <div className='ctrl-wrapper'>
                                <svg width="15" height="15" className="DocSearch-Control-Key-Icon">
                                    <path
                                        d="M4.505 4.496h2M5.505 5.496v5M8.216 4.496l.055 5.993M10 7.5c.333.333.5.667.5 1v2M12.326 4.5v5.996M8.384 4.496c1.674 0 2.116 0 2.116 1.5s-.442 1.5-2.116 1.5M3.205 9.303c-.09.448-.277 1.21-1.241 1.203C1 10.5.5 9.513.5 8V7c0-1.57.5-2.5 1.464-2.494.964.006 1.134.598 1.24 1.342M12.553 10.5h1.953"
                                        strokeWidth="1.2"
                                        stroke="currentColor"
                                        fill="none"
                                        strokeLinecap="square"
                                    ></path>
                                </svg>
                            </div>
                            <div className="k-wrapper">k</div>
                        </div>

                        {/* <div>下拉区域</div> */}
                        <div
                            className='down-slider'
                            style={{ display: focusState ? 'block' : 'none' }}
                        >
                            <div className='search-header'>
                                <span className='discover'>搜"歌曲"相关用户&gt;</span>
                            </div>

                            <div className='content'>
                                <div className='zuo'>
                                    <span className='song'>单曲</span>
                                </div>

                                {/* <div className="you"> */}
                                <span className="main">
                                    {searchSongList &&
                                        searchSongList.map((item) => {
                                            return (
                                                <div
                                                    className="item"
                                                    key={item.id}
                                                    // onClick={() => changeCurrentSong(item.id)}
                                                >
                                                    <span>{item.name}</span>-{item.artists[0].name}
                                                </div>
                                            )
                                        })}
                                </span>
                                {/* </div> */}
                            </div>
                        </div>
                    </div>
                    <div className='center'>创作者中心</div>
                    <div>登录</div>
                </HeaderRight>
            </div>
            <div className='red-line'></div>
        </HeaderWrapper>
    )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps;
}

//React.memo用来缓存组件的渲染，避免不必要的更新与 PureComponent 十分类似，但不同的是， React.memo 只能用于函数组件 。
//注意：与 shouldComponentUpdate 不同的是，arePropsEqual 返回 true 时，不会触发 render，如果返回 false，则会。
//而 shouldComponentUpdate 刚好与其相反。
export default memo(JMAppHeader, arePropsEqual)
