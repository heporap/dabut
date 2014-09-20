/****
 * dabut.js 0.1.0
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
(function(root){
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
	 * Also more 3 arguments can be passed to the callback.
	 * each(items, callback [, arg1, arg2 ...])
	 * returns list of object from callback.
	 * 
	 * @items: Array or Object : 
	 * @callback: Function : 
	 **/
	var each = function(items, callback){
		var i;
		var result = [], retVal;
		var args = [null, 0, items].concat(Array.prototype.slice.call(arguments, 2));
		if( items.length !== undefined ){
			for( i = 0; i < items.length; i++ ){
				args[0] = items[i];
				args[1] = i;
				retVal = callback.apply(items[i], args);
				if( retVal !== false && retVal !== null && retVal !== undefined ){
					result.push(retVal);
				}
			}
		}else{
			for( i in items ){
				if( items.hasOwnProperties(i) ){
					args[0] = items[i];
					args[1] = i;
					retVal = callback.apply(items[i], args);
					if( retVal !== false && retVal !== null && retVal !== undefined ){
						result.push(retVal);
					}
				}
			}
		}
		return result;
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
	dab.klass.dabut = 'initialize el els each';
	
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
	root.dabut = dabut;
	
	dabut.initialize = initialize;
	dabut.el = el;
	dabut.els = els;
	dabut.each = each;
	
})(this);


