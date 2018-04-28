/**
 * 面向对象的插件开发
 为什么要有面向对象的思维，因为如果不这样，你可能需要一个方法的时候就去定义一个function，当需要另外一个方法的时候，再去随便定义一个function，同样，需要一个变量的时候，毫无规则地定义一些散落在代码各处的变量。
 还是老问题，不方便维护，也不够清晰。当然，这些问题在代码规模较小时是体现不出来的。
 如果将需要的重要变量定义到对象的属性上，函数变成对象的方法，当我们需要的时候通过对象来获取，一来方便管理，二来不会影响外部命名空间，因为所有这些变量名还有方法名都是在对象内部。
 接着上面的例子，我们可以把这个插件抽象成一个美化页面的对象，因为他的功能是设置颜色啊字体啊什么的，当然我们还可以加入其他功能比如设置下划线啊什么的。当然对于这个例子抽象成对象有点小题大做，这里仅作演示用。以后我可能会介绍我编写的一个jQuery插件SlipHover,其中代码就比较多，这样的模式就用得上了。
 所以我们新建一个对象命名为Beautifier，然后我们在插件里使用这个对象来编码。
 //定义Beautifier的构造函数
 var Beautifier = function(ele, opt) {
    this.$element = ele,
    this.defaults = {
        'color': 'red',
        'fontSize': '12px',
        'textDecoration':'none'
    },
    this.options = $.extend({}, this.defaults, opt)
}
 //定义Beautifier的方法
 Beautifier.prototype = {
    beautify: function() {
        return this.$element.css({
            'color': this.options.color,
            'fontSize': this.options.fontSize,
            'textDecoration': this.options.textDecoration
        });
    }
}
 //在插件中使用Beautifier对象
 $.fn.myPlugin = function(options) {
    //创建Beautifier的实体
    var beautifier = new Beautifier(this, options);
    //调用其方法
    return beautifier.beautify();
}
 通过上面这样一改造，我们的代码变得更面向对象了，也更好维护和理解，以后要加新功能新方法，只需向对象添加新变量及方法即可，然后在插件里实例化后即可调用新添加的东西。
 插件的调用还是一样的，我们对代码的改动并不影响插件其他地方，只是将代码的组织结构改动了而以。
 $(function() {
    $('a').myPlugin({
        'color': '#2C9929',
        'fontSize': '20px'
    });
})
 指定文字带下划线（我们在Beautifier对象中新加的功能，默认不带下划线，如上面的例子）的调用：
 $(function() {
    $('a').myPlugin({
        'color': '#2C9929',
        'fontSize': '20px',
        'textDecoration': 'underline'
    });
})
 到这里，你可以更好地编写复杂的插件同时很好地组织代码了。当我们回头去看上面的代码时，其实也还是有改进空间的。也就是下面介绍的关于命名空间及变量各什么的，一些杂项。
 */
(function() {
    //定义Beautifier的构造函数
    var Beautifier = function(ele, opt) {
        this.$element = ele,
            this.defaults = {
                'color': 'red',
                'fontSize': '12px',
                'textDecoration': 'none'
            },
            this.options = $.extend({}, this.defaults, opt)
    }
    //定义Beautifier的方法
    Beautifier.prototype = {
        beautify: function() {
            return this.$element.css({
                'color': this.options.color,
                'fontSize': this.options.fontSize,
                'textDecoration': this.options.textDecoration
            });
        }
    }
    //在插件中使用Beautifier对象
    $.fn.myPlugin = function(options) {
        //创建Beautifier的实体
        var beautifier = new Beautifier(this, options);
        //调用其方法
        return beautifier.beautify();
    }
})();

$("a").myPlugin({
    'color': '#2b9969',
    'fontSize': '10px'
})