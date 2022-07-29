import React, {memo} from 'react'
import { CategoryList, HeaderCategory } from './style'
import { dicoverMenu } from '@/common/local-data'
import { NavLink } from 'react-router-dom'
import { renderRoutes } from 'react-router-config'

function JMDiscover(props) {

  const { route } = props
  
  return (
    <HeaderCategory>
      <div className='top'>
          <CategoryList className='w1100'>
              {dicoverMenu.map((item) => {
                return (
                  <li key={item.title} className="item">
                    {/* 路由链接 */}
                    <NavLink to={item.link} activeClassName="menu-active">
                      {item.title}
                    </NavLink>
                  </li>
                )
              })}
          </CategoryList>
      </div>
      {/* 使用renderRoutes统一注册路由 */}
      {renderRoutes(route.routes)}
    </HeaderCategory>
  )
}

function arePropsEqual(prevProps, nextProps) {
    return prevProps === nextProps;
}

export default memo( JMDiscover, arePropsEqual)