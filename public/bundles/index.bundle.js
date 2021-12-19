/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(Object.prototype.hasOwnProperty.call(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/
/******/ 		return result;
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"index": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "bundles/";
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/Index.jsx","vendors~index"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "../shared/libs/utils.js":
/*!*******************************!*\
  !*** ../shared/libs/utils.js ***!
  \*******************************/
/*! exports provided: getCookie, setCookie, clamp, round, msToTime, toggleFullscreen, setToPercentParent, wait, mathZoom, normalizeVector, abs, deleteAllCookies, fixedLengthString, getStickString, getAverage, pick, interpolateColor, interpolateColors, device */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCookie", function() { return getCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCookie", function() { return setCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "clamp", function() { return clamp; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "round", function() { return round; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "msToTime", function() { return msToTime; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toggleFullscreen", function() { return toggleFullscreen; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setToPercentParent", function() { return setToPercentParent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "wait", function() { return wait; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mathZoom", function() { return mathZoom; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "normalizeVector", function() { return normalizeVector; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "abs", function() { return abs; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "deleteAllCookies", function() { return deleteAllCookies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fixedLengthString", function() { return fixedLengthString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getStickString", function() { return getStickString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getAverage", function() { return getAverage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "pick", function() { return pick; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateColor", function() { return interpolateColor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "interpolateColors", function() { return interpolateColors; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "device", function() { return device; });
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function getCookie(name) {
  var dc = document.cookie;
  var prefix = name + "=";
  var begin = dc.indexOf("; " + prefix);
  var end;

  if (begin == -1) {
    begin = dc.indexOf(prefix);
    if (begin !== 0) return null;
  } else {
    begin += 2;
    end = document.cookie.indexOf(";", begin);

    if (end == -1) {
      end = dc.length;
    }
  } // because unescape has been deprecated, replaced with decodeURI
  //return unescape(dc.substring(begin + prefix.length, end));


  return decodeURI(dc.substring(begin + prefix.length, end));
}
function setCookie(name, value, seconds) {
  var expires = "";

  if (seconds) {
    var date = new Date();
    date.setTime(date.getTime() + seconds * 1000);
    expires = "; expires=" + date.toUTCString();
  }

  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
function clamp(n, min, max) {
  return Math.min(Math.max(n, min), max);
}
function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}
function msToTime(duration) {
  // 	var milliseconds = parseInt((duration % 1000) / 100);
  var milliseconds = parseInt(duration / 1000 % 60 % 1 * 1000);
  var seconds = parseInt(duration / 1000 % 60);
  var minutes = parseInt(duration / (1000 * 60) % 60);
  var hours = parseInt(duration / (1000 * 60 * 60) % 24);
  hours = hours < 10 ? "0" + hours : hours;

  if (hours.length == 2 || hours.length == 3 && hours[0] == "0") {
    hours = hours.substr(1);
  }

  minutes = minutes < 10 ? "0" + minutes : minutes;

  if (minutes.length == 3 || minutes.length == 4) {
    minutes = minutes.substr(1);
  }

  seconds = seconds < 10 ? "0" + seconds : seconds;

  if (seconds.length == 3 || seconds.length == 4) {
    seconds = seconds.substr(1);
  } //seconds = seconds.replaceAll("-", "");


  if (seconds.length < 2) {
    seconds = "0" + seconds;
  }

  var time = hours + ":" + minutes + ":" + seconds + "." + milliseconds;
  time = time.replaceAll("-", ""); // remove negative signs

  return time;
}
function toggleFullscreen(elem) {
  // ## The below if statement seems to work better ## if ((document.fullScreenElement && document.fullScreenElement !== null) || (document.msfullscreenElement && document.msfullscreenElement !== null) || (!document.mozFullScreen && !document.webkitIsFullScreen)) {
  if (document.fullScreenElement !== undefined && document.fullScreenElement === null || document.msFullscreenElement !== undefined && document.msFullscreenElement === null || document.mozFullScreen !== undefined && !document.mozFullScreen || document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen) {
    if (elem.requestFullScreen) {
      elem.requestFullScreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullScreen) {
      elem.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    }
  } else {
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
}
function setToPercentParent(elem, percent) {
  $(elem).height(0);
  var parentHeight = $(elem).parent().height();
  var newHeight = percent / 100 * parentHeight;
  $(elem).height(newHeight);
} // like sleep, but worse:

function wait(ms) {
  var start = new Date().getTime();
  var end = start;

  while (end < start + ms) {
    end = new Date().getTime();
  }
} // brings number closer to target by accel

function mathZoom(current, target, accel) {
  if (current == target) {
    return current;
  }

  if (Math.abs(current - target) < accel) {
    return target;
  }

  if (current < target) {
    return current + accel;
  } else {
    return current - accel;
  }
}
function normalizeVector(vector, scale) {
  var norm = Math.sqrt(vector.x * vector.x + vector.y * vector.y);

  if (norm !== 0) {
    vector.x = scale * vector.x / norm;
    vector.y = scale * vector.y / norm;
  }

  return vector;
}
function abs(n) {
  return Math.abs(n);
} // delete all cookies:

function deleteAllCookies() {
  var cookies = document.cookie.split(";");

  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    var eqPos = cookie.indexOf("=");
    var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
  }
}
function fixedLengthString(string, pad, length) {
  string = string + "";

  while (string.length < length) {
    string = pad + string;
  }

  return string;
}
function getStickString(num) {
  // round to nearest tenth:
  num = (Math.round((num + 1) * 10) / 10).toFixed(2);
  var n = num * 10;

  if (n == 0) {
    return "900";
  }

  if (n == 10) {
    return "090";
  }

  if (n == 20) {
    return "009";
  }

  if (n < 10) {
    n = 10 - n;
    n = 90 + 90 * n;
  } else {
    n = (20 - n) * 9;
  }

  return String(n).padStart(3, "0");
}
function getAverage(array) {
  return array.reduce(function (a, b) {
    return a + b;
  }) / array.length;
}
function pick() {
  for (var _len = arguments.length, props = new Array(_len), _key = 0; _key < _len; _key++) {
    props[_key] = arguments[_key];
  }

  return function (o) {
    return props.reduce(function (a, e) {
      return _objectSpread(_objectSpread({}, a), {}, _defineProperty({}, e, o[e]));
    }, {});
  };
}
function interpolateColor(color1, color2, factor) {
  if (arguments.length < 3) {
    factor = 0.5;
  }

  var result = color1.slice();

  for (var i = 0; i < 3; i++) {
    result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
  }

  return result;
}
function interpolateColors(color1, color2, steps) {
  var stepFactor = 1 / (steps - 1),
      interpolatedColorArray = [];
  color1 = color1.match(/\d+/g).map(Number);
  color2 = color2.match(/\d+/g).map(Number);

  for (var i = 0; i < steps; i++) {
    interpolatedColorArray.push(interpolateColor(color1, color2, stepFactor * i));
  }

  return interpolatedColorArray;
}
var size = {
  mobile: "600px",
  tablet: "768px",
  laptop: "1024px",
  desktop: "1440px"
};
var device = {
  mobile: "@media (min-width: ".concat(size.mobile, ")"),
  tablet: "@media (min-width: ".concat(size.tablet, ")"),
  laptop: "@media (min-width: ".concat(size.laptop, ")"),
  desktop: "@media (min-width: ".concat(size.desktop, ")")
};

/***/ }),

/***/ "./src/App.jsx":
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var features_settings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! features/settings.js */ "./src/features/settings.js");
/* harmony import */ var _Main_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Main.jsx */ "./src/Main.jsx");
/* harmony import */ var _Room_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Room.jsx */ "./src/Room.jsx");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var recompose__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
/* harmony import */ var shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! shared/libs/utils.js */ "../shared/libs/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _styles;

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// react:
 // react-router:

 // redux:

 // actions:

 // redux-saga:
// main components:


 // components:
// secondary components:
// material ui:

 // recompose:

 // libs:

 // jss:

var styles = (_styles = {
  root: {
    display: "flex",
    justifyContent: "center",
    height: "100%"
  }
}, _defineProperty(_styles, shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_8__["device"].tablet, {
  root: {}
}), _defineProperty(_styles, shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_8__["device"].laptop, {
  root: {}
}), _styles);

var App = /*#__PURE__*/function (_Component) {
  _inherits(App, _Component);

  var _super = _createSuper(App);

  function App(props) {
    var _this;

    _classCallCheck(this, App);

    _this = _super.call(this, props);
    _this.socket = null;
    _this.state = {
      roomName: "",
      open: false
    };
    return _this;
  }

  _createClass(App, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.serverConnection) {
        this.serverConnection.close();
        this.serverConnection = null;
      }

      this.serverConnection = this.props.serverConnection;
      this.props.store.dispatch(Object(features_settings_js__WEBPACK_IMPORTED_MODULE_3__["updateSettings"])({
        theme: "spotify"
      }));
      document.title = "Democratic DJ"; // // listen to events and dispatch actions:
      // handleStreamEvents(this.socket, this.props.store.dispatch);
      // // handle outgoing events & listen to actions:
      // // and maybe dispatch more actions:
      // this.props.sagaMiddleware.run(handleStreamActions, {
      // 	socket: this.socket,
      // 	dispatch: this.props.store.dispatch,
      // });
    } //52#60952: *2 open() "/srv/www/fosse.co/htmlindex.html" failed (2: No such file or directory),
    // client: 107.199.173.141, server: fosse.co, request: "GET /dj/GKMLV/ HTTP/1.1", host: "fosse.co"
    // "/srv/www/fosse.co/html/projects/dj/public/dj/index.html" is not found (2: No such file or direc

  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      console.log("re-rendering dj-app.");
      console.log(this.props.match.path);
      var classes = this.props.classes;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.root
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_1__["Switch"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: "".concat(this.props.match.path, "dj/:roomName"),
        render: function render(props) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Room_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], _extends({}, props, {
            store: _this2.props.store,
            serverConnection: _this2.props.serverConnection // sagaMiddleware={this.props.sagaMiddleware}

          }));
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_1__["Route"], {
        path: this.props.match.path,
        render: function render(props) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Main_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], _extends({}, props, {
            store: _this2.props.store,
            serverConnection: _this2.props.serverConnection // sagaMiddleware={this.props.sagaMiddleware}

          }));
        }
      })));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

var mapStateToProps = function mapStateToProps(state) {
  return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

/* harmony default export */ __webpack_exports__["default"] = (Object(recompose__WEBPACK_IMPORTED_MODULE_7__["compose"])(react_router__WEBPACK_IMPORTED_MODULE_1__["withRouter"], Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__["withStyles"])(styles), Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps))(App));

/***/ }),

/***/ "./src/Index.jsx":
/*!***********************!*\
  !*** ./src/Index.jsx ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom */ "./node_modules/react-dom/index.js");
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-router-dom */ "./node_modules/react-router-dom/esm/react-router-dom.js");
/* harmony import */ var _material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/CssBaseline */ "./node_modules/@material-ui/core/esm/CssBaseline/index.js");
/* harmony import */ var _material_ui_styles__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/styles */ "./node_modules/@material-ui/styles/esm/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var notistack__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! notistack */ "./node_modules/notistack/dist/notistack.esm.js");
/* harmony import */ var components_Callback_jsx__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! components/Callback.jsx */ "./src/components/Callback.jsx");
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
/* harmony import */ var reducers_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! reducers/index.js */ "./src/reducers/index.js");
/* harmony import */ var features_settings_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! features/settings.js */ "./src/features/settings.js");
/* harmony import */ var _App_jsx__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./App.jsx */ "./src/App.jsx");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! socket.io-client */ "./node_modules/socket.io-client/lib/index.js");
/* harmony import */ var socket_io_client__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(socket_io_client__WEBPACK_IMPORTED_MODULE_15__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var IP = "https://fosse.co";
var PORT = 8001; // react:


 // react-router:


 // modals:
// material ui:



 // notistack:

 // components:
// import Loading from "shared/components/general/Loading.jsx";
// const Callback = lazy(() => import("components/Callback.jsx"));

 // const DJ = lazy(() => import("dj/App.jsx"));
// const Party = lazy(() => import("party/App.jsx"));
// redux:




var storeContext = /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext(); // import rootReducer from "./reducers";



var rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_9__["combineReducers"])({
  dj: reducers_index_js__WEBPACK_IMPORTED_MODULE_12__["default"],
  settings: features_settings_js__WEBPACK_IMPORTED_MODULE_13__["default"]
}); // components:

 // libs:



var Index = /*#__PURE__*/function (_Component) {
  _inherits(Index, _Component);

  var _super = _createSuper(Index);

  function Index(props) {
    var _this;

    _classCallCheck(this, Index);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "getTheme", function (themeName) {
      var theme = {};

      switch (themeName) {
        case "light":
          theme = {
            palette: {
              type: "light",
              primary: {
                main: "#2181ff" // #2181ff

              },
              secondary: {
                main: "#ff3b3b"
              },
              background: {
                paper: "#fafafa"
              }
            }
          };
          break;

        case "dark":
          theme = {
            palette: {
              type: "dark",
              primary: {
                main: "#2181ff" // #2181ff

              },
              secondary: {
                main: "#ff3b3b"
              },
              background: {
                paper: "#424242"
              }
            }
          };
          break;

        case "spotify":
          theme = {
            palette: {
              type: "dark",
              primary: {
                main: "#1db954"
              },
              secondary: {
                main: "#121212"
              },
              background: {
                paper: "#424242"
              }
            }
          };
          break;
      }

      return Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_6__["createTheme"])(theme);
    });

    _this.serverConnection = socket_io_client__WEBPACK_IMPORTED_MODULE_15___default()(IP, {
      path: "/".concat(PORT, "/socket.io"),
      transports: ["polling", "websocket", "xhr-polling", "jsonp-polling"]
    });
    _this.state = {
      theme: _this.getTheme("spotify")
    };
    var preloadedState = {
      settings: {},
      dj: {
        songs: {
          songName: "",
          songList: [],
          searchResults: []
        }
      } //   form: {},

    };
    _this.store = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_11__["configureStore"])({
      reducer: rootReducer,
      preloadedState: preloadedState // middleware: [this.sagaMiddleware],

    }); // let currentValue = null;
    // this.store.subscribe(() => {
    //   let previousValue = currentValue;
    //   currentValue = this.store.getState().settings.theme;
    //   if (previousValue !== currentValue && previousValue !== null) {
    //     this.setState({ theme: this.getTheme(currentValue) });
    //   }
    // });

    return _this;
  }

  _createClass(Index, [{
    key: "componentDidMount",
    value: function componentDidMount() {// this.switchTheme("dark");
      // this.switchTheme("spotify");
    }
  }, {
    key: "shouldComponentUpdate",
    value: function shouldComponentUpdate(nextProps, nextState) {
      return true;
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      console.log("re-rendering dj-index");
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_redux__WEBPACK_IMPORTED_MODULE_10__["Provider"], {
        store: this.store
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_styles__WEBPACK_IMPORTED_MODULE_5__["ThemeProvider"], {
        theme: this.state.theme
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(notistack__WEBPACK_IMPORTED_MODULE_7__["SnackbarProvider"], {
        maxSnack: 3
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_CssBaseline__WEBPACK_IMPORTED_MODULE_4__["default"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_3__["BrowserRouter"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__["Switch"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        path: "/dj/callback",
        render: function render(props) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Callback_jsx__WEBPACK_IMPORTED_MODULE_8__["default"], _extends({}, props, {
            store: _this2.store
          }));
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router__WEBPACK_IMPORTED_MODULE_2__["Route"], {
        path: "/",
        render: function render(props) {
          return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App_jsx__WEBPACK_IMPORTED_MODULE_14__["default"], _extends({}, props, {
            store: _this2.store,
            serverConnection: _this2.serverConnection
          }));
        }
      }))))));
    }
  }]);

  return Index;
}(react__WEBPACK_IMPORTED_MODULE_0__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (Index);
react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Index, null), document.getElementById("root"));

/***/ }),

/***/ "./src/Main.jsx":
/*!**********************!*\
  !*** ./src/Main.jsx ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var features_settings_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! features/settings.js */ "./src/features/settings.js");
/* harmony import */ var _material_ui_core_esm_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/esm/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _material_ui_core_esm_TextField__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @material-ui/core/esm/TextField */ "./node_modules/@material-ui/core/esm/TextField/index.js");
/* harmony import */ var _material_ui_core_esm_Dialog__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/esm/Dialog */ "./node_modules/@material-ui/core/esm/Dialog/index.js");
/* harmony import */ var _material_ui_core_esm_DialogActions__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/esm/DialogActions */ "./node_modules/@material-ui/core/esm/DialogActions/index.js");
/* harmony import */ var _material_ui_core_esm_DialogContent__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/esm/DialogContent */ "./node_modules/@material-ui/core/esm/DialogContent/index.js");
/* harmony import */ var _material_ui_core_esm_DialogContentText__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/esm/DialogContentText */ "./node_modules/@material-ui/core/esm/DialogContentText/index.js");
/* harmony import */ var _material_ui_core_esm_DialogTitle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/esm/DialogTitle */ "./node_modules/@material-ui/core/esm/DialogTitle/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var recompose__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
/* harmony import */ var shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! shared/libs/utils.js */ "../shared/libs/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _styles;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// react:
 // react-router:

 // redux:

 // actions:

 // redux-saga:
// main components:
// components:
// secondary components:







 // material ui:

 // recompose:

 // libs:

 // jss:

var styles = (_styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    height: "100vh",
    width: "100%",
    maxWidth: "600px",
    maxHeight: "700px",
    margin: "auto 0"
  }
}, _defineProperty(_styles, shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_13__["device"].tablet, {
  root: {}
}), _defineProperty(_styles, shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_13__["device"].laptop, {
  root: {
    maxWidth: "none",
    maxHeight: "none"
  }
}), _defineProperty(_styles, "textField", {
  margin: "0px"
}), _defineProperty(_styles, "formPart", {
  display: "flex",
  flexDirection: "row",
  // justifyContent: "space-evenly",
  justifyContent: "center",
  // width: "50%",
  height: "min-content" // padding: "0 20%",
  // margin: "0 5px",

}), _defineProperty(_styles, "centerText", {
  display: "flex !important",
  justifyContent: "center !important"
}), _defineProperty(_styles, "joinButton", {
  whiteSpace: "nowrap"
}), _styles);

var Main = /*#__PURE__*/function (_PureComponent) {
  _inherits(Main, _PureComponent);

  var _super = _createSuper(Main);

  function Main(props) {
    var _this;

    _classCallCheck(this, Main);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "componentWillUnmount", function () {
      _this.props.store.dispatch(Object(features_settings_js__WEBPACK_IMPORTED_MODULE_3__["updateSettings"])({
        theme: "dark"
      }));
    });

    _defineProperty(_assertThisInitialized(_this), "handleJoin", function () {
      _this.props.history.push("/dj/".concat(_this.state.roomName));
    });

    _defineProperty(_assertThisInitialized(_this), "handleCreate", function () {
      _this.socket.emit("createRoom", null, function (data) {
        if (data.success) {
          _this.setState({
            open: true,
            roomName: data.roomName
          });
        } else {
          alert(data.reason);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleClose", function () {
      _this.props.history.push("/dj/".concat(_this.state.roomName));

      _this.setState({
        open: false
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleText", function (event) {
      // console.log(event.target.value);
      _this.setState({
        roomName: event.target.value
      });
    });

    _this.socket = null;
    _this.state = {
      roomName: "",
      open: false
    };
    return _this;
  }

  _createClass(Main, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.socket) {
        this.socket.close();
        this.socket = null;
      }

      this.socket = this.props.serverConnection;
      this.props.store.dispatch(Object(features_settings_js__WEBPACK_IMPORTED_MODULE_3__["updateSettings"])({
        theme: "spotify"
      })); // // listen to events and dispatch actions:
      // handleStreamEvents(this.socket, this.props.store.dispatch);
      // // handle outgoing events & listen to actions:
      // // and maybe dispatch more actions:
      // this.props.sagaMiddleware.run(handleStreamActions, {
      // 	socket: this.socket,
      // 	dispatch: this.props.store.dispatch,
      // });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      console.log("re-rendering main");
      var classes = this.props.classes;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.root
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", {
        style: {
          textAlign: "center"
        }
      }, "Democratic DJ"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: classes.centerText
      }, "Join a Room"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.formPart
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_TextField__WEBPACK_IMPORTED_MODULE_5__["default"], {
        id: "outlined-name",
        label: "Room Name",
        className: classes.textField,
        value: this.state.roomName,
        onChange: this.handleText,
        margin: "normal",
        variant: "outlined"
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          width: "10px"
        }
      }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
        className: classes.joinButton,
        variant: "contained",
        color: "primary",
        size: "medium",
        onClick: this.handleJoin,
        onKeyPress: function onKeyPress(event) {
          if (event.key == "Enter") {
            _this2.handleJoin();
          }
        }
      }, "Join Room")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h2", {
        className: classes.centerText
      }, "OR"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.formPart
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
        variant: "contained",
        color: "secondary",
        size: "large",
        onClick: this.handleCreate
      }, "Create A Room")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_Dialog__WEBPACK_IMPORTED_MODULE_6__["default"], {
        open: this.state.open,
        onClose: this.handleClose,
        fullWidth: true,
        maxWidth: "sm"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_DialogTitle__WEBPACK_IMPORTED_MODULE_10__["default"], {
        id: "alert-dialog-title"
      }, "Room Created!"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_DialogContent__WEBPACK_IMPORTED_MODULE_8__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_DialogContentText__WEBPACK_IMPORTED_MODULE_9__["default"], {
        id: "alert-dialog-description"
      }, "A room has been created with the room name ", this.state.roomName)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_DialogActions__WEBPACK_IMPORTED_MODULE_7__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onClick: this.handleClose,
        color: "primary",
        variant: "contained"
      }, "OK"))));
    }
  }]);

  return Main;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

/* harmony default export */ __webpack_exports__["default"] = (Object(recompose__WEBPACK_IMPORTED_MODULE_12__["compose"])(react_router__WEBPACK_IMPORTED_MODULE_1__["withRouter"], Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_11__["withStyles"])(styles), Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps))(Main));

/***/ }),

/***/ "./src/Room.jsx":
/*!**********************!*\
  !*** ./src/Room.jsx ***!
  \**********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var features_songs_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! features/songs.js */ "./src/features/songs.js");
/* harmony import */ var components_general_SongList_jsx__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! components/general/SongList.jsx */ "./src/components/general/SongList.jsx");
/* harmony import */ var components_general_SongSubmitForm_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! components/general/SongSubmitForm.jsx */ "./src/components/general/SongSubmitForm.jsx");
/* harmony import */ var _material_ui_core_esm_Button__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/core/esm/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _material_ui_core_esm_TextField__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/esm/TextField */ "./node_modules/@material-ui/core/esm/TextField/index.js");
/* harmony import */ var _material_ui_core_esm_Dialog__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/esm/Dialog */ "./node_modules/@material-ui/core/esm/Dialog/index.js");
/* harmony import */ var _material_ui_core_esm_DialogActions__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @material-ui/core/esm/DialogActions */ "./node_modules/@material-ui/core/esm/DialogActions/index.js");
/* harmony import */ var _material_ui_core_esm_DialogContent__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @material-ui/core/esm/DialogContent */ "./node_modules/@material-ui/core/esm/DialogContent/index.js");
/* harmony import */ var _material_ui_core_esm_DialogTitle__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @material-ui/core/esm/DialogTitle */ "./node_modules/@material-ui/core/esm/DialogTitle/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var recompose__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
/* harmony import */ var shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! shared/libs/utils.js */ "../shared/libs/utils.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! localforage */ "./node_modules/localforage/dist/localforage.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_15__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _styles;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// react:
 // react-router:

 // redux:

 // redux-saga:

 // main components:
// components:


 // secondary components:






 // material ui:

 // recompose:

 // libs:


 // jss:

var styles = (_styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    // justifyContent: "space-between",
    fontSize: "16px",
    width: "100%",
    maxWidth: "600px"
  }
}, _defineProperty(_styles, shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_14__["device"].tablet, {
  root: {
    fontSize: "20px"
  }
}), _defineProperty(_styles, shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_14__["device"].laptop, {
  root: {}
}), _defineProperty(_styles, "textField", {
  margin: "0px"
}), _defineProperty(_styles, "formPart", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-evenly",
  // width: "50%",
  height: "min-content"
}), _defineProperty(_styles, "exportButton", {
  width: "80%"
}), _defineProperty(_styles, "logoutButton", {}), _defineProperty(_styles, "spotifyButtonsContainer", {
  display: "flex",
  justifyContent: "space-between"
}), _styles);

var Room = /*#__PURE__*/function (_PureComponent) {
  _inherits(Room, _PureComponent);

  var _super = _createSuper(Room);

  function Room(props) {
    var _this;

    _classCallCheck(this, Room);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleSubmitUsername", function () {
      if (_this.state.username === "") {
        alert("username can't be empty");
        return;
      }

      _this.socket.emit("joinRoom", {
        roomName: _this.roomName,
        username: _this.state.username
      }, function (data) {
        if (data.success) {
          _this.setState({
            openUsernameDialog: false
          });

          localforage__WEBPACK_IMPORTED_MODULE_15___default.a.setItem("dj:roomInfo", {
            roomName: _this.roomName,
            username: _this.state.username
          });
        } else {
          alert(data.reason);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleText", function (event) {
      _this.setState({
        username: event.target.value
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleLogin", function () {
      if (_this.state.username === "") {
        alert("something went wrong!");
        window.location.reload();
        return;
      }

      localforage__WEBPACK_IMPORTED_MODULE_15___default.a.setItem("dj:roomInfo", {
        roomName: _this.roomName,
        username: _this.state.username
      }).then(function () {
        window.location.href = "https://accounts.spotify.com/authorize?response_type=code&client_id=501dbd9176ef4ef9af88bfedf7cb7e5a\
					&scope=playlist-modify-private%20user-read-private%20user-read-email%20playlist-read-collaborative%20user-modify-playback-state%20playlist-modify-public%20playlist-read-private\
					&redirect_uri=https%3A%2F%2Ffosse.co%2Fdj%2Fcallback";
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleLogout", function () {
      localforage__WEBPACK_IMPORTED_MODULE_15___default.a.getItem("dj:roomInfo").then(function (value) {
        roomName = value.roomName;
        return localforage__WEBPACK_IMPORTED_MODULE_15___default.a.setItem("dj:roomInfo", _objectSpread(_objectSpread({}, value), {}, {
          code: null
        }));
      }).then(function () {
        window.location.reload();
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleCreatePlaylist", function () {
      _this.socket.emit("createPlaylist", {
        code: _this.state.code
      }, function (data) {
        if (data.success) {
          alert("playlist created on your spotify account!");
        } else {
          console.log(data.reason);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleLogout", function () {
      _this.socket.emit("createPlaylist", {
        code: _this.state.code
      }, function (data) {
        if (data.success) {
          alert("playlist created on your spotify account!");
        } else {
          console.log(data.reason);
        }
      });
    });

    _this.socket = null;
    _this.state = {
      username: "",
      roomName: "",
      openUsernameDialog: false,
      loggedIn: false,
      code: null
    };
    _this.roomName = null;
    return _this;
  }

  _createClass(Room, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      // // listen to events and dispatch actions:
      // handleStreamEvents(this.socket, this.props.store.dispatch);
      // // handle outgoing events & listen to actions:
      // // and maybe dispatch more actions:
      // this.props.sagaMiddleware.run(handleStreamActions, {
      // 	socket: this.socket,
      // 	dispatch: this.props.store.dispatch,
      // });
      this.socket = this.props.serverConnection;
      this.roomName = this.props.match.params.roomName;

      if (!this.roomName) {
        console.log("room name not set!");
      }

      this.socket.on("songList", function (data) {
        _this2.props.updateSongList(data.songList);
      });
      localforage__WEBPACK_IMPORTED_MODULE_15___default.a.getItem("dj:roomInfo").then(function (value) {
        if (value) {
          if (value.username) {
            _this2.socket.emit("joinRoom", {
              roomName: _this2.roomName,
              username: value.username
            }, function (data) {
              if (data.success) {
                if (value.code) {
                  _this2.socket.emit("verifyToken", {
                    code: value.code
                  }, function (data) {
                    if (data.success) {
                      _this2.setState({
                        openUsernameDialog: false,
                        username: value.username,
                        loggedIn: true,
                        code: value.code
                      });
                    } else {
                      console.log(data.reason);

                      _this2.setState({
                        openUsernameDialog: false,
                        username: value.username
                      });
                    }
                  });
                } else {
                  _this2.setState({
                    username: value.username
                  });
                }
              } else {
                _this2.setState({
                  openUsernameDialog: true
                });
              }
            });
          } else {
            localforage__WEBPACK_IMPORTED_MODULE_15___default.a.clear();
          }
        } else {
          _this2.setState({
            openUsernameDialog: true
          });
        }
      })["catch"](function (error) {
        _this2.setState({
          openUsernameDialog: true
        });
      });
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {} // shouldComponentUpdate(nextProps, nextState) {
    // 	return false;
    // }

  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      console.log("rendering dj-room.");
      var classes = this.props.classes;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.root
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_general_SongSubmitForm_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], {
        serverConnection: this.props.serverConnection
      }), this.props.searchResults.length > 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_general_SongList_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
        serverConnection: this.props.serverConnection,
        source: this.props.searchResults,
        type: "results"
      }), this.props.searchResults.length === 0 && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_general_SongList_jsx__WEBPACK_IMPORTED_MODULE_4__["default"], {
        serverConnection: this.props.serverConnection,
        username: this.state.username,
        source: this.props.songList,
        type: "songs"
      }), !this.state.loggedIn ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_Button__WEBPACK_IMPORTED_MODULE_6__["default"], {
        className: classes.exportButton,
        onClick: this.handleLogin,
        color: "primary",
        variant: "contained"
      }, "Login to Spotify") : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.spotifyButtonsContainer
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_Button__WEBPACK_IMPORTED_MODULE_6__["default"], {
        className: classes.exportButton,
        onClick: this.handleCreatePlaylist,
        color: "primary",
        variant: "contained"
      }, "Export to Spotify"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_Button__WEBPACK_IMPORTED_MODULE_6__["default"], {
        className: classes.logoutButton,
        onClick: this.handleLogout,
        color: "primary",
        variant: "contained"
      }, "Logout")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_Dialog__WEBPACK_IMPORTED_MODULE_8__["default"], {
        open: this.state.openUsernameDialog,
        onClose: function onClose() {},
        fullWidth: true,
        maxWidth: "sm"
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_DialogTitle__WEBPACK_IMPORTED_MODULE_11__["default"], {
        id: "alert-dialog-title"
      }, "Pick a username"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_DialogContent__WEBPACK_IMPORTED_MODULE_10__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_TextField__WEBPACK_IMPORTED_MODULE_7__["default"], {
        autoFocus: true,
        margin: "dense",
        id: "name",
        label: "Username",
        type: "username",
        value: this.state.username,
        onChange: this.handleText,
        onKeyPress: function onKeyPress(event) {
          if (event.key == "Enter") {
            _this3.handleSubmitUsername();
          }
        },
        fullWidth: true
      })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_DialogActions__WEBPACK_IMPORTED_MODULE_9__["default"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_Button__WEBPACK_IMPORTED_MODULE_6__["default"], {
        onClick: this.handleSubmitUsername,
        color: "primary",
        variant: "contained"
      }, "Submit"))));
    }
  }]);

  return Room;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    songList: state.dj.songs.songList,
    searchResults: state.dj.songs.searchResults
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateSongList: function updateSongList(data) {
      dispatch(Object(features_songs_js__WEBPACK_IMPORTED_MODULE_3__["updateSongList"])(data));
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(recompose__WEBPACK_IMPORTED_MODULE_13__["compose"])(react_router__WEBPACK_IMPORTED_MODULE_1__["withRouter"], Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_12__["withStyles"])(styles), Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps))(Room));

/***/ }),

/***/ "./src/components/Callback.jsx":
/*!*************************************!*\
  !*** ./src/components/Callback.jsx ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router */ "./node_modules/react-router/esm/react-router.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var recompose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
/* harmony import */ var shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! shared/libs/utils.js */ "../shared/libs/utils.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! query-string */ "./node_modules/query-string/index.js");
/* harmony import */ var query_string__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(query_string__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! localforage */ "./node_modules/localforage/dist/localforage.js");
/* harmony import */ var localforage__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(localforage__WEBPACK_IMPORTED_MODULE_7__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var _styles;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// react:
 // react-router:

 // redux:

 // material ui:

 // recompose:

 // libs:



 // jss:

var styles = (_styles = {
  root: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    // height: "100vh",
    justifyContent: "center",
    margin: "0 auto",
    maxWidth: "700px"
  }
}, _defineProperty(_styles, shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_5__["device"].tablet, {
  root: {}
}), _defineProperty(_styles, shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_5__["device"].laptop, {
  root: {}
}), _defineProperty(_styles, "links", {
  display: "flex",
  flexDirection: "column"
}), _styles);

var Callback = /*#__PURE__*/function (_PureComponent) {
  _inherits(Callback, _PureComponent);

  var _super = _createSuper(Callback);

  function Callback(props) {
    var _this;

    _classCallCheck(this, Callback);

    _this = _super.call(this, props);
    _this.state = {};
    return _this;
  }

  _createClass(Callback, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this2 = this;

      var values = query_string__WEBPACK_IMPORTED_MODULE_6___default.a.parse(this.props.location.search); // localforage
      // 	.setItem("dj:code", values.code)
      // 	.then(() => {
      // 		return localforage.getItem("dj:roomInfo");
      // 	})
      // 	.then((value) => {
      // 		this.props.history.replace(`/dj/${value.roomName}`);
      // 	})
      // 	.catch((error) => {
      // 		console.log("error getting/setting value!: " + error);
      // 	});

      if (values.code) {
        var roomName = null;
        localforage__WEBPACK_IMPORTED_MODULE_7___default.a.getItem("dj:roomInfo").then(function (value) {
          roomName = value.roomName;
          return localforage__WEBPACK_IMPORTED_MODULE_7___default.a.setItem("dj:roomInfo", _objectSpread(_objectSpread({}, value), {}, {
            code: values.code
          }));
        }).then(function () {
          _this2.props.history.replace("/dj/".concat(roomName));
        })["catch"](function (error) {
          console.log("error getting/setting value!: " + error);
        });
      } else {
        console.log("no access code!");
      }
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {}
  }, {
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        className: classes.root
      });
    }
  }]);

  return Callback;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

/* harmony default export */ __webpack_exports__["default"] = (Object(recompose__WEBPACK_IMPORTED_MODULE_4__["compose"])(react_router__WEBPACK_IMPORTED_MODULE_1__["withRouter"], Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_3__["withStyles"])(styles), Object(react_redux__WEBPACK_IMPORTED_MODULE_2__["connect"])(mapStateToProps, mapDispatchToProps))(Callback));

/***/ }),

/***/ "./src/components/general/Song.jsx":
/*!*****************************************!*\
  !*** ./src/components/general/Song.jsx ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_esm_IconButton__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/esm/IconButton */ "./node_modules/@material-ui/core/esm/IconButton/index.js");
/* harmony import */ var _material_ui_core_esm_Paper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/esm/Paper */ "./node_modules/@material-ui/core/esm/Paper/index.js");
/* harmony import */ var _material_ui_core_esm_Button__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/esm/Button */ "./node_modules/@material-ui/core/esm/Button/index.js");
/* harmony import */ var _SongPreview_jsx__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SongPreview.jsx */ "./src/components/general/SongPreview.jsx");
/* harmony import */ var _material_ui_icons_esm_ArrowUpward__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @material-ui/icons/esm/ArrowUpward */ "./node_modules/@material-ui/icons/esm/ArrowUpward.js");
/* harmony import */ var _material_ui_icons_esm_ArrowDownward__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/icons/esm/ArrowDownward */ "./node_modules/@material-ui/icons/esm/ArrowDownward.js");
/* harmony import */ var _material_ui_icons_esm_Close__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/icons/esm/Close */ "./node_modules/@material-ui/icons/esm/Close.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var features_songs_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! features/songs.js */ "./src/features/songs.js");
/* harmony import */ var recompose__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
/* harmony import */ var shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! shared/libs/utils.js */ "../shared/libs/utils.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! classnames */ "./node_modules/classnames/index.js");
/* harmony import */ var classnames__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(classnames__WEBPACK_IMPORTED_MODULE_13__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// react:
 // material ui:

 // components:




 // icons:



 // redux:


 // recompose:

 // libs:


 // jss:

var styles = function styles(theme) {
  var _ref;

  return _ref = {
    root: {
      display: "flex",
      flexDirection: "row",
      minHeight: "85px",
      fontSize: "16px"
    },
    upvoteArea: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      margin: "0 10px"
    },
    songUpvotes: {
      alignSelf: "center",
      // position: "absolute",
      fontSize: "0.8em"
    },
    placeNum: {
      textAlign: "center",
      alignSelf: "center",
      margin: "0 10px",
      fontSize: "0.8em"
    }
  }, _defineProperty(_ref, shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_12__["device"].tablet, {
    root: {
      minHeight: "150px",
      fontSize: "20px"
    },
    upvoteArea: {
      justifyContent: "space-between",
      margin: "0 5px"
    },
    songUpvotes: {
      // position: "relative",
      fontSize: "1em"
    },
    placeNum: {
      margin: "0 5px",
      fontSize: "1em"
    }
  }), _defineProperty(_ref, shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_12__["device"].laptop, {
    root: {}
  }), _defineProperty(_ref, "highlighted", {
    backgroundColor: "#FAFAD2AA"
  }), _defineProperty(_ref, "songName", {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    "& span:last-child": {
      fontSize: "0.8em"
    }
  }), _defineProperty(_ref, "icon", {// width: "70px",
    // height: "70px",
  }), _defineProperty(_ref, "songSuggester", {
    // marginLeft: "auto",
    // marginRight: "20px",
    fontSize: "0.8em",
    // alignSelf: "center",
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    justifyContent: "center",
    whiteSpace: "nowrap"
  }), _defineProperty(_ref, "removeArea", {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginRight: "10px"
  }), _defineProperty(_ref, "submitButton", {
    marginLeft: "auto",
    marginRight: "10px",
    marginTop: "auto",
    marginBottom: "auto"
  }), _ref;
};

var Song = /*#__PURE__*/function (_PureComponent) {
  _inherits(Song, _PureComponent);

  var _super = _createSuper(Song);

  function Song(props) {
    var _this;

    _classCallCheck(this, Song);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleSubmitSong", function () {
      _this.props.serverConnection.emit("submitSong", {
        songData: _this.props.songData
      }, function (data) {
        if (!data.success) {
          alert(data.reason);
        }
      });

      _this.props.updateSongName("");

      _this.props.updateSearchResults([]);
    });

    _defineProperty(_assertThisInitialized(_this), "handleUpvote", function () {
      if (_this.upvoteState === 1) {
        _this.neutralVote();

        return;
      }

      _this.props.serverConnection.emit("vote", {
        songName: _this.props.songData.songName,
        type: "up"
      }, function (data) {
        if (data.success) {// this.upvoteState = 1;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleDownvote", function () {
      if (_this.upvoteState === -1) {
        _this.neutralVote();

        return;
      }

      _this.props.serverConnection.emit("vote", {
        songName: _this.props.songData.songName,
        type: "down"
      }, function (data) {
        if (data.success) {// this.upvoteState = -1;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "neutralVote", function () {
      _this.props.serverConnection.emit("vote", {
        songName: _this.props.songData.songName,
        type: "neutral"
      }, function (data) {
        if (data.success) {// this.upvoteState = 0;
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleRemove", function () {
      _this.props.serverConnection.emit("removeSong", {
        songName: _this.props.songData.songName
      }, function (data) {
        if (data.success) {}
      });
    });

    _this.upvoteState = 0;
    return _this;
  }

  _createClass(Song, [{
    key: "componentDidMount",
    value: function componentDidMount() {} // shouldComponentUpdate(nextProps, nextState) {
    // }

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {// this.setState({ upvoteState: 0 });
    }
  }, {
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      var isMobile = window.innerWidth < 768;
      var albumImage = this.props.songData.album.images[isMobile ? 2 : 1];
      var buttonSize = isMobile ? "small" : "medium";

      if (this.props.isResult) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_Paper__WEBPACK_IMPORTED_MODULE_3__["default"], {
          className: classes.root,
          elevation: 4
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SongPreview_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], {
          imageURL: albumImage.url,
          audioURL: this.props.songData.preview_url,
          songName: this.props.songData.songName,
          artistName: this.props.songData.album.artists[0].name
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          style: {
            width: "20px"
          }
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: classes.songName
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, this.props.songData.songName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, this.props.songData.album.artists[0].name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_Button__WEBPACK_IMPORTED_MODULE_4__["default"], {
          className: classes.submitButton,
          onClick: this.handleSubmitSong,
          color: "primary",
          variant: "contained",
          size: "large"
        }, "Submit"));
      } else {
        var votes = this.props.songData.votes;

        for (var i = 0; i < votes.length; i++) {
          var vote = votes[i];

          if (vote.username === this.props.username) {
            if (vote.type === "up") {
              this.upvoteState = 1;
            } else if (vote.type === "down") {
              this.upvoteState = -1;
            } else if (vote.type === "neutral") {
              this.upvoteState = 0;
            }

            break;
          }
        }

        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_Paper__WEBPACK_IMPORTED_MODULE_3__["default"], {
          className: classes.root,
          elevation: 4
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: classes.placeNum
        }, "#", this.props.num + 1), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: classes.upvoteArea
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_IconButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
          variant: "contained",
          color: "primary",
          size: buttonSize,
          onClick: this.handleUpvote,
          className: classnames__WEBPACK_IMPORTED_MODULE_13___default()(classes.icon, this.upvoteState === 1 && classes.highlighted)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_esm_ArrowUpward__WEBPACK_IMPORTED_MODULE_6__["default"], null)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: classes.songUpvotes
        }, this.props.songData.upvotes), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_IconButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
          variant: "contained",
          color: "secondary",
          size: buttonSize,
          onClick: this.handleDownvote,
          className: classnames__WEBPACK_IMPORTED_MODULE_13___default()(classes.icon, this.upvoteState === -1 && classes.highlighted)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_esm_ArrowDownward__WEBPACK_IMPORTED_MODULE_7__["default"], null))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_SongPreview_jsx__WEBPACK_IMPORTED_MODULE_5__["default"], {
          imageURL: albumImage.url,
          audioURL: this.props.songData.preview_url,
          songName: this.props.songData.songName,
          artistName: this.props.songData.album.artists[0].name
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          style: {
            width: "20px"
          }
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: classes.songName
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, this.props.songData.songName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("span", null, this.props.songData.album.artists[0].name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          style: {
            minWidth: "10px",
            flex: "1"
          }
        }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          style: {
            width: "10px"
          }
        }), this.props.songData.username === this.props.username && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: classes.removeArea
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_IconButton__WEBPACK_IMPORTED_MODULE_2__["default"], {
          variant: "contained",
          color: "secondary",
          size: buttonSize,
          onClick: this.handleRemove,
          className: classnames__WEBPACK_IMPORTED_MODULE_13___default()(classes.icon, this.upvoteState === -1 && classes.highlighted)
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_esm_Close__WEBPACK_IMPORTED_MODULE_8__["default"], null))));
      }
    }
  }]);

  return Song;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateSongName: function updateSongName(data) {
      dispatch(Object(features_songs_js__WEBPACK_IMPORTED_MODULE_10__["updateSongName"])(data));
    },
    updateSearchResults: function updateSearchResults(data) {
      dispatch(Object(features_songs_js__WEBPACK_IMPORTED_MODULE_10__["updateSearchResults"])(data));
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(recompose__WEBPACK_IMPORTED_MODULE_11__["compose"])(Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["withStyles"])(styles), Object(react_redux__WEBPACK_IMPORTED_MODULE_9__["connect"])(mapStateToProps, mapDispatchToProps, null, {
  forwardRef: true
}))(Song));

/***/ }),

/***/ "./src/components/general/SongList.jsx":
/*!*********************************************!*\
  !*** ./src/components/general/SongList.jsx ***!
  \*********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Song_jsx__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Song.jsx */ "./src/components/general/Song.jsx");
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_esm_Paper__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/esm/Paper */ "./node_modules/@material-ui/core/esm/Paper/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var recompose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
/* harmony import */ var react_flip_move__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-flip-move */ "./node_modules/react-flip-move/dist/react-flip-move.es.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

// react:
 // import PropTypes from "prop-types";
// components:

 // material ui:


 // redux:

 // recompose:

 // libs:

 // import swal from "sweetalert2";
// jss:

var styles = function styles(theme) {
  return {
    root: {
      // display: "flex",
      display: "grid",
      flexDirection: "column",
      gridGap: "5px",
      padding: "10px",
      overflowY: "auto",
      overflowX: "hidden",
      position: "relative",
      margin: "10px 0"
    },
    noSongs: {
      textAlign: "center"
    }
  };
};

var SongList = /*#__PURE__*/function (_PureComponent) {
  _inherits(SongList, _PureComponent);

  var _super = _createSuper(SongList);

  function SongList(props) {
    var _this;

    _classCallCheck(this, SongList);

    _this = _super.call(this, props); // this.handleClick = this.handleClick.bind(this);

    _this.state = {};
    return _this;
  }

  _createClass(SongList, [{
    key: "handleClick",
    value: function handleClick(event) {}
  }, {
    key: "mapSongs",
    value: function mapSongs() {
      var songs = [];

      for (var i = 0; i < this.props.source.length; i++) {
        var song = this.props.source[i];
        songs.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Song_jsx__WEBPACK_IMPORTED_MODULE_1__["default"], {
          key: song.uri,
          num: i,
          serverConnection: this.props.serverConnection,
          username: this.props.username,
          songData: _objectSpread({}, song),
          isResult: this.props.type === "results"
        }));
      }

      if (songs.length === 0) {
        songs.push( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: 0,
          className: this.props.classes.noSongs
        }, this.props.type === "songs" ? "No songs submitted yet!" : "No Songs Found!"));
      }

      return songs;
    }
  }, {
    key: "render",
    value: function render() {
      var classes = this.props.classes;

      if (this.props.source.length === 0) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_Paper__WEBPACK_IMPORTED_MODULE_3__["default"], {
          id: "songList",
          className: classes.root,
          elevation: 4
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          key: 0,
          className: this.props.classes.noSongs
        }, this.props.type === "songs" ? "No songs submitted yet!" : "No Songs Found!"));
      }

      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_Paper__WEBPACK_IMPORTED_MODULE_3__["default"], {
        id: "songList",
        className: classes.root,
        elevation: 4
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_flip_move__WEBPACK_IMPORTED_MODULE_6__["default"], {
        typeName: null,
        duration: 250,
        staggerDelayBy: 0,
        enterAnimation: "fade",
        leaveAnimation: "fade"
      }, this.mapSongs()), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
        style: {
          height: "4px"
        }
      }));
    }
  }]);

  return SongList;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

/* harmony default export */ __webpack_exports__["default"] = (Object(recompose__WEBPACK_IMPORTED_MODULE_5__["compose"])(Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_2__["withStyles"])(styles), Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps))(SongList));

/***/ }),

/***/ "./src/components/general/SongPreview.jsx":
/*!************************************************!*\
  !*** ./src/components/general/SongPreview.jsx ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_icons_PlayCircleFilledTwoTone__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/icons/PlayCircleFilledTwoTone */ "./node_modules/@material-ui/icons/PlayCircleFilledTwoTone.js");
/* harmony import */ var _material_ui_icons_PlayCircleFilledTwoTone__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_PlayCircleFilledTwoTone__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_icons_PauseCircleFilledTwoTone__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/icons/PauseCircleFilledTwoTone */ "./node_modules/@material-ui/icons/PauseCircleFilledTwoTone.js");
/* harmony import */ var _material_ui_icons_PauseCircleFilledTwoTone__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_icons_PauseCircleFilledTwoTone__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var recompose__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
/* harmony import */ var shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! shared/libs/utils.js */ "../shared/libs/utils.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// react:
 // material ui:

 // import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
// import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
// import CloseIcon from "@material-ui/icons/Close";
// components:
// import { IconButton, Paper, Button } from "@material-ui/core";
// import MySlider from "dj/components/General/MySlider.jsx";
// icons:
// import PlayArrowIcon from "@material-ui/icons/PlayArrow";
// import PlayCircleFilledIcon from "@material-ui/icons/PlayCircleFilled";

 // import PauseIcon from "@material-ui/icons/Pause";
// import PauseCircleFilledIcon from "@material-ui/icons/PauseCircleFilled";
// import PauseCircleOutlineIcon from "@material-ui/icons/PauseCircleOutline";

 // redux:

 // recompose:

 // libs:

 // jss:

var styles = function styles(theme) {
  var _ref;

  return _ref = {
    root: {
      display: "flex",
      flexDirection: "row",
      minHeight: "75px",
      fontSize: "16px",
      position: "relative"
    },
    albumArt: {
      alignSelf: "center",
      width: "75px",
      height: "auto",
      cursor: "pointer",
      borderRadius: "8px"
    },
    icon: {
      pointerEvents: "none",
      fontSize: "50px",
      opacity: 0.7,
      position: "absolute",
      // left: "calc(50% - 0.5em)",
      // top: "calc(50% - 0.5em)",
      left: "50%",
      marginLeft: "-0.5em",
      top: "50%",
      marginTop: "-0.5em"
    }
  }, _defineProperty(_ref, shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_6__["device"].tablet, {
    root: {
      minHeight: "150px",
      fontSize: "20px"
    },
    albumArt: {
      width: "150px"
    },
    icon: {
      fontSize: "90px"
    }
  }), _defineProperty(_ref, shared_libs_utils_js__WEBPACK_IMPORTED_MODULE_6__["device"].laptop, {
    root: {}
  }), _ref;
};

var SongPreview = /*#__PURE__*/function (_PureComponent) {
  _inherits(SongPreview, _PureComponent);

  var _super = _createSuper(SongPreview);

  function SongPreview(props) {
    var _this;

    _classCallCheck(this, SongPreview);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleClick", function () {
      if (_this.state.playing) {
        if (_this.audio) {
          _this.audio.pause();

          _this.audio.currentTime = 0;
        }

        document.title = "Democratic DJ";

        _this.setState({
          playing: false
        });
      } else {
        if (!_this.audio && _this.props.audioURL) {
          _this.audio = new Audio(_this.props.audioURL);
          _this.audio.volume = 0.1;
        }

        if (_this.props.audioURL) {
          _this.audio.play();
        }

        document.title = "".concat(_this.props.songName);

        _this.setState({
          playing: true
        });
      }
    });

    _this.state = {
      playing: false
    };
    _this.audio = null;
    return _this;
  }

  _createClass(SongPreview, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      if (this.props.audioURL) {
        this.audio = new Audio(this.props.audioURL);
        this.audio.volume = 0.1;
      }
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      // Typical usage (don't forget to compare props):
      if (this.props.audioURL !== prevProps.audioURL) {
        if (prevProps.audioURL) {
          this.audio.pause();
        }

        if (this.props.audioURL) {
          this.audio = new Audio(this.props.audioURL);
          this.audio.volume = 0.1;
        }
      }
    } // shouldComponentUpdate(nextProps, nextState) {
    // }

  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {// this.setState({ upvoteState: 0 });
    }
  }, {
    key: "render",
    value: function render() {
      var classes = this.props.classes;

      if (!this.props.audioURL) {
        console.log(this.props.songName);
      }

      if (this.props.audioURL) {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: classes.root,
          onClick: this.handleClick
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          className: classes.albumArt,
          src: this.props.imageURL
        }), this.state.playing ? /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_PauseCircleFilledTwoTone__WEBPACK_IMPORTED_MODULE_3___default.a, {
          className: classes.icon
        }) : /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_icons_PlayCircleFilledTwoTone__WEBPACK_IMPORTED_MODULE_2___default.a, {
          className: classes.icon
        }));
      } else {
        return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
          className: classes.root
        }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
          className: classes.albumArt,
          src: this.props.imageURL
        }));
      }
    }
  }]);

  return SongPreview;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {};
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {};
};

/* harmony default export */ __webpack_exports__["default"] = (Object(recompose__WEBPACK_IMPORTED_MODULE_5__["compose"])(Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["withStyles"])(styles), Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps))(SongPreview));

/***/ }),

/***/ "./src/components/general/SongSubmitForm.jsx":
/*!***************************************************!*\
  !*** ./src/components/general/SongSubmitForm.jsx ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "./node_modules/react/index.js");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/styles */ "./node_modules/@material-ui/core/esm/styles/index.js");
/* harmony import */ var _material_ui_core_esm_Paper__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/esm/Paper */ "./node_modules/@material-ui/core/esm/Paper/index.js");
/* harmony import */ var _material_ui_core_esm_TextField__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/esm/TextField */ "./node_modules/@material-ui/core/esm/TextField/index.js");
/* harmony import */ var react_redux__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react-redux */ "./node_modules/react-redux/es/index.js");
/* harmony import */ var features_songs_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! features/songs.js */ "./src/features/songs.js");
/* harmony import */ var recompose__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! recompose */ "./node_modules/recompose/dist/Recompose.esm.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// react:
 // import PropTypes from "prop-types";
// components:
// import SearchResults from "./SearchResults.jsx";
// material ui:



 // redux:


 // recompose:

 // libs:
// import swal from "sweetalert2";
// Returns a function, that, when invoked, will only be triggered at most once
// during a given window of time. Normally, the throttled function will run
// as much as it can, without ever going more than once per `wait` duration;
// but if you'd like to disable the execution on the leading edge, pass
// `{leading: false}`. To disable execution on the trailing edge, ditto.

function throttle(func, wait, options) {
  var context, args, result;
  var timeout = null;
  var previous = 0;

  if (!options) {
    options = {};
  }

  var later = function later() {
    previous = options.leading === false ? 0 : Date.now();
    timeout = null;
    result = func.apply(context, args);

    if (!timeout) {
      context = args = null;
    }
  };

  return function () {
    var now = Date.now();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;

    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }

      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }

    return result;
  };
}

var searchForSong = throttle(function (self, value) {
  // moved to debounce fn bc otherwise it can happen out of order:
  if (value === "") {
    self.props.updateSearchResults([]);
    return;
  }

  self.socket.emit("searchSong", {
    songName: value
  }, function (data) {
    self.props.updateSearchResults(data.searchResults);
  });
}, 500); // jss:

var styles = function styles(theme) {
  return {
    root: {
      display: "flex",
      flexDirection: "row"
    },
    textField: {
      margin: "2%"
    }
  };
};

var SongSubmitForm = /*#__PURE__*/function (_PureComponent) {
  _inherits(SongSubmitForm, _PureComponent);

  var _super = _createSuper(SongSubmitForm);

  function SongSubmitForm(props) {
    var _this;

    _classCallCheck(this, SongSubmitForm);

    _this = _super.call(this, props);

    _defineProperty(_assertThisInitialized(_this), "handleText", function (event) {
      _this.props.updateSongName(event.target.value);

      searchForSong(_assertThisInitialized(_this), event.target.value);
    });

    _this.socket = null;
    _this.state = {
      songName: "",
      searchResults: []
    };
    return _this;
  }

  _createClass(SongSubmitForm, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.socket = this.props.serverConnection;
    }
  }, {
    key: "render",
    value: function render() {
      var classes = this.props.classes;
      return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_Paper__WEBPACK_IMPORTED_MODULE_2__["default"], {
        id: "songSubmitForm",
        className: classes.root,
        elevation: 4
      }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_esm_TextField__WEBPACK_IMPORTED_MODULE_3__["default"], {
        id: "songSearchField",
        label: "Enter a Song or Artist Name",
        className: classes.textField,
        value: this.props.songName,
        onChange: this.handleText,
        margin: "normal",
        variant: "outlined",
        fullWidth: true
      }));
    }
  }]);

  return SongSubmitForm;
}(react__WEBPACK_IMPORTED_MODULE_0__["PureComponent"]);

var mapStateToProps = function mapStateToProps(state) {
  return {
    songName: state.dj.songs.songName
  };
};

var mapDispatchToProps = function mapDispatchToProps(dispatch) {
  return {
    updateSongName: function updateSongName(data) {
      dispatch(Object(features_songs_js__WEBPACK_IMPORTED_MODULE_5__["updateSongName"])(data));
    },
    updateSearchResults: function updateSearchResults(data) {
      dispatch(Object(features_songs_js__WEBPACK_IMPORTED_MODULE_5__["updateSearchResults"])(data));
    }
  };
};

/* harmony default export */ __webpack_exports__["default"] = (Object(recompose__WEBPACK_IMPORTED_MODULE_6__["compose"])(Object(_material_ui_core_styles__WEBPACK_IMPORTED_MODULE_1__["withStyles"])(styles), Object(react_redux__WEBPACK_IMPORTED_MODULE_4__["connect"])(mapStateToProps, mapDispatchToProps))(SongSubmitForm));

/***/ }),

/***/ "./src/features/settings.js":
/*!**********************************!*\
  !*** ./src/features/settings.js ***!
  \**********************************/
/*! exports provided: updateSettings, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSettings", function() { return updateSettings; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");
function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var settingsSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: "settings",
  initialState: {
    theme: "dark"
  },
  reducers: {
    updateSettings: function updateSettings(state, action) {
      return _objectSpread(_objectSpread({}, state), action.payload); // sets entire state
    }
  }
});
var updateSettings = settingsSlice.actions.updateSettings;

/* harmony default export */ __webpack_exports__["default"] = (settingsSlice.reducer);

/***/ }),

/***/ "./src/features/songs.js":
/*!*******************************!*\
  !*** ./src/features/songs.js ***!
  \*******************************/
/*! exports provided: updateSongName, updateSongList, updateSearchResults, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSongName", function() { return updateSongName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSongList", function() { return updateSongList; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "updateSearchResults", function() { return updateSearchResults; });
/* harmony import */ var _reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @reduxjs/toolkit */ "./node_modules/@reduxjs/toolkit/dist/redux-toolkit.esm.js");

var songsSlice = Object(_reduxjs_toolkit__WEBPACK_IMPORTED_MODULE_0__["createSlice"])({
  name: "songs",
  initialState: {
    songName: "",
    songList: [],
    searchResults: []
  },
  reducers: {
    updateSongName: function updateSongName(state, action) {
      state.songName = action.payload;
    },
    updateSongList: function updateSongList(state, action) {
      state.songList = action.payload;
    },
    updateSearchResults: function updateSearchResults(state, action) {
      state.searchResults = action.payload;
    }
  }
});
var _songsSlice$actions = songsSlice.actions,
    updateSongName = _songsSlice$actions.updateSongName,
    updateSongList = _songsSlice$actions.updateSongList,
    updateSearchResults = _songsSlice$actions.updateSearchResults;

/* harmony default export */ __webpack_exports__["default"] = (songsSlice.reducer);

/***/ }),

/***/ "./src/reducers/index.js":
/*!*******************************!*\
  !*** ./src/reducers/index.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ "./node_modules/redux/es/redux.js");
/* harmony import */ var redux_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! redux-form */ "./node_modules/redux-form/es/index.js");
/* harmony import */ var _features_songs_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../features/songs.js */ "./src/features/songs.js");



var rootReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__["combineReducers"])({
  songs: _features_songs_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  form: redux_form__WEBPACK_IMPORTED_MODULE_1__["reducer"]
});
/* harmony default export */ __webpack_exports__["default"] = (rootReducer);

/***/ }),

/***/ 0:
/*!********************!*\
  !*** ws (ignored) ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

/******/ });
//# sourceMappingURL=index.bundle.js.map