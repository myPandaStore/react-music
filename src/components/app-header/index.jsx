import React, { memo } from 'react'
import { NavLink } from 'react-router-dom'
import { Input } from 'antd'
import { SearchOutlined } from '@ant-design/icons'

import { headerLinks } from '../../common/local-data'

import { HeaderWrapper, HeaderLeft, HeaderRight } from './style'

function JMAppHeader() {

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

    // const inputRef = useRef()


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
                            prefix={<SearchOutlined/>} 
                            className='search'
                            placeholder='音乐/电台/视频/用户'>
                        </Input>

                        {/* svg键盘图标 */}
                        {/* <div className='icons-wrapper'>
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
                        </div> */}

                        {/* <div>下拉区域</div> */}
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
