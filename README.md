 1️⃣ What is the difference between var, let, and const?
 2️⃣ What is the spread operator (...)?
 3️⃣ What is the difference between map(), filter(), and forEach()?
 4️⃣ What is an arrow function?
 5️⃣ What are template literals?


 Answer:

 1.What is the difference between var, let, and const?
 
  here:
     var,let,and const is  variable where,some characteristics of 
     var:

     *Can be re-declared
     *Can be re-assigned
     *Not block scoped

     Example:

     var x=10;
     var x=20; its allowed
     x=30; its allowed

     but it has a problem, var ignore block scope

     code:

      if(true){

         var a=5;
      }
   
   console.log(a);// its accessible



   Again:(let-variable)

   The characteristics of let variable:

   *Can be re-assigned
   *Cannot be re-declared in same scope
   *Block scoped


   Example:

   code:

   let x=10;
   x=20; its allowed
   let x=30; its not allowed

   Block scope:

   if(true){

       let a=5;
   } 

   console.log(a); its not possible ,and see error  



   Again(const variable):

   The characteristics of const variable:

   const variable indicate: fixed value

   *Block scoped
   *Cannot be re-declared
   *Cannot be re-assigned
   *Must be initialized when declared

   Example:

   code:

    const x=10;
    x=20; its not possible showing error

    const arr=[1,2];
    arr.push(3); its allowed

    so,we can say that,const value is always fixed ,dont reassign but you can push








    2.What is the spread(...) operator?

    ans:

    The spread operator (...) expands an iterable (like an array or object) into its individual elements. It is primarily used to copy, merge, or pass data into functions without mutating the original source.

    Example:

  ex:1

    const list1 = [1, 2];
    const list2 = [...list1, 3, 4];//Result: [1, 2, 3, 4]



    ex:2

    const person = { name: "Abir", age: 25 };
    const updatedPerson = { ...person, city: "Dhaka" }; // Result: { name: "Abir", age: 25, city: "Dhaka" }






3.What is the difference between map(), filter(), and forEach()?


Ans:

map():

   *Return a new array of the same length
   *Original array is unchanged
   *Transforming every item


   ex:
    const numbers = [1, 2, 3];
    const doubled = numbers.map(num => num * 2); 
    // doubled: [2, 4, 6]




filter():

    *Return a new array(equal or shorter length).
    *Original array is unchanged
    *Selecting specific items based on a condition.

   
   ex:

     const ages = [15, 22, 18, 30];
     const adults = ages.filter(age => age >= 18); 
     // adults: [22, 18, 30]





forEach():


    *Return undefined
    *Can be changed
    *Executing "side effects"


    ex:

     const names = ['Alice', 'Bob'];
     names.forEach(name => console.log(`Hello, ${name}!`));
     // Output: Hello, Alice! Hello, Bob!






     4.What is an arrow function?

     Ans:An arrow function is a shorter syntax for writing functions in JavaScript using the => operator instead of the function keyword. Unlike regular functions, they do not have their own this context, making them ideal for callbacks and cleaner code.


     Ex:

     // Regular Function
     const multiply = function(a, b) { return a * b; };

     // Arrow Function (Shorter, cleaner, and uses =>)
      const multiply = (a, b) => a * b;









 5️⃣ What are template literals?

  Ans:Template literals are a modern way to create strings in JavaScript using backticks (``) instead of single or double quotes. They allow you to easily embed variables and expressions directly into a string using the ${} syntax.


  Ex:


   const name = "Abir";
   console.log(`Hello, ${name}!`); // Output: Hello, Abir!

  

