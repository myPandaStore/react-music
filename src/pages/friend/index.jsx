import React, { memo } from 'react'

import { NotLogin } from './style';


function JMFriend() {
  let isLogin = false;
  return (
      <NotLogin isLogin={isLogin} className="w980">      
          <div className="not-login inner">
            <h2>登录网易云音乐</h2>
            <div className="detail">
              你可以关注明星和好友品味他们的私房歌单
              通过他们的动态发现更多精彩音乐
            </div>
            <div className="not-login btn-login">立即登录</div>
          </div>      
      </NotLogin>
  )
}

function arePropsEqual(prevProps, nextProps) {
  return prevProps === nextProps;
}

//React.memo用来缓存组件的渲染，避免不必要的更新与 PureComponent 十分类似，但不同的是， React.memo 只能用于函数组件 。
//注意：与 shouldComponentUpdate 不同的是，arePropsEqual 返回 true 时，不会触发 render，如果返回 false，则会。
//而 shouldComponentUpdate 刚好与其相反。
export default memo(JMFriend, arePropsEqual)