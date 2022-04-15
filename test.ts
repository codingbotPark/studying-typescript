class Person1<T> {
    name;
    constructor(a:T){
      this.name = a;
    }
  }
  let a1 = new Person1<String>('어쩌구');
  a1.name //any 타입이 되었넹 
  console.log(a1.name,typeof(a1.name))