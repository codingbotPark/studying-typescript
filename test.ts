// interface LengthCheck {
//     length : number
// }

// function 함수<MyType extends LengthCheck>(x : MyType){
//     return x.length
// }
// let a =  함수<string[]>(['100'])
// console.log

interface LengthCheck {
    length:number
}

function 함수<MyType extends LengthCheck>(x : MyType){
    return x.length
}
let a = 함수<string>("hello")
console.log(a)
let b = 함수<string[]>(["hello","hi"])
console.log(b)

// function 함수2<MyType extends string | string[]>(x: MyType)  { 
//     console.log(x.length)   
// } 

// 함수2<string>('hello');
// 함수2<string[]>(['kim','park'])

// 왜 내가한거, 코딩애플이 한거 둘 다 되는가
// 내 코드에서 lengthCheck를 없애고 number를 넣어도 되는 이유는