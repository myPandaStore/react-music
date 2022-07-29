import React, { memo } from 'react'
import { NotLogin } from './style'

function JMMine(props) {
  let isLogin = false
  return (
    <div>
      <NotLogin isLogin={isLogin} className="w980">
        <div className="show-no-login">
          <div className="my_music inner" >
            <h2>登录网易云音乐</h2>
            <div className="my_music btn-login">立即登录</div>
          </div>
        </div>
      </NotLogin>
    </div>
  )
}

function arePropsEqual(prevProps, nextProps) {
  return prevProps === nextProps;
}

//React.memo用来缓存组件的渲染，避免不必要的更新与 PureComponent 十分类似，但不同的是， React.memo 只能用于函数组件 。
//注意：与 shouldComponentUpdate 不同的是，arePropsEqual 返回 true 时，不会触发 render，如果返回 false，则会。
//而 shouldComponentUpdate 刚好与其相反。
export default memo(JMMine, arePropsEqual)