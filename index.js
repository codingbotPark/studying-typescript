"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var 변수 = "kim"; // 변수 타입 지정
// 변수 = 123 // 타입 오류를 알려준다
var 배열 = ["하이요", "123"]; // 배열 타입지정
var 객체 = { name: "박병관" }; // 객체 타입 지정
// // ?를 해서 들어올수도, 안 들어올 수도 있는 속성을 표시
var 숫자또는문자열 = "kim"; // 다양한 타입이 올 수 있도록 한다
var 숫자또는문자열1 = "park"; // 타입은 변수로 만들 수 있음
// 파라미터에 타입 지정
// 리턴 될 값 타입 지정
function 함수(x) {
    return x * 2;
}
var join = [1, true];
// part1 3강 문제1
var myName = "park";
var myAge = 18;
var myLocation = "Deagu";
// part1 3강 문제2
var my = {
    song: "네가 없는 밤",
    singer: "아이유",
};
var project = {
    member: ["kim", "park"],
    days: 30,
    started: true,
};
// union type | 타입 2개 이상 합친 새로운 타입
var 회원 = "park";
var 회원들 = [1, "2", 3];
var 오브젝트 = { a: "123" };
// any type | 모든 자료형을 허용해줌
var 이름;
이름 = 123;
이름 = [];
// 타입실드 해제 = 일반 js
// nuknown type | 모든 자료형을 허용
// unknown이라는 "타입" 을 가지기 때문에
// any보다 조금더 안정성이 있다
var unknownTest;
unknownTest = 123;
// part1 4강 문제1
var user = "kim";
var age = undefined;
var married = false;
var 철수 = [user, age, married];
// part1 4강 문제2
var 학교 = {
    score: [100, 97, 84],
    teacher: "Phil",
    friend: "John",
};
학교.score[4] = false;
학교.friend = ["Lee", 학교.teacher];
// part1 5강 문제1
function 이름출력함수(이름) {
    if (이름) {
        console.log("안녕하세요" + 이름);
    }
    else {
        console.log("입력이 안됨");
    }
}
// part1 5강 문제2
function 글자수세는함수(x) {
    if (typeof x == "number") {
        var stringTemp = x.toString();
        var numberTemp = stringTemp.length;
        return numberTemp;
    }
    else {
        var numberTemp = x.length;
        return numberTemp;
    }
}
// 코딩애플코드
// function 자릿수세기(x :number | string) :number {
//     return x.toString().length
//   }
// part1 5강 문제3
function 결혼가능확률함수(월소득, 집보유여부, 매력점수) {
    var score = 월소득;
    if (집보유여부) {
        score += 500;
    }
    if (매력점수 == "상") {
        score += 100;
    }
    if (score >= 600) {
        return "결혼가능";
    }
}
var 테스트;
테스트 = 4;
var test = {
    size: 4,
    position: [10, 2],
};
var test1 = {
    name: "kim",
    phone: 123,
    email: "abc@naver.com",
};
var test2 = {
    name: "박병관",
    phone: 811919,
    email: "pbk575@gmail.com",
    age: false,
};
function test3(a) {
    return ["가위"];
}
test3("가위");
var 자료 = {
    name: "park",
};
function 내함수(a) { }
// 내함수('park')
내함수(자료.name);
// part1 9강 문제1
var 회원정보 = {
    name: "kim",
    age: 30,
    plusOne: function (x) {
        return x + 1;
    },
    changeName: function () {
        console.log("안녕");
    },
};
회원정보.plusOne(1);
회원정보.changeName();
var cutZero = function (x) {
    var result = x.replace(/^0+/, "");
    return result;
};
function removeDash(x) {
    var result = x.replace(/-/g, "");
    return parseFloat(result);
}
// part1 9강 문제3
// type 만들함수Type = ()
function 만들함수(param, 함수1, 함수2) {
    console.log(함수2(함수1(param)));
}
만들함수("010-1111-2222", cutZero, removeDash);
var Person = /** @class */ (function () {
    function Person(a) {
        this.name = a;
    }
    return Person;
}());
var 사람1 = new Person("park");
var 사람2 = new Person("kim");
// part1 13강 숙제1
var Car = /** @class */ (function () {
    function Car(a, b) {
        this.model = a;
        this.price = b;
    }
    Car.prototype.tax = function () {
        console.log(this.price / 10);
    };
    return Car;
}());
var car1 = new Car("소나타", 3000);
console.log(car1); //콘솔창 출력결과는 { model : '소나타', price : 3000 }
console.log(car1.tax()); //콘솔창 출력결과는 300
var 학생 = { name: "kim" };
var 선생 = { name: "kim", age: 20 };
// part2 1강 숙제1
function 함수1강1() {
    var a = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        a[_i] = arguments[_i];
    }
    console.log(Math.max.apply(Math, a));
}
함수1강1(1, 3, 2);
// part2 1강 숙제2
function 함수1강2(_a) {
    var user = _a.user, comment = _a.comment, admin = _a.admin;
    console.log(user, comment, admin);
}
함수1강2({ user: "kim", comment: [3, 5, 4], admin: false });
// part2 1강 숙제3
function 함수1강3(_a) {
    var a = _a[0], b = _a[1], c = _a[2];
    console.log(a, b, c);
}
함수1강3([40, "wine", false]);
var mt = "hi";
function 함수113(x) { }
// part2 5강 숙제1
var User = /** @class */ (function () {
    function User() {
        this.z = 30;
    }
    User.x = 10;
    User.y = 20;
    return User;
}());
User.y = 4;
var NewUser = /** @class */ (function (_super) {
    __extends(NewUser, _super);
    function NewUser() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.z = 40;
        return _this;
    }
    return NewUser;
}(User));
// part2 5강 숙제2
var User1 = /** @class */ (function () {
    function User1() {
    }
    User1.addOne = function (num) {
        User1.x += num;
    };
    User1.printX = function () {
        console.log(User1.x);
    };
    User1.x = 10;
    User1.y = 20;
    return User1;
}());
User1.addOne(3);
User1.addOne(4);
User1.printX();
// part2 5강 숙제3
var 네모 = /** @class */ (function () {
    function 네모(x, y, color) {
        this.width = x;
        this.height = y;
        this.color = color;
    }
    네모.prototype.draw = function () {
        var a = Math.floor(Math.random() * 100);
        var madeSquare = "<div\n            style=\"\n            position:relative;\n            top:".concat(a, "\n            left:").concat(a, "\n            width:").concat(this.width, "\n            height:").concat(this.height, "\n            background:").concat(this.color, "\n            \"\n        />");
        // document.body.insertAdjacentElement('beforeend',madeSquare)
    };
    return 네모;
}());
var square = new 네모(30, 30, "red");
var 네임스페이스2;
(function (네임스페이스2) {
    ;
})(네임스페이스2 || (네임스페이스2 = {}));
var dog1 = 'bark';
var dog2 = { name: 'paw' };
function 함수3(x) {
    return x.length;
}
var a = 함수3("hello");
console.log(a);
var b = 함수3(["hello", "hi"]);
console.log(b);
// 코딩애플 코드
function 함수2(x) {
    console.log(x.length);
}
함수2('hello');
함수2(['kim', 'park']);
var data = '{"name" : "dog", "age" : 1 }';
function 함수7강1(x) {
    return JSON.parse(x);
}
console.log(함수7강1(data));
// part2 7강 숙제2
var Person1 = /** @class */ (function () {
    function Person1(a) {
        this.name = a;
    }
    return Person1;
}());
var a1 = new Person1('어쩌구');
a1.name; //any 타입이 되었넹 
console.log(a1.name, typeof (a1.name));
// part2 10강 숙제1
var food = ["뿌셔뿌셔", 600, true];
// part2 10강 숙제2
var arr = ['동서녹차', 4000, true, false, true, true, false, true];
// part2 10강 숙제3
function 함수10강1() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
}
// part2 10강 숙제4
function 함수10강2() {
    var x = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        x[_i] = arguments[_i];
    }
    var stringArr = [];
    var numberArr = [];
    x.forEach(function (i) {
        if (typeof (i) === "string") {
            stringArr.push(i);
        }
        else {
            numberArr.push(i);
        }
    });
    console.log(stringArr);
    console.log(numberArr);
}
var obj = {
    model: 'k5',
    brand: 'kia',
    price: 6000,
    year: 2030,
    date: '6월',
    percent: '5%',
    dealer: '김차장',
};
var obj1 = {
    'font-size': 10,
    'secondary': {
        'font-size': 12,
        'third': {
            'font-size': 14
        }
    }
};
var age1;
var age2;
