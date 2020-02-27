;(function(){var x=Function('return this')();if(!x.fest)x.fest={};x.fest['js/views/profileView/profileView.tmpl']=function (__fest_context){"use strict";var __fest_self=this,__fest_buf="",__fest_chunks=[],__fest_chunk,__fest_attrs=[],__fest_select,__fest_if,__fest_iterator,__fest_to,__fest_fn,__fest_html="",__fest_blocks={},__fest_params,__fest_element,__fest_debug_file="",__fest_debug_line="",__fest_debug_block="",__fest_element_stack = [],__fest_short_tags = {"area": true, "base": true, "br": true, "col": true, "command": true, "embed": true, "hr": true, "img": true, "input": true, "keygen": true, "link": true, "meta": true, "param": true, "source": true, "wbr": true},__fest_jschars = /[\\'"\/\n\r\t\b\f<>]/g,__fest_jschars_test = /[\\'"\/\n\r\t\b\f<>]/,__fest_htmlchars = /[&<>"]/g,__fest_htmlchars_test = /[&<>"]/,__fest_jshash = {"\"": "\\\"", "\\": "\\\\", "/": "\\/", "\n": "\\n", "\r": "\\r", "\t": "\\t", "\b": "\\b", "\f": "\\f", "'": "\\'", "<": "\\u003C", ">": "\\u003E"},__fest_htmlhash = {"&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;"},__fest_escapeJS = function __fest_escapeJS(value) {
		if (typeof value === 'string') {
			if (__fest_jschars_test.test(value)) {
				return value.replace(__fest_jschars, __fest_replaceJS);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceJS = function __fest_replaceJS(chr) {
		return __fest_jshash[chr];
	},__fest_escapeHTML = function __fest_escapeHTML(value) {
		if (typeof value === 'string') {
			if (__fest_htmlchars_test.test(value)) {
				return value.replace(__fest_htmlchars, __fest_replaceHTML);
			}
		}

		return value == null ? '' : value;
	},__fest_replaceHTML = function __fest_replaceHTML(chr) {
		return __fest_htmlhash[chr];
	},__fest_extend = function __fest_extend(dest, src) {
		for (var key in src) {
			if (src.hasOwnProperty(key)) {
				dest[key] = src[key];
			}
		}
	},__fest_param = function __fest_param(fn) {
		fn.param = true;
		return fn;
	},i18n=__fest_self && typeof __fest_self.i18n === "function" ? __fest_self.i18n : function (str) {return str;},___fest_log_error;if(typeof __fest_error === "undefined"){___fest_log_error = (typeof console !== "undefined" && console.error) ? function(){return Function.prototype.apply.call(console.error, console, arguments)} : function(){};}else{___fest_log_error=__fest_error};function __fest_log_error(msg){___fest_log_error(msg+"\nin block \""+__fest_debug_block+"\" at line: "+__fest_debug_line+"\nfile: "+__fest_debug_file)}function __fest_call(fn, params,cp){if(cp)for(var i in params)if(typeof params[i]=="function"&&params[i].param)params[i]=params[i]();return fn.call(__fest_self,params)}var data=__fest_context;__fest_buf+=("<div class=\"profile-block\">");try{__fest_attrs[0]=__fest_escapeHTML(data.profile.avatar)}catch(e){__fest_attrs[0]=""; __fest_log_error(e.message);}__fest_buf+=("<div class=\"profile-block__avatar\" style=\"background-image: url(" + __fest_attrs[0] + ")\"></div><div class=\"profile-info\"><div class=\"profile-info__header\"><span class=\"profile-info__login\">");try{__fest_buf+=(__fest_escapeHTML(data.profile.login))}catch(e){__fest_log_error(e.message + "7");}__fest_buf+=("</span><a href=\"#\"><img class=\"profile-info__edit\" src=\"static\/img\/pencil.svg\" height=\"20\"/></a><a class=\"profile-info__exit\" href=\"#\">Выйти</a></div><div class=\"profile-info__email\"><span>Почта:</span><span class=\"profile-info__email-value\">");try{__fest_buf+=(__fest_escapeHTML(data.profile.email))}catch(e){__fest_log_error(e.message + "18");}__fest_buf+=("</span></div></div></div><div class=\"lists-nav\"><a class=\"lists-nav__list-link lists-nav__list-link_active\" href=\"#\">Все</a><a class=\"lists-nav__list-link\" href=\"#\">Смотрю</a><a class=\"lists-nav__list-link\" href=\"#\">Просмотрено</a><a class=\"lists-nav__list-link\" href=\"#\">Запланировано</a><a class=\"lists-nav__list-link\" href=\"#\">Брошено</a></div>");var i,list,__fest_to0,__fest_iterator0;try{__fest_iterator0=data.lists || [];__fest_to0=__fest_iterator0.length;}catch(e){__fest_iterator0=[];__fest_to0=0;__fest_log_error(e.message);}for(i=0;i<__fest_to0;i++){list=__fest_iterator0[i];__fest_buf+=("<div class=\"list-block\"><p class=\"list-block__headline\">");try{__fest_buf+=(__fest_escapeHTML(list.name))}catch(e){__fest_log_error(e.message + "35");}__fest_buf+=("</p><div class=\"series-list\"><div class=\"series-list__header\"><a class=\"series-list__col1\">#</a><a class=\"series-list__col2\">Название</a><a class=\"series-list__col3\">Сезоны</a><a class=\"series-list__col4\">Оценка</a></div>");var j,series,__fest_to1,__fest_iterator1;try{__fest_iterator1=list.series || [];__fest_to1=__fest_iterator1.length;}catch(e){__fest_iterator1=[];__fest_to1=0;__fest_log_error(e.message);}for(j=0;j<__fest_to1;j++){series=__fest_iterator1[j];__fest_buf+=("<div class=\"series-list__row\" href=\"#\"><a class=\"series-list__col1\">");var row=j + 1;try{__fest_buf+=(__fest_escapeHTML(row))}catch(e){__fest_log_error(e.message + "50");}__fest_buf+=("</a><a class=\"series-list__col2 series-list__series-name\" href=\"#\">");try{__fest_buf+=(__fest_escapeHTML(series.name))}catch(e){__fest_log_error(e.message + "54");}__fest_buf+=("</a><a class=\"series-list__col3\">");try{__fest_buf+=(__fest_escapeHTML(series.seasons))}catch(e){__fest_log_error(e.message + "58");}__fest_buf+=("</a><a class=\"series-list__col4\">");try{__fest_buf+=(__fest_escapeHTML(series.rating))}catch(e){__fest_log_error(e.message + "62");}__fest_buf+=("</a></div>");}__fest_buf+=("</div></div>");}__fest_to=__fest_chunks.length;if (__fest_to) {__fest_iterator = 0;for (;__fest_iterator<__fest_to;__fest_iterator++) {__fest_chunk=__fest_chunks[__fest_iterator];if (typeof __fest_chunk==="string") {__fest_html+=__fest_chunk;} else {__fest_fn=__fest_blocks[__fest_chunk.name];if (__fest_fn) __fest_html+=__fest_call(__fest_fn,__fest_chunk.params,__fest_chunk.cp);}}return __fest_html+__fest_buf;} else {return __fest_buf;}}})();