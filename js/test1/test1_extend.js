//https://www.cnblogs.com/ajianbeyourself/p/5815689.html#_label6
//1.通过$.extend()来扩展jQuery
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


