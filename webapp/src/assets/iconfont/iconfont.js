import { createGlobalStyle } from 'styled-components'

export const IconStyle = createGlobalStyle`
  @font-face {font-family: "iconfont";
    src: url('iconfont.eot?t=1588852883856'); /* IE9 */
    src: url('iconfont.eot?t=1588852883856#iefix') format('embedded-opentype'), /* IE6-IE8 */
    url('data:application/x-font-woff2;charset=utf-8;base64,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') format('woff2'),
    url('iconfont.woff?t=1588852883856') format('woff'),
    url('iconfont.ttf?t=1588852883856') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+ */
    url('iconfont.svg?t=1588852883856#iconfont') format('svg'); /* iOS 4.1- */
  }

  .iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  .icon-dianzan:before {
    content: "\e60d";
  }

  .icon-shoucangfill:before {
    content: "\e627";
  }

  .icon-gengduo:before {
    content: "\e7a8";
  }

  .icon-gengduo1:before {
    content: "\e6f3";
  }

  .icon-pinglun:before {
    content: "\e647";
  }

  .icon-back:before {
    content: "\e6a9";
  }

  .icon-earphone:before {
    content: "\e60c";
  }

  .icon-play:before {
    content: "\e600";
  }

  .icon-menu:before {
    content: "\e61d";
  }

  .icon-41:before {
    content: "\e62b";
  }

  .icon-Aa:before {
    content: "\e636";
  }

  .icon-icon-checkin:before {
    content: "\e615";
  }
`

