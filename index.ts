let 변수: string = "kim"; // 변수 타입 지정
// 변수 = 123 // 타입 오류를 알려준다

let 배열: string[] = ["하이요", "123"]; // 배열 타입지정

let 객체: { name: string; age?: number } = { name: "박병관" }; // 객체 타입 지정
// // ?를 해서 들어올수도, 안 들어올 수도 있는 속성을 표시

let 숫자또는문자열: string | number = "kim"; // 다양한 타입이 올 수 있도록 한다

type strOrNum = string | number;
let 숫자또는문자열1: strOrNum = "park"; // 타입은 변수로 만들 수 있음

// 파라미터에 타입 지정
// 리턴 될 값 타입 지정
function 함수(x: number): number {
  return x * 2;
}

// 배열에 사용할 수 있는 tuple이라는 타입
type Member = [number, boolean];
let join: Member = [1, true];

// part1 3강 문제1
const myName: string = "park";
const myAge: number = 18;
const myLocation: string = "Deagu";

// part1 3강 문제2
let my: { song: string; singer: string } = {
  song: "네가 없는 밤",
  singer: "아이유",
};

let project: { member: string[]; days: number; started: boolean } = {
  member: ["kim", "park"],
  days: 30,
  started: true,
};

// union type | 타입 2개 이상 합친 새로운 타입
let 회원: number | string = "park";
let 회원들: (number | string)[] = [1, "2", 3];
let 오브젝트: { a: string | number } = { a: "123" };

// any type | 모든 자료형을 허용해줌
let 이름: any;
이름 = 123;
이름 = [];
// 타입실드 해제 = 일반 js

// nuknown type | 모든 자료형을 허용
// unknown이라는 "타입" 을 가지기 때문에
// any보다 조금더 안정성이 있다
let unknownTest: unknown;
unknownTest = 123;

// part1 4강 문제1
let user: string = "kim";
let age: undefined | number = undefined;
let married: boolean = false;
let 철수: (string | number | undefined | boolean)[] = [user, age, married];

// part1 4강 문제2
let 학교: {
  score: (number | boolean)[];
  teacher: string;
  friend: string | string[];
} = {
  score: [100, 97, 84],
  teacher: "Phil",
  friend: "John",
};
학교.score[4] = false;
학교.friend = ["Lee", 학교.teacher];

// part1 5강 문제1
function 이름출력함수(이름: number | string): void {
  if (이름) {
    console.log("안녕하세요" + 이름);
  } else {
    console.log("입력이 안됨");
  }
}

// part1 5강 문제2
function 글자수세는함수(x: number | string): number {
  if (typeof x == "number") {
    const stringTemp: string = x.toString();
    const numberTemp: number = stringTemp.length;
    return numberTemp;
  } else {
    const numberTemp: number = x.length;
    return numberTemp;
  }
}
// 코딩애플코드
// function 자릿수세기(x :number | string) :number {
//     return x.toString().length
//   }

// part1 5강 문제3
function 결혼가능확률함수(
  월소득: number,
  집보유여부: boolean,
  매력점수: string
): string | void {
  let score: number = 월소득;
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

// part1 7강 문제1
// object타입을 정의한 type alias 두 개를 &기호로 합칠 때 중복된 속성이 있다면?
type NumberType1 = number;
type NumberType2 = number;
let 테스트: NumberType1 & NumberType2;
테스트 = 4;

// part1 7강 문제2
type TestType = {
  color?: string;
  size: number;
  readonly position: number[];
};
const test: TestType = {
  size: 4,
  position: [10, 2],
};

// part1 7강 문제3
type CheckInputsType = {
  name: string;
  phone: number;
  email: string;
  age?: boolean;
};
const test1: CheckInputsType = {
  name: "kim",
  phone: 123,
  email: "abc@naver.com",
};
const test2: CheckInputsType = {
  name: "박병관",
  phone: 811919,
  email: "pbk575@gmail.com",
  age: false,
};

function test3(a: "가위" | "바위" | "보"): ("가위" | "바위" | "보")[] {
  return ["가위"];
}
test3("가위");

var 자료 = {
  name: "park",
} as const;

function 내함수(a: "park") {}
// 내함수('park')
내함수(자료.name);

// part1 9강 문제1
let 회원정보: {
  name: string;
  age: number;
  plusOne: (x: number) => number;
  changeName: () => void;
} = {
  name: "kim",
  age: 30,
  plusOne(x): number {
    return x + 1;
  },
  changeName: () => {
    console.log("안녕");
  },
};
회원정보.plusOne(1);
회원정보.changeName();

// part1 9강 문제2
// type CutZeroType = (str : string) => string
// let zeroType : CutZeroType = function(str){
//     if (str.charAt(0) === '0'){
//         str.slice(0,1)
//     }
//     return str
// }

// type RemoveDashType = (a : string) => number
// let removeDash : RemoveDashType = function(a){
//    return a.replace(/\-/g,'');
// }

// // 코딩애플 코드
type CutType = (x: string) => string;

let cutZero: CutType = function (x) {
  let result = x.replace(/^0+/, "");
  return result;
};
function removeDash(x: string): number {
  let result = x.replace(/-/g, "");
  return parseFloat(result);
}

// part1 9강 문제3
// type 만들함수Type = ()
function 만들함수(param: string, 함수1: any, 함수2: any) {
  console.log(함수2(함수1(param)));
}

만들함수("010-1111-2222", cutZero, removeDash);

class Person {
  name: string;
  constructor(a: string) {
    this.name = a;
  }
}
let 사람1 = new Person("park");
let 사람2 = new Person("kim");

// part1 13강 숙제1
class Car {
  model: string;
  price: number;
  constructor(a: string, b: number) {
    this.model = a;
    this.price = b;
  }
  tax(): void {
    console.log(this.price / 10);
  }
}
let car1 = new Car("소나타", 3000);
console.log(car1); //콘솔창 출력결과는 { model : '소나타', price : 3000 }
console.log(car1.tax()); //콘솔창 출력결과는 300

// interface 학생Type {name : string}
// let 학생:학생Type = {name : 'kim'}
// interface 선생Type {name : string, age : number}
// let 선생:선생Type= {name : 'kim', age : 20}

interface 학생Type {
  name: string;
}
let 학생: 학생Type = { name: "kim" };
interface 선생Type extends 학생Type {
  age: number;
}
let 선생: 선생Type = { name: "kim", age: 20 };

// part2 1강 숙제1
function 함수1강1(...a: number[]): void {
  console.log(Math.max(...a));
}
함수1강1(1, 3, 2);

// part2 1강 숙제2
function 함수1강2({
  user,
  comment,
  admin,
}: {
  user: string;
  comment: number[];
  admin: boolean;
}) {
  console.log(user, comment, admin);
}
함수1강2({ user: "kim", comment: [3, 5, 4], admin: false });

// part2 1강 숙제3
function 함수1강3([a, b, c]: [a: number, b: string, c: boolean]) {
  console.log(a, b, c);
}
함수1강3([40, "wine", false]);

const mt: string = "hi";

function 함수113(x?: number) {}

// part2 5강 숙제1
class User {
  private static x = 10;
  public static y = 20;
  protected z = 30;
}

User.y = 4;

class NewUser extends User {
  z = 40;
}

// part2 5강 숙제2
class User1 {
  private static x = 10;
  public static y = 20;
  static addOne(num: number) {
    User1.x += num;
  }
  static printX() {
    console.log(User1.x);
  }
}

User1.addOne(3);
User1.addOne(4);
User1.printX();

// part2 5강 숙제3
class 네모 {
  private width: number;
  private height: number;
  private color: string;
  constructor(x: number, y: number, color: string) {
    this.width = x;
    this.height = y;
    this.color = color;
  }
  draw() {
    const a = Math.floor(Math.random() * 100);
    let madeSquare = `<div
            style="
            position:relative;
            top:${a}
            left:${a}
            width:${this.width}
            height:${this.height}
            background:${this.color}
            "
        />`;
    // document.body.insertAdjacentElement('beforeend',madeSquare)
  }
}
let square = new 네모(30, 30, "red");

// part2 6강 숙제1
// export
export type Car1 = {
  wheel: number;
  model: string;
};
export interface Bike {
  wheel: 2;
  model: string;
}
// import 
// import {Car1,Bike} from "./index"


// part2 6강 숙제2
namespace 네임스페이스1{
    export type Dog = string;
}
namespace 네임스페이스2{
    export interface Dog { name : string };
}

let dog1 :네임스페이스1.Dog = 'bark';
let dog2 :네임스페이스2.Dog = { name : 'paw' }

// part2 7강 숙제1
interface LengthCheck {
    length:number
}

function 함수3<MyType extends LengthCheck>(x : MyType){
    return x.length
}
let a = 함수3<string>("hello")
console.log(a)
let b = 함수3<string[]>(["hello","hi"])
console.log(b)

function 함수2<MyType extends string | string[]>(x: MyType)  { 
    console.log(x.length)   
} 

함수2<string>('hello');
함수2<string[]>(['kim','park'])

