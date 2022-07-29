import React,{memo,Suspense} from 'react'
import { Provider } from 'react-redux'

//路由相关
import { renderRoutes } from 'react-router-config'
import { HashRouter } from 'react-router-dom'
import routes from './router'
import store from './store'

//用于页面和区块的加载中状态。
import { Spin } from 'antd'
import JMAppHeader from './components/app-header'
import JMAppFooter from './components/app-footer'


function App() {
  return (
    <Provider store={store}>
       <HashRouter>
        <JMAppHeader/>
        {/* 在动态导入的帮助下，React Suspense让我们轻松定义延迟加载的组件。
        fallback中声明OtherComponent加载完成前做的事，即可优化整个页面的交互 */}
        <Suspense fallback={<Spin />}>{renderRoutes(routes)}</Suspense>
        <JMAppFooter/>
      </HashRouter>
    </Provider>   
  )
}

function arePropsEqual(prevProps, nextProps) {
  return prevProps === nextProps;
}

//React.memo用来缓存组件的渲染，避免不必要的更新与 PureComponent 十分类似，但不同的是， React.memo 只能用于函数组件 。
//注意：与 shouldComponentUpdate 不同的是，arePropsEqual 返回 true 时，不会触发 render，如果返回 false，则会。
//而 shouldComponentUpdate 刚好与其相反。
export default memo( App, arePropsEqual)
