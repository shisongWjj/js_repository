//2.通过$.fn 向jQuery添加新的方法
$.fn.myPlugin = function(options) {
    //让插件接收参数
    var defaults = {
        'color': 'red',
        'fontSize': '12px'
    };
    debugger;
    //var settings = $.extend(defaults, options);
    //保护默认参数
    var settings = $.extend({},defaults, options);
    //在这里面,this指的是用jQuery选中的元素
    //example :$('a'),则this=$('a')
    this.css('color', settings.color);
    this.css('fontSize', settings.fontSize);
    this.each(function() {
        //对每个元素进行操作
        $(this).append(' ' + $(this).attr('href'));
    });
}

$(function(){
    $('a').myPlugin({
        'color': '#2b9969',
        'fontSize': '20px'
    });
})