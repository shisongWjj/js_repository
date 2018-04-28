/**
 * 插件开发
 下面我们就来看第二种方式的jQuery插件开发。
 基本方法
 先看一下它的基本格式：
 $.fn.pluginName = function() {
    //your code goes here
}
 基本上就是往$.fn上面添加一个方法，名字是我们的插件名称。然后我们的插件代码在这个方法里面展开。

 比如我们将页面上所有链接颜色转成红色，则可以这样写这个插件：

 $.fn.myPlugin = function() {
    //在这里面,this指的是用jQuery选中的元素
    //example :$('a'),则this=$('a')
    this.css('color', 'red');
}
 在插件名字定义的这个函数内部，this指代的是我们在调用该插件时，用jQuery选择器选中的元素，一般是一个jQuery类型的集合。比如$('a')返回的是页面上所有a标签的集合，且这个集合已经是jQuery包装类型了，也就是说，在对其进行操作的时候可以直接调用jQuery的其他方法而不需要再用美元符号来包装一下。
 所以在上面插件代码中，我们在this身上调用jQuery的css()方法，也就相当于在调用 $('a').css()。
 理解this在这个地方的含义很重要。这样你才知道为什么可以直接商用jQuery方法同时在其他地方this指代不同时我们又需要用jQuery重新包装才能调用，下面会讲到。初学容易被this的值整晕，但理解了就不难。
 现在就可以去页面试试我们的代码了，在页面上放几个链接，调用插件后链接字体变成红色。
 <ul>
 <li>
 <a href="http://www.webo.com/liuwayong">我的微博</a>
 </li>
 <li>
 <a href="http://http://www.cnblogs.com/Wayou/">我的博客</a>
 </li>
 <li>
 <a href="http://wayouliu.duapp.com/">我的小站</a>
 </li>
 </ul>
 <p>这是p标签不是a标签，我不会受影响</p>
 <script src="jquery-1.11.0.min.js"></script>
 <script src="jquery.myplugin.js"></script>
 <script type="text/javascript">
 $(function(){
        $('a').myPlugin();
    })
 </script>
 下面进一步，在插件代码里处理每个具体的元素，而不是对一个集合进行处理，这样我们就可以针对每个元素进行相应操作。
 我们已经知道this指代jQuery选择器返回的集合，那么通过调用jQuery的.each()方法就可以处理合集中的每个元素了，但此刻要注意的是，在each方法内部，this指带的是普通的DOM元素了，如果需要调用jQuery的方法那就需要用$来重新包装一下。
 比如现在我们要在每个链接显示链接的真实地址，首先通过each遍历所有a标签，然后获取href属性的值再加到链接文本后面。
 更改后我们的插件代码为：
 $.fn.myPlugin = function() {
    //在这里面,this指的是用jQuery选中的元素
    this.css('color', 'red');
    this.each(function() {
        //对每个元素进行操作
        $(this).append(' ' + $(this).attr('href'));
    }))
}
 调用代码还是一样的，我们通过选中页面所有的a标签来调用这个插件
 到此，你已经可以编写功能简单的jQuery插件了。是不是也没那么难。
 下面开始jQuery插件编写中一个重要的部分，参数的接收。
 支持链式调用
 我们都知道jQuery一个时常优雅的特性是支持链式调用，选择好DOM元素后可以不断地调用其他方法。
 要让插件不打破这种链式调用，只需return一下即可。
 $.fn.myPlugin = function() {
    //在这里面,this指的是用jQuery选中的元素
    this.css('color', 'red');
    return this.each(function() {
        //对每个元素进行操作
        $(this).append(' ' + $(this).attr('href'));
    }))
}
 * @param options
 */
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