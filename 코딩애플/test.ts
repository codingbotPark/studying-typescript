type FirstrItem<T> = T extends [] ? [0] : any
let a:FirstrItem<String> = 1
console.log(typeof(a))
let b:FirstrItem<String> = [1,2,3]
console.log(typeof(b))