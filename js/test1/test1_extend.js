//https://www.cnblogs.com/ajianbeyourself/p/5815689.html#_label6
//1.通过$.extend()来扩展jQuery
/*
jQuery插件开发模式
软件开发过程中是需要一定的设计模式来指导开发的，有了模式，我们就能更好地组织我们的代码，并且从这些前人总结出来的模式中学到很多好的实践。
根据《jQuery高级编程》的描述，jQuery插件开发方式主要有三种：
通过$.extend()来扩展jQuery
通过$.fn 向jQuery添加新的方法
通过$.widget()应用jQuery UI的部件工厂方式创建
通常我们使用第二种方法来进行简单插件开发，说简单是相对于第三种方式。第三种方式是用来开发更高级jQuery部件的，该模式开发出来的部件带有很多jQuery内建的特性，比如插件的状态信息自动保存，各种关于插件的常用方法等，非常贴心，这里不细说。
而第一种方式又太简单，仅仅是在jQuery命名空间或者理解成jQuery身上添加了一个静态方法而以。所以我们调用通过$.extend()添加的函数时直接通过$符号调用（$.myfunction()）而不需要选中DOM元素($('#example').myfunction())。请看下面的例子。
复制代码
$.extend({
    sayHello: function(name) {
        console.log('Hello,' + (name ? name : 'Dude') + '!');
    }
})
$.sayHello(); //调用
$.sayHello('Wayou'); //带参调用
上面代码中，通过$.extend()向jQuery添加了一个sayHello函数，然后通过$直接调用。到此你可以认为我们已经完成了一个简单的jQuery插件了。
但如你所见，这种方式用来定义一些辅助方法是比较方便的。比如一个自定义的console，输出特定格式的信息，定义一次后可以通过jQuery在程序中任何需要的地方调用它。
$.extend({
    log: function(message) {
        var now = new Date(),
            y = now.getFullYear(),
            m = now.getMonth() + 1, //！JavaScript中月分是从0开始的
            d = now.getDate(),
            h = now.getHours(),
            min = now.getMinutes(),
            s = now.getSeconds(),
            time = y + '/' + m + '/' + d + ' ' + h + ':' + min + ':' + s;
        console.log(time + ' My App: ' + message);
    }
})
$.log('initializing...'); //调用
但这种方式无法利用jQuery强大的选择器带来的便利，要处理DOM元素以及将插件更好地运用于所选择的元素身上，还是需要使用第二种开发方式。你所见到或使用的插件也大多是通过此种方式开发。
* */
//ES5
/*$.extend({
    sayHello: function(name) {
        console.log('Hello,' + (name ? name : 'Dude') + '!');
    }
})*/
//ES6
$.extend({
    sayHello:function (name) {
        name = name? name :'Dude';
        console.log(`hello ${name}`);
    }
})
$.sayHello(); //调用
$.sayHello('Wayou'); //带参调用


