/****
 * dabut.js 0.1.3
 *
 * Javascript minimum utility.
 *
 * License: The MIT License.
 * http://opensource.org/licenses/MIT
 *
 * (c) 2014 Wicker Wings
 * http://www.wi-wi.jp/
 *
 * http://github.com/heporap/dabut
****/
(function(root, undefined){
	"use strict";
	var _initialize = [];
	var _done = false;
	var dabut = {};
	
	/**
	* API.
	* @fn: Function : called at onDOMContentLoaded
	**/
	var initialize = dabut.initialize = function(fn){
		if( _done ){
			fn();
		}else{
			_initialize.push(fn);
		}
		return initialize;
	};
	
	/**
	* onload event handler
	**/
	var loaded = function(e){
		off(root, 'load', loaded);
		off(root, 'DOMContentLoaded', loaded);
		
		_done = true;
		
		each(_initialize, function(f){
			f(e);
		});
		
		_initialize.length = 0;
		
		// start tick tick
		requestAnimationFrame(ticker);
		
		loaded = null;
	};
	
	/****
	* Object type check.
	****/
	var isFunction = dabut.isFunction = function(o){
		return Object.prototype.toString.call(o) === '[object Function]';
	};
	var isArray = dabut.isArray = function(o){
		return Object.prototype.toString.call(o) === '[object Array]';
	};
	/*! jshint errors because isObject is not used */
	/*var isObject = */dabut.isObject = function(o){
		return Object.prototype.toString.call(o) === '[object Object]';
	};
	var isString = dabut.isString = function(o){
		return Object.prototype.toString.call(o) === '[object String]';
	};
	var isNumber = dabut.isNumber = function(o){
		return Object.prototype.toString.call(o) === '[object Number]';
	};
	
	var filterElement = function(elements){
		var result = [], i;
		for( i = 0; i < elements.length; i++ ){
			if( elements[i] !== null ){
				result.push(elements[i]);
			}
		}
		return result;
	};
	
	/**
	* Alias of querySelector().
	* returns DOM Element.
	*
	* @selector: String : CSS selector
	* @context: Element : parent node to search query
	**/
	var el = dabut.el = function(selector, context){
		return els(selector, context)[0];
	};
	
	/**
	* Alias of querySelectorAll().
	* returns DOM NodeList.
	*
	* @selector: String : CSS selector
	* @context: Element : parent node to search query
	**/
	var els = dabut.els = function(selector, context){
		context = context || document;
		return filterElement(context.querySelectorAll(selector));
	};
	/**
	* Array.prototype.forEach() or Array.prototype.map(), etc.
	* The 3rd argument will be the this-Object in each callbacks.
	* Also more 3 arguments can be passed to the callback.
	*
	* @usage
	* each(items, callback [, arg1, arg2 ...])
	*
	* @returns
	* list of object from callback.
	*
	* @items: Array or Object :
	* @callback: Function :
	*
	* @usage
	* each(callbacks, null [, arg1, arg2 ...])
	*
	* @returns
	* list of object from callback.
	*
	* @callback: Function :
	*
	* callback function
	* function( item, index, array[, argument ...] )
	* @item: Any : item of items
	* @index: Number : index of items
	* @array: Array or Object : items
	* @this object: Object: the 3rd argument of each()
	* more than 3 arguments: more than 3 arguments of each()
	**/
	var each = dabut.each = function(items, callback, context){
		var i;
		var result = [], retVal;
		var args = [null, 0, items].concat(Array.prototype.slice.call(arguments, 2));
		
		var fn = function(value, prop){
			args[1] = prop;
			if( isFunction(value) ){
					args[0] = ( context.length !== undefined )? context[i]: context;
					retVal = value.apply(args[0], args);
			}else{
					args[0] = value;
					retVal = callback.apply(context, args);
			}
			if( retVal === true ){
					result.push(value);
			}else if( retVal !== false && retVal !== undefined ){
					result.push(retVal);
			}
		};
		
		if( items.length !== undefined ){
			for( i = 0; i < items.length; i++ ){
					fn(items[i], i);
			}
		}else{
			for( var p in items ){
					if( items.hasOwnProperty(p) ){
						fn(items[p], p);
					}
			}
		}
		return result;
	};
	
	// http://davidwalsh.name/vendor-prefix
	var venderPrefix = (function () {
		var styles = window.getComputedStyle(document.documentElement, ''),
			pre = (Array.prototype.slice
					.call(styles)
					.join('')
					.match(/-(moz|webkit|ms)-/) || (styles.OLink === '' && ['', 'o'])
			)[1],
			dom = ('WebKit|Moz|MS|O').match(new RegExp('(' + pre + ')', 'i'))[1];
		return {
			dom: dom,
			lowercase: pre,
			css: '-' + pre + '-',
			js: pre[0].toUpperCase() + pre.substr(1)
		};
	})();
	
	var getComputedStyle = function(element, prop){
		if( window.getComputedStyle ){
			return window.getComputedStyle(element, '')[prop];
		}else{
			return element.currentStyle[prop] ? element.currentStyle[prop] : null;
		}
	};
	
	/**
	* position
	*
	* @usage
	* position(element, abs);
	*
	* @returns
	* {
	*   left: Number,
	*   top: Number,
	*   width: Number,
	*   height: Number
	* }
	*
	* @element: HTML-Element or String :
	* @abs: Boolean or String : returns absolute position if abs was set true or 'abs'.
	*
	* This method uses Element.getBoundingClientRect(),
	* compatible width jQuery.position() or jQuery.offset(), jQuery.width() and jQuery.height()
	**/
	dabut.position = function(element, abs){
		if( isString(element) ){
			element = el(element);
		}else if( element === root ){
			element = root.document.body;
		}
		abs = (abs!==undefined || !!abs)? 'abs': abs;
		
		var metrics = element.getBoundingClientRect();
		var documentElement = document.documentElement;
		var math = Math;
		var scrollX = (abs==='abs')? window.scrollX || ((document.body.scrollLeft || documentElement.scrollLeft) - documentElement.clientLeft): 0,
			scrollY = (abs==='abs')? window.scrollY || ((document.body.scrollTop || documentElement.scrollTop) - documentElement.clientLeft): 0;
		
		return {
			left: math.round(metrics.left + scrollX),
			top: math.round(metrics.top + scrollY),
			width: math.round(metrics.width),
			height: math.round(metrics.height)
		};
	};
	
	/**
	* style
	*
	* @usage
	* style(element, prop [, value]);
	*
	* @returns
	* element's style value
	*
	* @element: HTML-Element :
	* @prop: String : style property
	* @value: String : style value
	*
	**/
	var style = dabut.style = function(element, prop, value){
		var vprop;
		var result = {};
		var re = /(\-([a-z]))/g;
		
		if( isArray(prop) ){
			each(prop, function(item){
					result[item] = style(element, item);
			});
			return result;
			
		}else if( !isString(prop) ){
			each(prop, function(value, key){
					style(element, key, value);
			});
			return null;
			
		}
		
		if( prop === 'float' ){
			prop = (venderPrefix.css==='-ms-')? 'styleFloat': 'cssFloat';
		}
		
		if( re.test(prop) ){
			prop = prop.replace(re, function(){
					return arguments[2].toUpperCase();
			});
		}
		vprop = venderPrefix.js+prop;
		
		if( value !== undefined ){
			element.style[vprop] = value;
			element.style[prop] = value;
			
			return value;
		}else{
			return getComputedStyle(element, prop) || getComputedStyle(element, vprop);
			
		}
	};
	
	/**
	* requestAnimationFrame
	*
	* @usage
	* ticker.append(fn, context);
	*
	* @fn: Function, Number : function to remove from callbacks for ticker, or return-value of ticker.append()
	* @context: Any : thisObject in fn
	*
	* @usage
	* ticker.remove(fn);
	*
	* @fn: Function, Number : function to remove from callbacks for ticker, or return-value of ticker.append()
	**/
	var now = Date.now? Date.now: function(){ return +(new Date()); };
	var requestAnimationFrame = root.requestAnimationFrame || root.mozRequestAnimationFrame || root.webkitRequestAnimationFrame || root.msRequestAnimationFrame || (function(){var startTime = now(); return function(callback){var f=function(){callback.call(context, now() - startTime);}; setTimeout(f, 1000/60); }; }());
	
	var ticker = dabut.ticker = function(timestamp){
		var self=ticker,i;
		for( i = 0; i < self.callbacks.length; i++ ){
			self.callbacks[i].call(self.contexts[i], timestamp);
		}
		requestAnimationFrame(ticker);
	};
	ticker.callbacks = [];
	ticker.contexts = [];
	ticker.manager = {};
	ticker.append = function(fn, context){
		this.callbacks.push( fn );
		this.contexts.push( context||null );
		
		var fnID = this.callbacks.length,
			soeji = this.callbacks.length - 1;
		
		this.manager[fnID] = soeji;
		
		return fnID;
	};
	
	ticker.remove = function(fnID){
		if( isNumber(fnID) ){
			var soeji = this.manager[fnID];
			
			if( soeji === undefined ){
					return;
			}
			
			this.callbacks.splice(soeji, 1);
			this.contexts.splice(soeji, 1);
			
			delete this.manager[fnID];
			
			for( var id in this.manager ){
					if( this.manager[id] > soeji ){
						this.manager[id]--;
					}
			}
			
		}else if( isFunction(fnID) ){
			for(var i = 0; i < this.callbacks.length; i++ ){
					if( this.callbacks[i] === fnID ){
						this.remove(i);
						break;
					}
			}
		}
		return this;
	};
	
	/**
	* set event handler
	**/
	var on = dabut.on = function(element, type, handler){
		if( element.addEventListener ){
			element.addEventListener(type, handler, false);
		}else if( element.attachEvent ){
			element.attachEvent('on'+type, handler);
		}else{
			var fn = element['on'+type];
			element['on'+type]=function(event){
					fn(event);
					hander(event);
			};
		}
	};
	var off = dabut.off = function(element, type, handler){
		if( element.removeEventListener ){
			element.removeEventListener(type, handler, false);
		}else if( element.dettachEvent ){
			element.dettachEvent('on'+type, handler);
		}else{
			element['on'+type]=null;
		}
	};
	
	
	/**
	* set handler on onload event
	**/
	on(root, 'load', loaded);
	if( root.document ){
		on(root.document, 'DOMContentLoaded', loaded);
		
		var preloaded = function(){
			if( /complete|loaded/.test( root.document.readyState ) ){
				if( loaded ){
					loaded();
				}
			}else{
				setTimeout(preloaded, 16);
			}
		};
		preloaded();
	}
	
	
	/**
	* dab.exports
	**/
	var dab = root.dab || {};
	root.dab = dab;
	dab.klass = dab.klass || {};
	dab.klass.dabut = 'initialize el els each ticker position style on off isString isNumber isFunction isArray isObject';
	
	if( !dab.exports ){
		dab.exports = function(args){
			var i,k,klassName,subName;
			args = args.split(/ /);
			for( i = 0; i < args.length; i++ ){
				klassName = args[i];
				if( this.klass[ klassName ] ){
					var modnames = this.klass[ klassName ].split(' ');
					for( k = 0; k < modnames.length; k++ ){
						subName = modnames[k];
						if( subName.indexOf('.')===-1){
							root[subName] = root[klassName][subName];
						}else{
							var n = subName.split('.');
							root[n[1]] = root[n[0]][n[1]];
						}
					}
				}
			}
		};
	}
	
	if(typeof define === 'function' && define.amd ){
		if( root.document ){
			loaded();
		}
		define('dabut', function(){ return dabut; });
		
	}else{
		root.dabut = dabut;
		
	}
	return dabut;
	
})(this);