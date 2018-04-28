/**
 * 关于命名空间
 不仅仅是jQuery插件的开发，我们在写任何JS代码时都应该注意的一点是不要污染全局命名空间。因为随着你代码的增多，如果有意无意在全局范围内定义一些变量的话，最后很难维护，也容易跟别人写的代码有冲突。
 比如你在代码中向全局window对象添加了一个变量status用于存放状态，同时页面中引用了另一个别人写的库，也向全局添加了这样一个同名变量，最后的结果肯定不是你想要的。所以不到万不得已，一般我们不会将变量定义成全局的。
 一个好的做法是始终用自调用匿名函数包裹你的代码，这样就可以完全放心，安全地将它用于任何地方了，绝对没有冲突。
 用自调用匿名函数包裹你的代码
 我们知道JavaScript中无法用花括号方便地创建作用域，但函数却可以形成一个作用域，域内的代码是无法被外界访问的。如果我们将自己的代码放入一个函数中，那么就不会污染全局命名空间，同时不会和别的代码冲突。
 如上面我们定义了一个Beautifier全局变量，它会被附到全局的window对象上，为了防止这种事情发生，你或许会说，把所有代码放到jQuery的插件定义代码里面去啊，也就是放到$.fn.myPlugin里面。这样做倒也是种选择。但会让我们实际跟插件定义有关的代码变得臃肿，而在$.fn.myPlugin里面我们其实应该更专注于插件的调用，以及如何与jQuery互动。
 所以保持原来的代码不变，我们将所有代码用自调用匿名函数包裹。
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
 这样做的好处，也就是上面所阐述的那样。另外还有一个好处就是，自调用匿名函数里面的代码会在第一时间执行，页面准备好过后，上面的代码就将插件准备好了，以方便在后面的代码中使用插件。
 目前为止似乎接近完美了。如果再考虑到其他一些因素，比如我们将这段代码放到页面后，前面别人写的代码没有用分号结尾，或者前面的代码将window, undefined等这些系统变量或者关键字修改掉了，正好我们又在自己的代码里面进行了使用，那结果也是不可预测的，这不是 我们想要的。我知道其实你还没太明白，下面详细介绍。
 将系统变量以变量形式传递到插件内部
 来看下面的代码，你猜他会出现什么结果？
 var foo=function(){
    //别人的代码
}//注意这里没有用分号结尾
 //开始我们的代码。。。
 (function(){
    //我们的代码。。
    alert('Hello!');
})();
 本来别人的代码也正常工作，只是最后定义的那个函数没有用分号结尾而以，然后当页面中引入我们的插件时，报错了，我们的代码无法正常执行。
 原因是我们用来充当自调用匿名函数的第一对括号与上面别人定义的函数相连，因为中间没有分号嘛，总之我们的代码无法正常解析了，所以报错。
 所以好的做法是我们在代码开头加一个分号，这在任何时候都是一个好的习惯。
 var foo=function(){
    //别人的代码
}//注意这里没有用分号结尾
 //开始我们的代码。。。
 ;(function(){
    //我们的代码。。
    alert('Hello!');
})();
 同时，将系统变量以参数形式传递到插件内部也是个不错的实践。
 当我们这样做之后，window等系统变量在插件内部就有了一个局部的引用，可以提高访问速度，会有些许性能的提升
 最后我们得到一个非常安全结构良好的代码：
 ;(function($,window,document,undefined){
    //我们的代码。。
    //blah blah blah...
})(jQuery,window,document);
 而至于这个undefined，稍微有意思一点，为了得到没有被修改的undefined，我们并没有传递这个参数，但却在接收时接收了它，因为实际并没有传，所以‘undefined’那个位置接收到的就是真实的'undefined'了。是不是有点hack的味道，值得细细体会的技术，当然不是我发明的，都是从前人的经验中学习。
 所以最后我们的插件成了这样：
 ;(function($, window, document,undefined) {
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
})(jQuery, window, document);
 一个安全，结构良好，组织有序的插件编写完成。
 */
;(function($, window, document,undefined) {
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
})(jQuery, window, document);

$("a").myPlugin({
    'color': '#2b9969',
    'fontSize': '10px'
})