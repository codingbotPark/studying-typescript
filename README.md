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

