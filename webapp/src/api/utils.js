import { RankTypes } from './config'

export const getCount = count => {
  if (count < 0) return
  if (count < 10000) {
    return count
  } else if (Math.floor(count / 10000) < 10000) {
    return Math.floor(count / 1000) / 10 + '万'
  } else {
    return Math.floor (count / 10000000)/ 10 + "亿";
  }
}

export const debounce = (func, delay) => {
  let timeout = null
  // let args = Array.prototype.slice.call(arguments, 2)
  return function () {
    if (timeout) {
      clearTimeout(timeout)
    }
    timeout = setTimeout(() => {
      func.apply(this)
      clearTimeout(timeout)
    }, delay)
  }
}

// 找出第一个没有歌名的排行榜的索引
export const filterIndex = rankList => {
  for (let i = 0; i < rankList.length; i++) {
    if (rankList[i].tracks.length && !rankList[i+1].tracks.length) {
      return i + 1
    }
  }
}

// 找出排行榜的编号
export const filterIdx = name => {
  for (var key in RankTypes) {
    if (RankTypes[key] === name) {
      return key
    }
    return null
  }
}