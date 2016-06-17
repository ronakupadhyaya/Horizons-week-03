
# O notation Test

Constant O(1)
linear O(n)
Squared O(n2)

# Part 1: Simple Questions

**Arrays**
Search Array: Linear
Insert In array: Linear
Prepending: Linear
Shifting: Constant

**HashTable**
Search: Constant
Insert: Constant

## Part 2: Simple Code Exercises

1. Exercise 1 -> O(1)
Variable assignment
``` javascript
	a+=1;
```

1. Exercise 1 -> O(n)
Looping through an array
``` javascript
for(c=0; c<n; c++){
  a+=1;
}
```

1. Exercise 1 ->O(n^2)
Double loop
``` javascript
for(c=0; c<n; c++){
  for(i=0; i<n; i++){
    a+=1;
  }
}
```

# Part 3: Searches, Insertions and Loops


// Set up a simple array of colours
var colours = new Array ("Black", "Blue", "Brown", "Green", "Pink", "Red", "White", "Yellow");
// Set up numbers from 1 to 5000
var numbersFull = new Array();
for (var i = 1; i < 5000; i++) {
  numbersFull.push(i);
};

1. Exercise 1 -> O(1)
Find the first item in an array
``` javascript
function FindFirstItem(items) {
     return items[0];
}
```

1. Exercise 1 ->  O(n)
Finding the last element in the array
``` javascript
findItem(numbersFull, 5000);

function findItem(items, match) {
     for (var i=0; i < items.length; i++) {
          if (items[i] == match) {
               return true;
          }
     }
     return false;
}
```

Exercise 1 -> O(n)
``` javascript
function printAllItems(arrayOfItems) {
  for (var item in arrayOfItems) {
      System.out.println(item);
  }
}
```

Exercise 1 ->  O(n^2)
quadratic time
``` javascript
function printAllPossibleOrderedPairs(arrayOfItems) {
  for (var firstItem in arrayOfItems) {
      for (var secondItem in arrayOfItems) {
          var orderedPair = [firstItem, secondItem];
          console.log(orderedPair);
      }
  }
}
```

Exercise 1 -> O(n)
``` javascript
function sayHelloNTimes(times) {
    for (int x = 0; x < times; x++) {
        console.log("hi");
    }
}
```
Exercise 1 ->  O(n)
``` javascript
function printAllItemsInArray(theArray) {
    for (var item in theArray) {
        System.out.println(item);
    }
}
```

Exercise 1 -> O(n^2)
``` javascript
containsDuplicates(elements){
    for (var outer = 0; outer < elements.length; outer++){
        for (var inner = 0; inner < elements.length; inner++){
            // Don't compare with self
            if (outer == inner) continue;
            if (elements[outer] == elements[inner]) return true;
        }
    }
    return false;
}
```


1. Exercise 1 -> O(n+n^2), which we just call O(n^2)
Careful with this one
``` javascript
public void printAllNumbersThenAllPairSums(int[] arrayOfNumbers) {
    console.log("these are the numbers:");
    for (var number in arrayOfNumbers) {
        console.log(number);
    }
    console.log("and these are their sums:");
    for (int firstNumber in arrayOfNumbers) {
        for (int secondNumber : arrayOfNumbers) {
            console.log(firstNumber + secondNumber);
        }
    }
}
```
