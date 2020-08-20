### Overview: KickUp Coding Challenge

Hello and welcome to the KickUp Coding Challenge.  We're glad you were willing to take some time and complete this challenge, as it will help us to understand your skills in a fair and objective way!

The Challenge consists of a brief exercise in which we'll ask you to write a JavaScript function that completes a specific task. We've written some unit tests, so you'll know that your code is working when the tests pass!

The exercise involves making a function that updates an immutable data structure (the code for this is in `update.js` and `test.js`).

To submit the exercise, we'd like you to download a zip of this gist, add in your changes, and then zip it back up and email it to us. We've tuned this exercise to ensure it should take 1-2 hours. You should be done when the tests pass, but if at the end of that time you don't have every test passing, please submit what you have! We'll be looking at solutions for cleanliness and robustness in addition to the test results; having a failing test or two isn't necessarily a disqualifier if the solution is otherwise well-factored and easy to understand.

Thanks again, and best of luck!
 
##### Running the tests

You'll need to have a somewhat recent version of node install on your machine; at least version 6.9.x or higher.  

Once you have downloaded and unzipped the gist, you can change to the unzip directory and just run:

```
# to install all dependencies:
npm install

# to run the test:
npm run test
```

### Exercise: Implementing "Immutability Helper's" Update Function

In this exercise, we'll be creating our own implementation of the `update` function in [Facebook's Immutability Helpers API](https://facebook.github.io/react/docs/update.html).

This library is a stand-alone utility intended to provide developers with an easier way to update immutable objects in JavaScript.  You see, in JavaScript, it is really easy to make deep updates to nested objects:

```
var theObject = {
    a: {
        b: {
            c: "Original Text"
        }
    }
}

console.log(`Original text is: ${a.b.c}`);

theObject.a.b.c = "New Text"

console.log(`New text is: ${a.b.c}`);

```

However, this changes the object you already have.  Sometimes, you don't want to change the original object, but instead create a new one that's based on the original, and also incorporates some changes.  JavaScript makes this tedious:

```
var originalObject = {
    a: {
        b: {
            c: "Original Text"
        }
    }
}

console.log(`Original text is: ${originalObject.a.b.c}`);

var updatedObject = extend(originalObject, {
  a: extend(originalObject.a, {
    b: extend(originalObject.a.b, {c: "New Text"}),
  }),
})

console.log(`New text is: ${updatedObject.a.b.c}`);

```

What would be nice is a syntax that would allows us to make these updates in a succinct way, while also being as memory efficient as possible.

Facebook's Immutability Help's defines such a syntax, which is executable through its `update` function.   Here's an example:

```
var originalObject = {
    a: {
        b: {
            c: "Original Text"
        }
    }
}

console.log(`Original text is: ${originalObject.a.b.c}`);

var updatedObject = update(originalObject, {
  a: {b: {c: {$set: "New Text"}}}
});

console.log(`New text is: ${updatedObject.a.b.c}`);
```

That's much more concise!

To explain what's going on here, the `$set` you see above is a "command" which tells the `update` function to create a new object based on `originalObject`, but with a different value at `a.b.c.`.  The API of Immutability Helpers defines 6 commands which you can send to the `update` function: `$push`, `$unshift`, `$splice`, `$set`, `$merge`, and `$apply`.  `update` never modifies the object that you pass to it, and allocates as few new objects as possible.  (You can find them all six of the commends documented [here](https://reactjs.org/docs/update.html#available-commands))

For this exercise, we're asking you to make an implementation of `update` which can handle all of these commands, and allocates as few new objects as possible without modifying the original object that is passed in as a parameter.

To help you, we've supplied unit tests in the file `test.js` which should help you understand whether the function is behaving as expected.  You'll know that the exercise is complete when you've implemented all of the commands and the tests pass!

We recommend that you start by reading Facebook's documentation on it's Immutability Helpers, which you can find [here](https://reactjs.org/docs/update.html).

(And one final note: while Immutability Helpers does ship with Facebook's React framework, the `update` function does not use or depend on React in anyway, and experience with React is not necessary to complete this exercise.)