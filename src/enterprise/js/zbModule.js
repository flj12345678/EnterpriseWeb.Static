

$(function(){

    //TCF建模和全新建模切换
   $(".styleSelect a").click(function(){
       var ind=$(this).index();
       $("#modules>div").eq(ind+1).show().siblings(':not(".styleSelect")').hide();
       $(this).addClass("sel").siblings().removeClass("sel");
   }).eq(0).click();

   //TCF建模和全新建模关闭
    $(".TCF-wrapper .zb-header .close-x").click(function(){
        $(this).parent().parent().parent().parent().hide();
        $(".styleSelect a").eq(0).removeClass("sel");
    });

    $(document).on('click','.brandNew-wrapper .zb-header .close-x', function(){
        $(this).parent().parent().parent().parent().remove();
        $(".styleSelect a").eq(1).removeClass("sel");
    });

    $(document).on('click','.zb-header .pickUp', function(){
        if($(this).hasClass("icon-arrow-up2")){
            $(this).parent().parent().siblings(".zb-body").hide();
            $(this).removeClass("icon-arrow-up2").addClass("icon-arrow-down2");
        }else{
            $(this).parent().parent().siblings(".zb-body").show();
            $(this).removeClass("icon-arrow-down2").addClass("icon-arrow-up2");
        }
    });



    //全新建模新建大模块
    $(document).on('click','.add-zbGroup', function(){
        var len=$(this).siblings("div").length;
        if(len>=1){
            var id=$(this).prev().attr("id");
            var aft=parseInt(id.substring(8,9))+1;
            $(this).before('<div class="bnModule" id="bnModule'+aft+'">'+newModule+'</div>');
            $('#bnModule'+aft).find(".zb-header input").val('新建模块'+aft);
            zbBuilt('bnModule'+aft);
        }else{
            $(this).before('<div class="bnModule" id="bnModule1">'+newModule+'</div>');
            $('#bnModule1').find(".zb-header input").val('新建模块1');
            zbBuilt('bnModule1');
        }
    });

    //二级小指标创建
    $(document).on('click','.zb-style2 li ul li.add-mdGroup', function() {
        $(this).before('<li><input type="text" value="新建二级指标" data-value="新建二级指标"><em class="close-x icon-close icon"></em></li>');
    });

    // TCF建模新建指标组
    $('#abilityModule .add-out-tcf b').on('click', function () {
        var nzbleng = $('.add-from-out').length + 1;
        var newZBkuai = '<li " class="module-item add-from-out"><h6><input type="text" value="新建标题' + nzbleng + '"><em class="total-x close-x icon-close icon"></em></h6><ul class="clearfix tr-itemGroup">';
        newZBkuai += '<li class="add-in-tcf"><b>' + measureAddTip + '</b></li></ul></li>';
        $(this).parent().before(newZBkuai);

        //新建指标组关闭
        $(this).closest('li').prev().find('em.total-x:last').on('click', function () {
            $(this).closest('li').find('em.close-x:not(".total-x")').click();
            $(this).closest('li').remove();
        });

        $('.add-from-out:last').find('em.close-x:not(".total-x")').on('click', function () {
            //新建指标组小指标关闭
            var groupid = $(this).closest('li').attr('data-groupid');
            var mcid = $(this).closest('li').attr("id");
            $('#' + id + ' .tl-group>li[data-groupid="' + groupid + '"] > .tl-itemGroup > #' + mcid).show();
            $(this).parent('li').remove();
        });

        var id = $(this).closest('.zb-module-group').attr('id');

        OnlineMeasure.initLastDrop(id);
    });

    $(window).resize(function() {
        optionSubAlign();
    });

});


//TCF建模

var measureAddTip = "请把左侧指标拖至此或点击此处新建指标";

//指标和指标组拖曳放置、输入边距计算
function optionSubAlign() {
    $("#abilityModule .TCF-left ul li.module-item:even").css({ "margin-right": "8px", "clear": "left" });
    $("#abilityModule .TCF-left ul li.module-item:odd").css({ "margin-left": "8px" });
    $("#abilityModule .TCF-right ul li.module-item").css({ "margin-left": "0", "margin-right": "0", "clear": "none" });
    $("#abilityModule .TCF-left ul li.module-item").each(function () {
        $(this).find("li:visible:even").css({ "margin-left": "0" });
        $(this).find("li:visible:odd").css({ "margin-left": "8%" });
    });
    $("#abilityModule .TCF-right ul li.module-item li").css({ "width": "100%", "margin-left": "0" });
    $("#abilityModule .TCF-right .edit-subheading").each(function () {
        var input = $(this).prev();

        input.unbind("change").change(function () {
            var span = $(this).next();
            var paddingLeft = parseInt($(this).css("padding-left"));
            var width = getStringWidth($(this).val(), $(this));
            width = Math.min(paddingLeft + width + 5, input.innerWidth() - getStringWidth(span.text(), span) - 27 + 5);
            span.css("margin-left", width);
        }).change();

        input.unbind("focus").focus(function () {
            input.css("padding-right", "27px");
            $(this).next().hide();
            $(this).parent().find(".errtip").hide();
        });

        input.unbind("blur").blur(function () {
            var par=$(this).parent()[0];
            if(par.tagName=="H6"){
                var txt=$(this).val();
                var txt1=$(this).parents(".module-item").siblings().find("h6 input").val();
                if(txt==txt1){
                    alert("指标名称已存在");
                }
                if($(this).val()==''){
                    $(this).parent().append("<div class='errtip'>指标名称不能为空</div>");
                }else{
                    $(this).parent().find(".errtip").hide();
                }
            }
            input.css("padding-right", $(this).next().outerWidth() + 27);
            $(this).next().show();
        });

        $(this).unbind("click").click(function () {
            var val = input.val();
            input.val("").focus().val(val);
        });
    });
}

//输入框和副标题关系计算
function getStringWidth(text, element) {
    var currentObj = $('<span>').hide().appendTo(document.body);
    $(currentObj).html(text).css('font-style', element.css('font-style'));
    $(currentObj).html(text).css('font-variant', element.css('font-variant'));
    $(currentObj).html(text).css('font-weight', element.css('font-weight'));
    $(currentObj).html(text).css('font-size', element.css('font-size'));
    $(currentObj).html(text).css('line-height', element.css('line-height'));
    $(currentObj).html(text).css('font-family', element.css('font-family'));
    var width = currentObj.width();
    currentObj.remove();
    return width;
}

//TCF/指标拖曳放置函数定义
var OnlineMeasure = function () {

    //点击加大号新建指标组后小指标拖曳
    var handleLastDrop = function (id) {
        $('#' + id + ' .tr-group>li:not(".add-out-tcf")').droppable({
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            accept: "#" + id + " .tl-group>li>ul>li",
            drop: function (event, ui) {
                if ($(this).find('ul>li:not(".add-in-tcf")').length >= 6) {
                    alert('一个指标分类中最多能有6个指标，如需再添加，请您移除分类中已有的指标。');
                    return;
                }
                var itemTemp = ui.draggable.clone();
                var input = itemTemp.find('input');
                var subHeading= input.prev().text() + " " + input.val();
                input.after('<span class="edit-subheading">（' +subHeading + '）</span>');
                input.removeAttr('readonly');
                itemTemp.removeClass('ui-draggable').removeClass('ui-draggable-handle');
                $(this).find('.add-in-tcf').before(itemTemp);

                ui.draggable.hide();
                removeSortNumber(id);
                itemTemp.find('em.close-x').on('click', function () {

                    var groupid = $(this).closest('li').attr('data-groupid');
                    $(this).prev().val($(this).prev().data('value'));
                    $(this).prev().attr('readonly', 'readonly');

                    var mcid = $(this).closest('li').attr("id");
                    $('#' + id + ' .tl-group>li[data-groupid="' + groupid + '"] > .tl-itemGroup > #' + mcid).show();
                    $(this).closest('li').remove();

                    //InitDraggable(id);
                    optionSubAlign();
                });
                optionSubAlign();
            }
        });
    };

    //右侧已加载的指标组添加小指标
    var handleDrop = function (id) {
        if ($('#' + id + ' .tr-group>li:not(".add-out-tcf")').length > 0) {
            var btnAddItem = '<li class="add-in-tcf"><b>' + measureAddTip + '</b></li>';
            $(btnAddItem).appendTo($('#' + id + ' .tr-group>li:not(".add-out-tcf")> ul.tr-itemGroup'));

            //已加载小指标关闭
            $('#' + id + '  .tr-group>li:not(".add-out-tcf")> ul.tr-itemGroup>li>em.close-x').on('click', function () {
                var mcid = $(this).closest('li').attr("id");
                var groupid = $(this).closest('li').attr('data-groupid');
                $('#' + id + ' .tl-group>li[data-groupid="' + groupid + '"] > .tl-itemGroup > #' + mcid).show();
                $(this).parent('li').remove();
                optionSubAlign();
            });

            //已加载指标组关闭
            $('#' + id + ' .tr-group>li:not(".add-out-tcf")>h6>.total-x').on('click', function () {
                $(this).closest('li').find('em.close-x:not(".total-x")').click();
                $(this).closest('li').remove();
                initDraggable(id);
                optionSubAlign();
            });
        }

        $( "#sortable" ).sortable({
            revert: true
        });

        $('#' + id + ' .tr-group>li:not(".add-out-tcf")').droppable({
            connectToSortable: "#sortable",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            accept: "#" + id + " .tl-group>li>ul>li",
            drop: function (event, ui) {
                if ($(this).find('ul>li:not(".add-in-tcf")').length >= 6) {
                    alert('一个指标分类中最多能有6个指标，如需再添加，请您移除分类中已有的指标。');
                    return;
                }
                var itemTemp = ui.draggable.clone();
                var input = itemTemp.find('input');
                var subHeading = input.prev().text() + " " + input.val();
                input.after('<span class="edit-subheading">（' +subHeading + '）</span>');
                input.removeAttr('readonly');
                itemTemp.removeClass('ui-draggable').removeClass('ui-draggable-handle');
                $(this).find('.add-in-tcf').before(itemTemp);
                ui.draggable.hide();
                removeSortNumber(id);
                itemTemp.find('em.close-x').on('click', function () {
                    var groupid = $(this).closest('li').attr('data-groupid');
                    $(this).prev().val($(this).prev().data('value'));
                    $(this).prev().attr('readonly', 'readonly');
                    var mcid = $(this).parent('li').attr("id");
                    $('#' + id + ' .tl-group>li[data-groupid="' + groupid + '"] > .tl-itemGroup > #' + mcid).show();
                    $(this).parent('li').remove();
                    initDraggable(id);
                    optionSubAlign();
                });
                optionSubAlign();
            }
        });

        $('#' + id + ' .tr-group>li:not(".add-out-tcf")').find('em.close-x:not(".total-x")').on('click', function () {
            var groupid = $(this).closest('li').attr('data-groupid');
            $(this).prev().val($(this).prev().data('value'));
            $(this).prev().attr('readonly', 'readonly');
            var mcid = $(this).closest('li').attr("id");
            $('#' + id + ' .tl-group>li[data-groupid="' + groupid + '"] > .tl-itemGroup > #' + mcid).show();
            $(this).parent('li').remove();
            initDraggable(id);
        });


    };


    //左侧指标组拖曳

    var initDroppable = function (id) {

        $( "#sortable" ).sortable({
            revert: true
        });

        $( "#sortable1" ).sortable({
            revert: true
        });

        $('#' + id + ' .tr-group').droppable({
            connectToSortable: "#sortable",
            activeClass: "ui-state-default",
            hoverClass: "ui-state-hover",
            accept: "#" + id + " .tl-group>li",
            drop: function (event, ui) {
                if (ui.draggable.find('li').length > 0) {
                    var groupid = ui.draggable.attr('data-groupid');
                    if ($('#' + id + ' .tr-group > li[data-groupid="' + groupid + '"]').length > 0) {
                        var zbitems = ui.draggable.find('ul.tl-itemGroup').find('li').clone();
                        var int = $(zbitems).find('input');
                        int.each(function () {
                            var subHeading = $(this).prev().text() + " " + $(this).val();
                            $(this).after('<span class="edit-subheading">（' + subHeading+ '）</span>');
                        });
                        int.removeAttr('readonly');
                        $('#' + id + ' .tr-group > li[data-groupid="' + groupid + '"] > ul.tr-itemGroup> li.add-in-tcf').before(zbitems);
                    } else {
                        var tempLeft = ui.draggable.clone();
                        $(tempLeft).attr('data-ischoose', 'true');
                        $(tempLeft).find('h6 .close-x').addClass("total-x");
                        var input = $(tempLeft).find('input');
                        input.each(function () {
                            var subHeading = $(this).prev().text() + " " + $(this).val();
                            $(this).after('<span class="edit-subheading">（' + subHeading+ '）</span>');

                        });
                        input.removeAttr('readonly');
                        $(tempLeft).find('ul.tl-itemGroup').removeClass('tl-itemGroup').addClass('tr-itemGroup').attr("id","sortable1");

                        var btnAddItem = '<li class="add-in-tcf"><b>' + measureAddTip + '</b></li>';
                        $(btnAddItem).appendTo($(tempLeft).find('ul.tr-itemGroup'));
                        $(this).find('.add-out-tcf').before(tempLeft);
                    }

                    removeSortNumber(id);

                    //拖曳后指标组关闭
                    $(this).find('em.total-x').on('click', function () {
                        $(this).closest('li').find("li").find('em.close-x').click();
                        $(this).closest('li').remove();
                        initDraggable(id);
                        optionSubAlign();
                    });

                    //拖曳指标组小指标关闭
                    $(this).find('em.close-x:not(".total-x")').on('click', function () {
                        var groupid = $(this).closest('li').attr('data-groupid');
                        $(this).prev().val($(this).prev().data('value'));
                        $(this).prev().attr('readonly', 'readonly');

                        var mcid = $(this).closest('li').attr("id");
                        $('#' + id + ' .tl-group>li[data-groupid="' + groupid + '"] > .tl-itemGroup > #' + mcid).show();
                        $(this).closest('li').remove();

                        initDraggable(id);
                        optionSubAlign();

                    });


                    ui.draggable.find('li').hide();

                    //左侧拖曳指标组添加小指标
                    $(this).find('.tr-itemGroup').droppable({
                        connectToSortable: "#sortable1",
                        activeClass: "ui-state-default",
                        hoverClass: "ui-state-hover",
                        accept: "#" + id + " .tl-group>li>ul>li",
                        drop: function (event, ui) {
                            if ($(this).find('ul>li:not(".add-in-tcf")').length >= 6) {
                                alert('一个指标分类中最多能有6个指标，如需再添加，请您移除分类中已有的指标。');
                                return;
                            }
                            var itemTemp = ui.draggable.clone();
                            itemTemp.find('span').hide();
                            var input = itemTemp.find('input');
                            var subHeading = input.prev().text() + " " + input.val();
                            input.after('<span class="edit-subheading">（' + subHeading + '）</span>');
                            input.removeAttr('readonly');
                            itemTemp.removeClass('ui-draggable').removeClass('ui-draggable-handle');
                            $(this).find('.add-in-tcf').before(itemTemp);

                            ui.draggable.hide();
                            removeSortNumber(id);
                            itemTemp.find('em.close-x').on('click', function () {
                                var groupid = $(this).closest('li').attr('data-groupid');
                                $(this).prev().val($(this).prev().data('value'));
                                $(this).prev().attr('readonly', 'readonly');

                                var mcid = $(this).closest('li').attr("id");
                                $('#' + id + ' .tl-group>li[data-groupid="' + groupid + '"] > .tl-itemGroup > #' + mcid).show();
                                $(this).closest('li').remove();
                                initDraggable(id);
                                optionSubAlign();
                            });
                            optionSubAlign();
                        }
                    });
                }
                optionSubAlign();
            }
        });

    };

    //左侧指标拖曳
    var initDraggable = function (id) {
        $('#' + id + ' .tl-group > li').draggable({
            cancel: null,
            appendTo: ".tl-group",
            opacity: 0.7,
            helper: "clone",
            revert: false
        });

        $('#' + id + ' .tl-group > li > ul > li').draggable({
            cancel: null,
            appendTo: ".tl-group",
            opacity: 0.7,
            helper: "clone",
            revert: false
        });
    };

    //拖曳后删除序号
    var removeSortNumber = function (id) {
        $('#' + id + ' .tr-group').each(function (index, e) {

            $(e).find("li span:not(.edit-subheading)").hide();
        });
    };

    return {
        initDragAndDrop: function (id) {
            initDraggable(id);
            initDroppable(id);
            handleDrop(id);
        },
        initDragAndDropWithoutRight: function (id) {
            initDraggable(id);
            initDroppable(id);
        },
        initRightQone: function (id) {
            handleDrop(id);
        },
        initLastDrop: function (id) {
            handleLastDrop(id);
        }
    }

}();


//全新建模

//全新建模函数定义
function liMargin(id) {
    $('#'+id+' .zb-style1>ul>li:odd,'+'#'+id+' .zb-style2>ul>li:odd,'+'#'+id+' .zb-style3>ul>li:odd').css({ "margin-left": "4%","clear":"right"});
    $('#'+id+' .zb-style1>ul>li:even,'+'#'+id+' .zb-style2>ul>li:even,'+'#'+id+' .zb-style3>ul>li:even').css({ "margin-left": "0","clear":"left"});
}

//全新建模指标及指标组创建、关闭

function zbBuilt(id){
    //样式选择
    $('#'+id+ ' .radione  input[type=radio]').radioSmart();
    $('#'+id+ ' .radione').click(function(){
        var ind=$(this).index();
        $('#'+id+ ' .bn-right .zbShow>div').eq(ind).show().siblings().hide();
    });

    //无需创建新指标的关闭按钮
    $(document).on('click','.zbShow .close-x:not(".second-x")', function(){
        $(this).parent().remove();
        liMargin(id);
    });

    //一级指标结构创建
    $('#'+id+' .zb-style1 .add-mdGroup').click(function(){
        $(this).before('<li><input type="text" value="新建一级指标"/><em class="close-x icon-close icon"></em></li>')
        liMargin(id);
    });

    //二级指标结构创建
    $('#'+id+' .zb-style2>ul>.add-mdGroup').click(function(){
        $(this).before(' <li class="module-item"><h6><input type="text" value="新建一级指标"/></h6><em class="close-x icon-close icon"></em><ul class="clearfix">'+
            '<li><input type="text" value="新建二级指标" data-value="新建二级指标"><em class="close-x icon-close icon"></em></li>'+
            '<li> <input type="text" value="新建二级指标" data-value="新建二级指标"><em class="close-x icon-close icon"></em></li><li class="zbAdd add-mdGroup"><b>点击此创建二级新标题</b></li> </ul> </li>');
        liMargin(id);

    });

    //三级指标结构创建
    $('#'+id+' .zb-style3 .add-mdGroup').click(function(){
        $(this).before(' <li class="module-item"><h6><input type="text" value="新建一级指标"/></h6><em class="close-x icon-close icon"></em><ul class="clearfix">'+
            '<div><li><input type="text" value="新建二级指标" data-value="新建二级指标"><em class="second-x close-x icon-close icon"></em></li>'+
            '<li class="style3-item"><input type="text" value="新建三级指标" data-value="新建三级指标"><em class="close-x icon-close icon"></em></li><li class="zbAdd style3-item add-style3"><b>点击此创建三级新标题</b></li></div>' +
            '<div><li><input type="text" value="新建二级指标" data-value="新建二级指标"><em class="second-x close-x icon-close icon"></em></li>'+
            '<li class="style3-item"><input type="text" value="新建三级指标" data-value="新建三级指标"><em class="close-x icon-close icon"></em></li>'+
            '<li class="style3-item"><input type="text" value="新建三级指标" data-value="新建三级指标"><em class="close-x icon-close icon"></em></li>'+
            '<li class="zbAdd style3-item add-style3"><b>点击此创建三级新标题</b></li></div><li class="zbAdd add-last"><b>点击此创建二级新标题</b></li>'+
            '</ul></li>');
        liMargin(id);

        //二级小指标关闭和创建
        $('#'+id+' .zb-style3 .second-x').unbind('click').click(function(){
            $(this).parent().parent().remove();
            //$(this).parent().before('<li class="zbAdd preSecond-new"><b>点击此创建二级新标题</b></li>');
            //$(".preSecond-new").click(function(){
            //    var li= $(this).next(":hidden");
            //    $(this).hide();
            //    li.show();
            //})
        });

        //三级小指标创建
        $('#'+id+' .zb-style3 .add-style3').unbind('click').click(function(){
            $(this).before('<li class="style3-item"><input type="text" value="新建三级指标" data-value="新建三级指标"><em class="self-close close-x icon-close icon"></em></li>');
        });



        //点击最后一个二级小指标创建
        $('#'+id+' .zb-style3 li ul li.add-last').unbind('click').click(function(){
            $(this).before('<div><li class="lastSecond-new"><input type="text" value="新建二级指标" data-value="新建二级指标"><em class="second-x close-x icon-close icon"></em></li><li class="zbAdd style3-item"><b>点击此创建三级新标题</b></li></div>');

            $('#'+id+' .lastSecond-new .second-x').unbind('click').click(function(){
                $(this).parent().parent().remove();
                liMargin(id);
            });

            //点击最后一个二级指标创建的三级小指标创建
            var li=$(this).prev().find(".style3-item");
            $(li).unbind('click').click(function(){
                li.before('<li class="lastThird-new style3-item"><input type="text" value="新建三级指标" data-value="新建三级指标"><em class="third-x close-x icon-close icon"></em></li>');
            })
        });
    });

}
