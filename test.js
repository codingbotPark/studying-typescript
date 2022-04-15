var Person1 = /** @class */ (function () {
    function Person1(a) {
        this.name = a;
    }
    return Person1;
}());
var a1 = new Person1('어쩌구');
a1.name; //any 타입이 되었넹 
console.log(a1.name, typeof (a1.name));
