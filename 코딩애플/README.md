## part 1 : 꼭 알아야할 내용
1강
* ts를 사용하기 위해 터미널에 `npm install -g typescript` 를 해서 설치한다
* .ts파일은 브라우저가 못 읽기 때문에 js로 변환해서 사용해야 한다
* 터미널에`tsc -w` 를 입력해 두면 js파일로 자동변환이 된다
* 이렇게 js파일로 변환하는 것을 컴파일 한다고 하는데 이 컴파일 하는 옵션들을 tsconfig.json이라는 파일에 저장한 것이다
* 변수에 타입지정 예를 보면
```ts
let 이름: string = "kim";
```

5 강
* 함수에 타입 지정에서 함수는 return 을 사용하지 않는다면 더 엄격히 타입을 지정한다면 void라는 타입을 지정해줄 수 있다
* 타입이 지정된 파라미터는 필수이다
* 파라미터가 옵션일 때 `파라미터변수? : 타입` 의 형식이 될 수 있는데 이 `?` 는 `undefined`라는 타입과 같은 역할을 한다
즉 `(x? : number)` = `(x : number | undefined)`
* 함수에서 파라미터의 타입에 따른 다른 행동을 지정하는 것을 **narrowing**이라 한다

6강
```ts
function 내함수(x : number | string) {
    let array :number[] = [];
    array[0] = x as number;
}
내함수(123)
```
* 위처럼 `as` 를 사용해 **assertion** 문법 (타입 덮어쓰기)를 할 수 있다
* 하지만 as의 용도를 잘 알고 사용해야한다, 용도를 살펴보면
1. Narrowing할 때(위처럼 유니온을 확정 등)
2. 어떤 타입이 들어올지 확신 할 때(버그 캐치를 위해)

* 코드를 짜다가 콘솔창에 변수를 출력 해보고 싶다면 ts -> js된 파일(나는 `index.js`)를 html파일에 넣는다
```html
...
<script src="index.js"></script>
...
```

7강
* type alias(별칭)을 타입 정의가 길어지면 사용할 수 있다
```ts
let 동물:string | number | undefined;
```
위와 같은 타입 지정을
아래와 같은 별칭으로 만들 수 있다
```ts
type Animal = string | number | undefined
let 동물:Animal
```

* object자료 수정을 막는 방법은 `readonly`를 사용해 막을 수 있다
```ts
type Grilfriend = {
    readonly name : string
}
const 여친 : Grilfriend = {
    name : "엠버"
}
```

* type변수는 당연히 union type으로도 합칠 수 있다
* &연산자로 object타입을 합칠 수 있다, 이 합치는 것을 **extend**라고 한다

```ts
type PositionX = {x : number};
type PositionY = {y : number};
type NewType = PositionX & PositionY
let position : NewType = {x : 10, y:20}
```

8강
* 내가 미리 들어올 수 있는 자료들을 지정해 놓는 것을 **literal types**

```ts
let 이름 : 123
// 이렇게 literal type을 지정해 놓으면
// 이름 = 125 를 했을 때 오류가 난다
```
이런 literal type을 더 활용하면
```ts
let 접니다 : "대머리" | "솔로";

function 함수(a : "hello") : 1 | 0 {
    return 1
}
```
이처럼 함수의 인자 값과, 리턴 값에 literal type을 사용할 수 있다

* 하지만 literal type에도 조금 문제가 생길 수 있다
```ts
var 자료 = {
    name : 'park'
}

function 내함수(a : 'park'){

}
내함수('park')
// 내함수(자료.name) 이와같은 상황에서 오류가 난다
```
왜 이런 오류가 나는가를 생각해보면 `내함수`는 `'park'` 만 받을 수 있지만, `자료.name`은 받지 못한다

이 때 변수에 `as` 를 사용할 수도 있다
```ts
var 자료 = {
    name : 'park'
} as const
```

효과는 
1. object value를 그대로 타입이 사용됨
2. object의 속성들에 `readonly`가 붙어지는 것과 같다

9강
* 함수 type alias를 부착하려면 함수표현식을 사용해야 한다
```ts
type 함수타입 = (a:string) => number
function 함수:함수타입() {
    return a
}
let 함수 : 함수타입 = function("문자열"){
    return 1
}
```

* object안에 함수 타입지정
```ts
let 회원정보:{} = {
    name : 'kim'
    ,
    plus(a:number):number{
        return a + 1
    },
    changeName :  (a:number) :number => {}
}
```

* 콜백함수의 예를 보면
```ts
function 함수1(a){
    a()
}
function 함수2(a){

}
```

10강
* html태그를 ts로 `querySelector`를 사용해 태그를 가져오려면 narrowing이 필요하다(null일 수도 있어서) 그래서 아래와 같은 방법들이 있다

```ts
let 제목 = document.querySelector("#title")
if (제목 instanceof Element) {
    제목.innerHTML = '반가워요'
}
```
위와같이 `instanceof`를 가장 많이 사용한다

```ts
let 제목 = document.querySelector("#title")
if (제목 != null) {
    제목.innerHTML = '반가워요'
}
```

```ts
let 제목 = document.querySelector("#title") as Element
if (제목 != null) {
    제목.innerHTML = '반가워요'
}
```
위는 타입 사기, 100%확신 될 때 사용

```ts
let 제목 = document.querySelector("#title")
if (제목?.innerHTML != undefined) {
    제목.innerHTML = '반가워요'
}
```
위는 optional chaining을 사용 한 것으로 `innerHTML`이 있으면 출력, 없으면 undefined를 뱉는다

* `Element`타입의 상속인 `AnchorElement`로 narrowing을 더 정확하게 할 수 있다(`Element`는 광범위하지만 `HTMLAnchorElement`타입은 `href`,`style`,`class`등을 사용할 수 있다) 이처럼 다른 자식 타입들을 찾아볼 수 있다

* `addEventListener`를 사용할 때도 아래처럼 narrowing이 필요하다
```ts
let 버튼 = document.querySelector("#button");
버튼?.addEventListener("click",function(){

})
```
위처럼 `?`를 사용해 `addEventListener`가 가능하면 하고, 아니면 undefined가 되도록 할 수 있다

* 여러 개의 class를 사용해 narrowing할 때는 아래와 같다

```ts
let 링크 = document.querySelectorAll('.naver');

링크.forEach((a)=>{
  if (a instanceof HTMLAnchorElement){
    a.href = 'https://kakao.com'
  }
})
```

13강
* class를 만들 때도 타입 지정을 한다

```ts
class Person {
    name : string;
    constructor(a : string) {
        this.name = a;
    }
}
let 사람1 = new Person('park');
let 사람2 = new Person('kim');
```

14강
* `interface` 로도 타입을 만들 수 있다

```ts
interface Square {color : string, width : number}
let 네모 = {color : 'red', width:100}
```

* `interface`의 장점은 **extends로 복사가 가능하다** 

```ts
interface 학생Type {name : string}
let 학생:학생Type = {name : 'kim'}
interface 선생Type {name : string, age : number}
let 선생:선생Type= {name : 'kim', age : 20}
```

위와 같은 코드를 extends를 사용해
아래와 같이 만들 수 있다

```ts
interface 학생Type {name : string}
let 학생:학생Type = {name : 'kim'}
interface 선생Type extends 학생Type{
    age : number
}
let 선생:선생Type= {name : 'kim', age : 20}
```

* type도 `&`(inttersection type) 를 활용해 extend가 가능하지만 **interface는 중복 선언이 가능하지만 type은 못 한다**

```ts
interface Student{
    name : string
}
interface Student{
    score : number
}
```
위와 같은 사용이 가능하다,
효과는 `Student``interface`에 `name`과 `scroe`이 존재한다

* `interface`가 사용되는 예로 외부 라이브러리에서 많이 사용된다(타입 커스터마이징 하고 싶을 때 `interface`를 사용하면 **쉽게 타입을 추가할 수 있다**)

* 그래서 `interface`로 전부 다 선언 | 일반 변수 함수 = `type`, object 타입 = `interface`


## part 2 : 알면 도움은 되는 내용
1강
* rest parameter를 사용해 정해지지 않는 인자의 개수만큼 인자를 받을 수 있다

```ts
function 함수(...a){

}
함수(1,5,3,4,2)
```

* rest parameter의 타입 지정하는 방법은 array처럼 해야한다

* destructiuring을 타입지정에 사용할 수 있다

```ts
let {student, age} = {student : true, age : 20}
```

* 함수 파라미터에 object를 보낼 때도 destructuring을 사용해 쉽게 할 수 있다

```ts
함수({student, age}){
    console.log(student, age)
}
함수({student : true, age : 20})
```

4강
ts에서는 객체지향언어같은 문법(public private protected static)도 제공한다 = class많이 만들어 개발할 때 유용

```ts
class User{
    public name = "kim"
    constructor(){
        this.name = "kim"
    }
}
```

class에서 필드를 만드나 constructor를 만드나 결과는 같다, 하지만 class를 만들 때 파라미터를 넣을 수 있다~ 머 이런 차이점

아무튼 위처럼 `public name` 은 모든 자식들이 용가능하게 만든다 = `public`은 항상 부여 되서 의미가 없다

더 중요한건 `private`이다

```ts
class User{
    private name = "kim"
    constructor(){
        this.name = "kim"
    }
}
```

`private`를 하면 클래스 내에서만 변경할 수 있도록 된다
이 `private`가 사용되는 예를 보면

```ts
class User{
    name : string;
    familyName : string = 'park'
    constructor(a){
        this.name = a + this.familyName
    }
}
let 유저1 = new User('민수')
```

`public` 키워드를 사용하면 `this`를 생략할 수 있다

```ts
class Person{
    constructor(public name){

    }
}
let 자식 = new Person('kim')
console.log(자식)
```
이는 객체 생성 때 들어온 값을 바로 public으로 만들어 준다

5강
class를 복사해서 사용할 수 있다
`extends`를 붙여서 class를 복사할 수 있다

```ts
class User{
    x = 10;
}
class NewUser extends User {
    // 이렇게 하면 User클래스가 복사
}
```

protected, private를 붙이면 class{}안에서만 사용이 가능하다,
protected와 private의 차이점은 확장의 차이점이다
확장의 예시로는 위에서 나온 `extends`가 있다

```ts
class User{
    protected x = 10;
}
class NewUser extends User{
    x = 3
    // private는 안 된다
}
```

결론은 protected는 extends된 class는 사용가능, 자식들은 사용이 불가능 하다
private는 extends된 class는 사용 불가능, 자식들은 상용이 불가능

static키워드는 부모만 사용할 수 있도록, 자식들이 사용하지 못하게 한다

```ts
class User{
    static x = 10;
    y = 20;
}
let 자식 = new User();
console.log(자식)
```

이렇게 콘솔을 출력하면 y만 나온다
x는 User라는 부모에서만 사용할 수 있다

extends하면 static이 따라온다

또 static과 private protected는 같이 사용할 수 있다

static이 붙은 변수는 부모 class만 사용할 수 있기 때문에 아래처럼 `this.변수명` 이 아닌 `클래스명.변수명` 으로 사용한다

```ts
class User {
    static skill = 'js'
    intro = User.skill + "전문가입니다"
}

let 철수 = new User();
console.log(철수)

User.skill = "ts"
// 이 이후의 class의 skill은 ts가 된다

let 철수2 = new User();
console.log(철수2) 
```

사실 위와같이 밖에서 변경하는 것은 별로 좋지 않다

### 6강
타입도 import, export를 해서 사용할 수 있다

* 원래 html에서 아래와 같이
```html
<script src="파일명.js"></script>
```
를 했는데, 이 때 `script`가 많아지면서 전역변수명들이 겹칠 확률이 커졌다

그래서 예전에는 **nameSpace**라는 것을 사용했다
```ts
namespace 네임스페이스{
    export type Name = string | number;
}
```
**namespace안에서 export 해주는거 잊지않기**

이는 하나의 오브젝트로 type을 넣어서 사용할 때 그냥 `Name`이 아닌, `네임스페이스.Name`을 해야 사용할 수 있다

이러한 네임스페이스를 공유할 때는 (import, export가 없었기 때문에) `reference`라는 것을 사용했다

```ts
///<reference path="파일명.ts">

네임스페이스.Name;
```

**하지만 지금은 import export만 알면 된다**

export할 수 있는 것은 `type`만이 아닌, `interface`도 할 수 있다
```ts
export type 이름 = string;
export interface 인터페이스{}
```

참고로 namespace 키워드는 더 예전에는 `module` 을 사용했따

### 7강
타입을 파라미터로 입력하는 Generic

함수를 만들 때 파라미터를 자유롭게 입력할 수 있는데, 타입도 파라미터로 입력이 가능하다 = generic

#### array를 입력하면 첫 자료 return해주는 함수
```ts
function 함수(x:unknown[]){
    return x[0]
}
let a = 함수([4,2])
```
이 때 a의 타입은 `함수`를 겨쳐 나왔기 때문에 파라미터 타입인 `unknown`이 된다, 이는 a를 가지고 더 가공하기 힘들어 지기 때문에 `함수`에서 narrowing이나 as를 써서 타입을 추론해줘야 한다

**그래서 두번째 방법은 함수를 사용할 때 타입을 입력을 받을 수 있다 = Generic**

아래처럼 함수를 사용할 때 타입을 입력받아서 함수에서 타입을 부여할 수 있다

```ts
function 함수<MyType>(x : MyType[]):MyType{
    return x[0]
}
let a = 함수<number>([4,3])
console.log(a)
```
이는 함수의 `MyType` 자리에 `number` 를 입력한 것과 같이 작동한다
위에서 `MyType`은 `T`로 많이 사용하곤 한다

이 Generic은 확장성이 조금 있어보이고, 매번 다른 타입이 출력 가능하다는 장점이 있다

**참고로 함수를 사용할 때 타입을 지정하지 않아도 타입 추론이 되는데 개발할 때 가독성을 위해 추가하는 것이 좋다**

```ts
function 함수<MyType>(x : MyType[]):MyType{
    return x[0]
}
let a = 함수([4,3]) // number로 타입추론
console.log(a)
```

**주의해야할 점은 generic을 사용할 때 narrowing이 필요한 상황이 있다는 것이다 => 귀찮으면 타입파라미터를 제한둘 수 있다**

```ts
function 함수<MyType>(x : MyType){
    return x - 1 // -1을 한다는 것은 어쩌면
    // number타입이라는 것을 확정하는 것인데
    // generic은 다른 타입이 들어올 수도 있기 때문에
    // 에러가 난다
}
let a = 함수<number>(100)
```

**그래서 타입파라미터를 제한하는 방법은**
`extends` 키워드를 사용할 수 있따

```ts
function 함수<MyType extends number>(x : MyType){
    return x - 1
}
let a =  함수<number>(100)
```

요기서 `extends`는 원래 알고있던 "복사"의 개념이 아닌 "체크"라 생각하면 된다
ts에서 `extends` 를 사용하면 narrowing으로 생각하게 된다

**응용하면 커스텀 타입으로도 타입 파라미터를 제한 가능하다**

```ts
interface LengthCheck {
    length : number
}

function 함수<MyType extends LengthCheck>(x : MyType){
    return x.length
}
let a =  함수<string[]>(['100'])
```

class만들어 쓸 때도 타입파라미터를 넣을 수 있다


### 8강
#### ts + react 세팅
리액트에서 TS사용 방법을 요약해서 알아보면 ts에서 변수, 함수에 타입지정을 하듯, 똑같이 변수, 함수에 타입지정 잘 하면 된다

```
npx create-react-app 프로젝트명 --template typescript
```
를 하면 ts가 세팅 된 리액트 프로젝트가 생성된다

기존 프로젝트에서 ts를 사용하려면

```
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
```

근데 그냥 새롭게 만드는게 나음..

#### tsx란?
tsx라는 파일은 그냥 ts랑 똑같은데 안에 jsx문법이 있다면 .tsx가 된다 
그러면 jsx = 그냥 안에 있는 html

#### ts in react
```ts
import React from "react";
import './App.css'

let 박스:JSX.Element = <div></div>;
// 더 자세하게는 IntrinsicElements['태그']를 사용할 수 있다
// let 박스:JSX.IntrinsicElements['div'] = <div></div>;

function App(){
    return (
        <div>
            <h4>안녕하세요</h4>
        </div>
    )
}
```

#### component만들 때 타입지정
```ts
import React from "react";
import './App.css'

function Profile():JSX.Element{
    return (
        <div>프로필입니다</div>
    )
}
```

이 `Profile` return의 타입인 `JSX.Element` 를 할 수 있다

props타입지정은 object타입으로 해줄 수 있다

```ts
import React from "react";
import './App.css'

function Profile(props:{name:string, age:number}):JSX.Element{
    return (
        <div>{props.name}</div>
    )
}
```

#### useState타입지정
실시간 렌더링 되는 변수 = useState
이 useState에 타입지정은 사실 알아서 해준다

```ts
const [user, setUser] = useState("kim")
```

만약 진짜 만약 string와 number가 들어올 수 있는 useState가 있다면 아래와 같이 사용할 수 있다

```ts
const [user,setUser] = useState<string | number>('kim');
```


### 8강
리액트에서 리덕스 사용 이유
1. 모든 컴포넌트가 state공유
2. 수정방법을 파일 한 곳에 정의

#### 설치방법
설치방법은 그냥 redux가 ts를 잘 지원해줘서 그냥 깔아도 된다

```
npm install redux react-redux
```

```ts
const 초기값 : {count : number} = {count: 0};

function reducer(state = 초기값, action:{type : string}): ~~
```

사실 리액트를 잘 안써봐서 제대로 정리 안했다

### 11강
array에 붙일 수 있는 tuple type

```ts
let 멍멍:[string,boolean] = ["dog",true]
let 멍멍:[string,boolean?] = ["dog",true]
```

근데 요기서 `?` 를 사용하는 건 맨 마지막에서 시작되어야 한다(들어올 수도 있고 안 들어올 수도 있다)


```ts
function 함수(...x){ // 몇 개의 파라미터가 들어올지 모름 = restParam
    console.log(x)
}
함수(1,2,3,6,3,4) 
```

```ts
function 함수10강1(...x:[string,boolean,...(number|string)[]]){

}
```

spread연산자일 때

```ts
let arr = [1,2,3];
let arr2 : [number,number,...number[]] = [4,5,...arr]
```


### 12강
js 파일을 ts파일로 사용하고 싶을 때 에러가 나오는경우가 있다

```js
// data.js
var a = 10;
var b = {name : 'kim'}
```
```ts
// index.ts
console.log(a + 1) // 오류가뜸
```

콘솔에는 제대로 계산이 되지만 a라는 값의 타입이 확정적이지 않기 때문에 오류가 뜬다 그래서 **declare** 를 사용한다

```ts
// index.ts
declare let a:number;
console.log(a+1)
```

`declare` 는 힌드를 주는 역할을 해서 바뀐 js를 보면 `declare`는 없다

**특히 js로 만든 라이브러리 사요할 때 변수, 함수같은걸 declare로 재정의 한다, 귀찮으면 뒤에 방법이 나온다**

그러면 ts파일을 ts파일로 변수를 가져온다면

```ts
// data.ts
export var a = 10;
```
```ts
// index.ts
import {a} from "./data";
console.log(a + 1)
```
위처럼 사용할 수 있지만 ts의 특징을 활용할 수도 있다
바로 **모든 ts파일은 ambient moudle(글로벌 모듈) 이 된다**

그래서 ts파일끼리는 `import export` 없이 사용할 수 있다

> 그래서 ts테스트할 때 다른 파일의 ts이 겹쳤었다

**그러면 다 전역변수가 되는데, 귀찮아질 수 있다 ts파일을 로컬 모듈로 만들면 된다**
로컬모듈로 만드는 방법은 아래처럼 파일 중 **import, export문법이 있으면 자동으로 로컬 모듈로 변한다**

```ts
export {}
let a = 10
// 로컬모듈이 된다
```

이런 로컬 모듈에서 갑자기 글로벌 변수를 만들고 싶으면 `declare global` 을 사용하면 된다

```ts
let a = 10;
declare global{
    type Dog = string;
}
export {}
```

### 13강
d.ts 파일 어디다 쓰냐?
프로젝트에서 쓰는 타입들의 보관용 파일, 그래서 아래와 같이 사용한다

```ts
// d.ts
type Age = number;
interface Person {name : string}
```

**타입 정의 하는 파일임 그냥, 레퍼런스용으로도 d.ts파일을 사용한다**

`tsconfig.json` 파일에 `declaration : true` 로 하면 파일을 만들고 저장할 때마다 d.ts파일이 생성된다

만약 `index.ts` 에 변수를 만들면 `index.d.ts`에 레퍼런스용으로 파일이 만들어 진다

```ts
// index.ts
let 이름 : string= '김'
```

```ts
// index.d.ts
declare let 이름 : string;
```

그래서 `d.ts` 를 자동생성으로 했을 때는 수정할 필요가 없다

**d.ts파일은 자동으로 글로벌 모듈이 되지 않는다**
이 때 export하기가 정말 귀찮다면!

`tsconfig.json`에 `typeRoots : ["./types"]` 를 한다면 `./types` 라는 파일에 있는 것들은 글로벌로 해주세요! 가 된다

**위험할 수 있기 때문에 그냥 export 쓰자**

#### 만약 외부 라이브러리 쓸 때 타입정의 안 되어있다면?
전 강의에도 나왔지만 [Definitly Typed 깃허브 리포지토리](https://github.com/DefinitelyTyped/DefinitelyTyped)에 착한 사람들이 라이브러리에따라 정리해놨다

귀찮으니 [ts공홈에서 검색](https://www.typescriptlang.org/dt/search?search=)하자

### 14강
interface를 object 타입 지정할 때 사용한다고 배웠다,
한 가지 용도가 더 있는데, class타입을 확인하고 싶을 때도 interface문법을 사용할 수 있다, 정확히는 implement키워드가 필요하다

```ts
class Car{
    model : string;
    price : number = 1000;
    constructor (a : string){
        this.model = a
    }
}
let 붕붕이 = new Car('morning');
```

위와같은 클래스가 있을 때, `class Car`로부터 생산되는 object들은 model과 price속성을 가지게 된다

**이 때 class가 model, price의 속성을 가지고 있는지 타입으로 확인하고 싶다면? interface + implements**

```ts
interface Cartype {
    model : string,
    price : number
}

class Car implements CarType{
    model : string;
    price : number = 1000;
    constructor(a : string){
        this.model = a
    }
}
let 붕붕이 = new Car('morning')
```

위와같이 `implements` 를 사용하면 class에 `interface`의 타입이 모두 있는지 확인하고 빠진게 있으면 에러를 뱉는다

중요한 것은 **implement타입은 interface에 들어있는 속성을 가지고 있는지 확인하는 것이지, class에 타입을 할당하고 변형시키는 키워드는 아니다**

```ts
interface CarType {
  model : string,
  tax : (price :number) => number;
}

class Car implements CarType {
  model;   ///any 타입됨
  tax (a){   ///a 파라미터는 any 타입됨 
    return a * 0.1
  }
}
```

```
지금 CarType을 implements 했냐고 써봤습니다.

근데 CarType에 있던 model : string 이런게 반영되는건 아닙니다. class 안에서의 model은 any 타입임

class 함수도 마찬가지로 함수에 있던 number 타입이 전혀 반영되지 않습니다. 

결론은 implements는 class의 타입을 체크하는 용도지 할당하는게 아님을 명심합시다. 
```

### 15강
**index signature를 사용하면 object타입지정 한번에 가능하다**

```ts
interface StringOnly{
    name : string,
    age : string,
    location : string,
}

let user: StringOnly = {
    name : "kim",
    age : "20",
    location : "Daegu",
}
```

이처럼 모두 string이라는 타입을 사용할 때
아래처럼 index signature을 써서 object타입지정을 한 번에 가능하다

```ts
interface StringOnly{
    [key : string] : string,
    // number또는 string
    // [key : string] : string | number,
}

let user: StringOnly = {
    name : "kim",
    age : "20",
    location : "Daegu",
}
```

아래와 같은 오브젝트 안 오브젝트 자료 타입 지정은?

```ts
// interface myType{
//     "font-size" : {
//         "font-size" : {
//             "font-size" : 14
//         }
//     }  
// }

interface myType{
    "font-size" : MyType | number
}

let css = {
    "font-size" : {
        "font-size" : {
            "font-size" : 14
        }
    }
}
```

위처럼 **recursive한 타입**만든다면, object안 `font-size`와 그 안의 `font-size`를 한 번에 타입 지정이 가능해 진다

**아무튼 이러한 object index signature 를 사용하면 유연한 타입지정은 가능하지만 업격하게 버그를 잡아주는 기능은 약화될 수 있다**

### 16강
타입을 프로그래밍 스럽게(예를들면 조건식) 만들 수도 있다
또는 **mapping을 사용해서 타입을 한 번에 바꿀 수 있다**

그 전에 keyof를 알아보면

```ts
let obj = {name : 'kim', age : 20}
Object.keys(obj)
// 'name' 'age'
```
이처럼 `keyof`는 obj의 key값만 가져온다

이와 유사한 기능을 ts에서 제공하는데

```ts
interface Person{
    age : number,
    name : string,
}

keyof Person // 이렇게 하면 'age' | 'name' 이 남는다
```

그래서 위를 활용해서 아래와 같이 사용할 수 있다

```ts
interface Person{
    age : number,
    name : string,
}

type PErsonKeys = keyof Person;
let a : personKeys = 'age'// age또는 name
```

이를 활용하면 아래처럼 잘 못된 타입을 지정했을 때
전부 string으로 바꾸려면 mapping을 하라 수 있다

```ts
type Car = {
    color : boolean,
    model : boolean,
    price : boolean | number
}

type TypeChange<MyType> = {
    [key in keyof MyType] : string
    // 오른쪽에 있는 자료들을 다 뽑아서 유니온으로 만들어라, 'color' | 'model' | 'price'
    /// 그래서 왼쪽에 있는 key값이 오른쪽에 있는 유니온 타입에 있으면, string타입으로 바꿔라 가 된다
}

type 새로운타입 = TypeChanger<Car>
// Car의 모든 속성이 타입이 string이 된다
```

## 17강
타입을 조건문으로 부여할 수도 있다

아래는 삼항 연산자를 활용한 타입조건식이다

```ts
type Age<T> = T;
let a:Age<string>
```

이 제네릭 문법을 사용해서 타입 파라미터가 string이면 string을 남기고, 그게 아니면 unknown을 남긴다 할 때

```ts
type Age<T> = T extends string ? string : unknown; 
// 비교할 때는 extends를 활용
let a:Age<string>
let b:Age<boolean>
```

infer 키워드
```ts
type Person<T> = T extends infer R ? string : unknown
// 이는 항상 참이다 
```
infer은 타입을 왼쪽에서 추출하는 역할을 한다

```ts
type 타입추출<T> = T extends (infer R)[] ? R : unknown
// infer로 타입을 추출할 때 왼쪽, 오른쪽을 비교해서 같은 모습으로 만들어 준다
// 그래서 string[] 이 들어오고, (infer R)[] 에 따라서 R은 그냥 string이 들어간다
type a = 타입추출<string[]>
```

즉 string array타입이 들어오면 string이 남는다
이를 조금 더 활요하면

```ts
type 타입추출<T> = T extends (() => infer R) ? R : unknown
type a = 타입추출 <() => void>
// R 은 void가 들어가게 된다
```

하지만 이처럼 **함수의 리턴 타입만 뽑고시다면 `ReturnType` 이라는 기본 함수를 사용하면 된다**

```ts
type b = ReturnType<() => void>
// b = void
```