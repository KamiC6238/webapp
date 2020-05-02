import React from 'react';
import { renderRoutes } from 'react-router-config'
import { HashRouter } from 'react-router-dom'
import { GlobalStyle } from './style'
import { IconStyle } from './assets/iconfont/iconfont'
import { Provider } from 'react-redux'
import routes from './routes/index'
import store from './store/index'

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <GlobalStyle />
        <IconStyle />
        {/*
          renderRoutes只会渲染一层路由组件，所以如果有子路由，那么是不会被渲染出来的，
          需要到这个路由对应的组件下再次使用一次renderRouets(route.routes)来渲染
          第二层路由组件 
         */}
        { renderRoutes (routes) }
      </HashRouter>
    </Provider>
  );
}

export default App;
