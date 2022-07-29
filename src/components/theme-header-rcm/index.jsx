import React, { memo } from 'react'

import { RcmHeaderLeft, RcmHeaderRight, RcmHeaderWrapper } from './style'

function ThemeHeaderRmc(props) {
    const { title, keywords, showIcon, right, } = props
    return (
        <RcmHeaderWrapper showIcon={showIcon}>
            <RcmHeaderLeft>
                <h2 className="hot-title">
                    <a href="/discover/recommend" className="no-link hot-text">
                        {title}
                    </a>
                </h2>
                <ul className="keywords">
                    {keywords.map(item => {
                        return (
                            <li className="item" key={item}>
                                <a href="/">{item}</a>
                                <span className="line">|</span>
                            </li>
                        )
                    })}
                </ul>
            </RcmHeaderLeft>
            <RcmHeaderRight>
                <span>{right}</span>
                {showIcon && <i className="icon"></i>}
            </RcmHeaderRight>
        </RcmHeaderWrapper>
    )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps;
}

export default memo(ThemeHeaderRmc, arePropsEqual)