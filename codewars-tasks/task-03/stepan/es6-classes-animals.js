//https://www.codewars.com/kata/fun-with-es6-classes-number-2-animals-and-inheritance/train/javascript

class Shark extends Animal {
    constructor(name, age, status) {
      super(name, age, 0, "shark", status);
    }
  }
  
  class Cat extends Animal {
    constructor(name, age, status) {
      super(name, age, 4, "cat", status);
    }
  
    introduce() {
      return `${super.introduce()}  Meow meow!`;
    }
  }
  
  class Dog extends Animal {
    constructor(name,age,status,master){
      super(name,age,4,"dog",status);
      this.master=master;
      
    }
    introduce() {
      return `Hello, my name is ${this.name} and I am ${this.age} years old.`;
    }
  
    greetMaster() {
      return `Hello ${this.master}`;
    }
  }