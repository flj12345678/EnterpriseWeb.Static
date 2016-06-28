/*
* @Author: sison.luo
* @Date:   2016-03-16 14:14:05
* @Last Modified by:   sison.luo
* @Last Modified time: 2016-06-16 15:18:15

	*checkbox*
*/

;(function($,window,undefined){
	$.fn.checkboxSmart = function(options){
		var defaults = {
			callback: function(){}
		}
		var opts = $.extend(defaults,options);
		return this.each(function(){
			var checkbj = new Checkobj($(this),opts);
			checkbj.init();
		})
	}
	var Checkobj = function(ele,options){
		this.ele = ele,
		this.opts = options;
		this.id = this.ele.attr('id');
		this.name = this.ele.attr('name');
	}
	Checkobj.prototype.init = function(){
		this.render();
		this.watch();
	}
	Checkobj.prototype.render = function(){
		var self = this;
		var html = '';
		var _nid = '_'+self.id;
		var ischk = self.ele.prop('checked') ? ' checked' : '';
		// var _nval = this.ele.attr('show-value');
		// html+='<div class="checkone clearfix" id='+_nid+'>';
		html+='<i class="ant"></i>';
		// html+='<span>'+_nval+'</span>';
		// html+='</div>';
		self.ele.before(html);
		self.ele.parent().addClass(ischk);
		return this;
	}
	Checkobj.prototype.watch = function(){
		var self = this;
		var actor  = self.ele.parent('.checkone');
		actor.on('click',function(){
			var bool = $(this).find('input[type=checkbox]').is(':checked');
			if(bool){
				$(this).removeClass('checked');
			}else{
				$(this).addClass('checked');
			}
			$(this).find('input[type=checkbox]').prop('checked', !bool);
			self.opts.callback(self.ele);
		});
		return this;
	}
})(jQuery,window,document);
