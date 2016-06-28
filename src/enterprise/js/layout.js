/*
 * @Author: sison.luo
 * @Date:   2016-06-14 14:13:47
 * @Last Modified by:   sison.luo
 * @Last Modified time: 2016-06-16 14:29:59
 */

// 'use strict';

var Layout = function() {

    var handleTotop = function() {
        $('body').append('<div id="backToTop"><a href=""class="fs tc"><i class="ico ico-to-top"></i>返回顶部</a></div>');
        $(window).scroll(function() {
            if ($(document).scrollTop() == 0) {
                $("#backToTop").removeClass('toggle');
            } else {
                $("#backToTop").addClass('toggle');
            }
        });
        $("#backToTop").click(function(e) {
            e.preventDefault();
            $("body,html").animate({
                scrollTop: 0
            }, "100");
            return false;
        });
    }
    var handleFooterFixed = function () {
        var conH = $(window).height() - $('.page-banner').height() - $('.page-header').height() - $('.page-footer').outerHeight();
        $('.page-content').css('minHeight', conH);
        $(window).on('resize', function () {
            handleLayoutWidth();
        })
    }
    var handleToggleHighSearch = function(){
    	$('#higherBtn').on('click',function(){
    		var hsDiv = $(this).closest('.query-form').find('.highSearch');
    		if(hsDiv.hasClass('show')){
	    		$(this).html('高级搜索');
	    		hsDiv.removeClass('show');
    		}else{
	    		$(this).html('收起高级搜索');
	    		hsDiv.addClass('show');    			
    		}
    	});
    }

    return {
    	init: function(){
    		handleFooterFixed();
    		handleTotop();
    	},
    	initToggleHighSearch: function(){
    		handleToggleHighSearch();
    	}
    }
}();



function getRemoteHtml(url) {
    var dfd = $.Deferred();
    $.ajax({
        type: 'GET',
        dataType: 'html',
        url: url
    }).done(function(data) {
        dfd.resolve(data);
    });
    return dfd.promise();
}

function importHeader() {
    $.when(getRemoteHtml('enterprise-header.html')).done(function(data) {
        $('body').prepend(data);
    });
}

function importFooter() {
    $.when(getRemoteHtml('enterprise-footer.html')).done(function(data) {
        $('body').append(data);
    });
}


// 重新封装 layer.msg，增加正确，错误，警告状态
var relayer = {};
relayer.message = function(content,options,theme){
    var thm = theme || '';
    var cont = '<i class="icon icon-'+thm+'"></i>'+ content;
    layer.msg(cont,options,thm);
}

$.fn.placeholder = function(message){
	return this.each(function(){
		var msg = message || '请输入';
		$(this).val(msg).addClass('c-gray4');
		$(this)
		.on('focus', function(){
			if($(this).val() == msg){
				$(this).val('').removeClass('c-gray4').addClass('c-gray1');
			}
		}).on('blur', function(){
			if($(this).val().length>0){
				$(this).removeClass('c-gray4').addClass('c-gray1');
			}else{
				$(this).val(msg).removeClass('c-gray1').addClass('c-gray4');
			}
		})
	});
}
$('#hsearchlist').placeholder('每个关键字占一行 \n姓名1 \n姓名2 \n姓名3');

