/****
 * dabut.js 0.1.2
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
	
	/**
	 * API.
	 * @fn: Function : called at onDOMContentLoaded
	 **/
	var initialize = function(fn){
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
		if( root.removeEventListener ){
			root.document.removeEventListener('DOMContentLoaded', loaded, false);
			root.removeEventListener('load', loaded, false);
			
		}else if( root.detachEvent ){
			root.document.detachEvent('onDOMContentLoaded', loaded);
			root.detachEvent('onload', loaded);
			
		}
		_done = true;
		
		each(_initialize, function(f){
			f(e);
		});
		
		_initialize.length = 0;
		
		// start tick tick
		requestAnimationFrame(ticker);
		
		loaded = null;
	};
	
	/**
	 * Alias of querySelector().
	 * returns DOM Element.
	 * 
	 * @selector: String : CSS selector
	 * @context: Element : parent node to search query
	 **/
	var el = function(selector, context){
		context = context || document;
		return context.querySelector(selector);
	};
	
	/**
	 * Alias of querySelectorAll().
	 * returns DOM NodeList.
	 * 
	 * @selector: String : CSS selector
	 * @context: Element : parent node to search query
	 **/
	var els = function(selector, context){
		context = context || document;
		return context.querySelectorAll(selector);
	};
	/**
	 * Array.prototype.forEach() or Array.prototype.map(), etc.
	 * The 3rd argument will be the this-Object in each callbacks.
	 * Also more 3 arguments can be passed to the callback.
	 *
	 * If the items is an array of functions, callback-argument would be ignored and the each functions would be calld like callback.
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
	 * callback function
	 * function( item, index, array[, argument ...] )
	 * @item: Any : item of items
	 * @index: Number : index of items
	 * @array: Array or Object : items
	 * @this object: Object: the 3rd argument of each()
	 * more than 3 arguments: more than 3 arguments of each()
	 **/
	var each = function(items, callback, context){
		var i;
		var result = [], retVal;
		var args = [null, 0, items].concat(Array.prototype.slice.call(arguments, 2));
		
		var fn = function(item, i){
			args[1] = i;
			if( typeof item === 'function' ){
				args[0] = ( context.length !== undefined )? context[i]: context;
				retVal = item.apply(args[0], args);
			}else{
				args[0] = item;
				retVal = callback.apply(context, args);
			}
			if( retVal === true ){
				result.push(item);
			}else if( retVal !== false && retVal !== undefined ){
				result.push(retVal);
			}
		};
		
		if( items.length !== undefined ){
			for( i = 0; i < items.length; i++ ){
				fn(items[i], i);
			}
		}else{
			for( i in items ){
				if( items.hasOwnProperties(i) ){
					fn(items[i], i);
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
	
	var position = function(element){
		var metrics = element.getBoundingClientRect();
		var documentElement = document.documentElement;
		var math = Math;
		return {
			left: math.round(metrics.left + window.scrollX || ((document.body.scrollLeft || documentElement.scrollLeft) - documentElement.clientLeft)),
			top: math.round(metrics.top + window.scrollY || ((document.body.scrollTop || documentElement.scrollTop) - documentElement.clientLeft)),
			width: math.round(metrics.width),
			height: math.round(metrics.height)
		};
	};
	
	var style = function(element, prop, value){
		var vprop;
		var re = /(\-([a-z]))/g;
		
		if( prop === 'float' ){
			prop = (venderPrefix==='-ms-')? 'styleFloat': 'cssFloat';
		}
		
		if( re.test(prop) ){
			prop = prop.replace(re, function(){
				return arguments[2].toUpperCase();
			});
			vprop = (venderPrefix+prop).replace(re, function(){
				return arguments[2].toUpperCase();
			});
		}
		
		if( value !== undefined ){
			element.style.prop = element.style[vprop] = value;
			
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
	
	var ticker = function(timestamp){
		var self=ticker,i;
		for( i = 0; i < self.callbacks.length; i++ ){
			self.callbacks[i].call(self.contexts[i], timestamp);
		}
		requestAnimationFrame(ticker);
	};
	ticker.callbacks = [];
	ticker.contexts = [];
	ticker.append = function(fn, context){
		this.callbacks.push( fn );
		this.contexts.push( context||null );
		return this.callbacks.length;
	};
	ticker.remove = function(fn){
		if( typeof fn === 'number' ){
			this.callbacks.splice(fn, 1);
			this.contexts.splice(fn, 1);
		}else if( typeof fn === 'function' ){
			for(var i = 0; i < this.callbacks.length; i++ ){
				if( this.callbacks[i] === fn ){
					this.callbacks.splice(i, 1);
					this.contexts.splice(i, 1);
					break;
				}
			}
		}
		return this;
	};
	
	/**
	 * set handler on onload event
	 **/
	if( root.addEventListener ){
		root.document.addEventListener('DOMContentLoaded', loaded);
		root.addEventListener('load', loaded, false);
		
	}else if( root.attachEvent ){
		root.document.attachEvent('onDOMContentLoaded', loaded);
		root.attachEvent('onload', loaded);
		
	}else{
		var preloaded = function(){
			if( /complete|loaded/.test( root.document.readyState ) ){
				loaded();
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
	dab.klass.dabut = 'initialize el els each ticker position style';
	
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
	
	var dabut = {};
	dabut.initialize = initialize;
	dabut.el = el;
	dabut.els = els;
	dabut.each = each;
	dabut.ticker = ticker;
	dabut.position = position;
	dabut.style = style;
	
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

