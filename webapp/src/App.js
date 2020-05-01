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
        { renderRoutes (routes) }
      </HashRouter>
    </Provider>
  );
}

export default App;
