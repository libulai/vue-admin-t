// 动态添加url参数
export function urlQueryChange(val) {
  let url = window.location.href
  let urlWithoutParmas = url.split('?')[0]
  let parmas = ``
  Object.keys(val).forEach(item => {
    parmas += `&${item}=${val[item]}`
  })

  parmas = parmas.replace(/\&/, '?')
  var newurl = urlWithoutParmas + parmas;
  //向当前url添加参数，没有历史记录
  window.history.replaceState({
    path: urlWithoutParmas
  }, '', newurl);
}


export function GetRequest(urlStr) {
  if (typeof urlStr == "undefined") {
    var url = decodeURI(location.search); //获取url中"?"符后的字符串
  } else {
    var url = "?" + urlStr.split("?")[1];
  }
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    var strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}


export function setLocalStorage(name, value) {
  let querys = window.localStorage.getItem('query')

  if (querys) querys = JSON.parse(querys)
  else querys = {}
 
  querys[name] = value

  window.localStorage.setItem('query', JSON.stringify(querys))
}


export function getLocalStorage(name) {
  let querys = window.localStorage.getItem('query')
  return querys && JSON.parse(querys)[name]
}