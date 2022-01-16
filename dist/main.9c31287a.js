// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles

// eslint-disable-next-line no-global-assign
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  for (var i = 0; i < entry.length; i++) {
    newRequire(entry[i]);
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  return newRequire;
})({"epB2":[function(require,module,exports) {
var $siteList = $('.siteList');
var $lastLi = $siteList.find('li.last');
var x = localStorage.getItem('x');
var xObject = JSON.parse(x);
var hashMap = xObject || [{
    logo: 'A',
    url: 'https://www.acfun.cn'
}, {
    logo: 'B',
    url: 'https://www.bilibili.com/'
}];
var simplifyUrl = function simplifyUrl(url) {
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};
var render = function render() {
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach(function (node, index) {
        var $li = $('\n            <li>\n                <div class="site">\n                    <div class="logo">' + node.logo + '</div>\n                    <div class="link">' + simplifyUrl(node.url) + '</div>\n                    <div class="close">\n                        <svg class="icon">\n                            <use xlink:href="#icon-close"></use>\n                        </svg>\n                    </div>\n                </div>\n            </li>\n        ').insertBefore($lastLi);
        var ali = Array.from(document.querySelectorAll("li>.site"));
        ali[index].style.backgroundColor = randomColor(0.1);
        $li.on('click', function (e) {
            window.open(node.url);
        });
        $li.on('click', '.close', function (e) {
            e.stopPropagation(); // 阻止冒泡
            hashMap.splice(index, 1);
            render();
        });
    });
};

render();
$('.addButton').on('click', function () {
    var url = window.prompt('请问您要添加什么网址～');
    if (url.indexOf('http') !== 0) {
        url = 'https://' + url;
    }
    console.log(url);
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        logoType: 'text',
        url: url
    });
    render();
});
window.onbeforeunload = function () {
    var string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
};

$(document).on('keypress', function (e) {
    var key = e.key;

    for (var i = 0; i < hashMap.length; i++) {
        if (hashMap[i].logo.toLowerCase() === key) {
            window.open(hashMap[i].url);
        }
    }
});

$('input').on('keypress', function (e) {
    e.stopPropagation();
});
function randomColor(alpha) {
    //判断有没有传入透明值，没有传入的话，随机生成0-1之间的小数
    //Math.random()只能生成0-1之间的小数，不包含0跟1，Math.random()*10，是1-10之间的整数，除以10再四舍五入，就有可能得到0或者1.
    alpha = alpha == undefined ? (Math.random() * 10 / 10).toFixed(1) : alpha;
    //将参数转化成数值
    alpha = Number(alpha);
    //如果传入的参数是非数值，则让透明度为1
    if (isNaN(alpha)) alpha = 1;
    //颜色拼接
    var color = "rgba(";
    for (var i = 0; i < 3; i++) {
        color += parseInt(Math.random() * 256) + ",";
    }
    color += alpha + ")";
    return color;
}
},{}]},{},["epB2"], null)
//# sourceMappingURL=main.9c31287a.map