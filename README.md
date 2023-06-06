# Wordle

### Introduction

Wordle is a web-based word game created and developed by Welsh software engineer Josh Wardle. It was bought by the New York Times Company in 2022, who has since maintained and published it.

This project is a spin-off of the original Wordle, with the ability for the user to choose what type of game they want, instead of visiting different types of websites that offer them.

**You may play it yourself [here](https://joelmce.github.io/wordle/ "here")**

### Current gametypes

- Standard
  The gamemode we all know and love.

More to come.

### Challenges

**keypress & keydown events**
To my surprise (and after 30 minutes of smashing my head against the wall), the keypress event is depreciated which was not reflected in VSCode. The main reason why this was an issue for me is because I wanted the user to be able to backspace their input, which by definition, keypress was designed to only print non-modifier keys. Changing to keydown fixed the problem.

```javascript
console.log(keypressEvent.key); // " "
console.log(keydownEvent.key); // "Backspace" "Shift"
```

**Checking submitted word**
It seems the easier solution would be to have a single user input, and then comparing the string that way. However in my approach, I wanted to have it a similar interaction as the original game (primarily to test myself).

_Problem #1:_ I had initially designed the logic to check if the letter was in the generated word as they typed, which would return true or false - which kind of defeated the purpose. It would also mean that I would lose the backspacing functionality and I'd end up looping... a lot. But it was easier, because I had the index always accessible inside the loop.

When I moved away from this approach, I found out why many people struggle on this part.

```javascript
if (grid[currentRow][currentLetter] == word.indexOf(key)) {
  // This is what I was able to achieve doing the simple approach
}
```

But of course, when I want the user to submit their word first, I can't get the position of the grid they're on anymore. So I had to submit the word as a string, and compare it to the generated word. But how? `x.includes(y)` only returns true or false. It doesn't take into consideration if there are **duplicate letters in the word** AND/OR the **position of the letter.**

My solution is to use spreads.

```javascript
let encodedWord = [...word]; // facia -> ['f', 'a', 'c', 'i', 'a']
let encodedSubmittedWord = [...submittedWord];
```

Now I had two iterable arrays, so I then decided to do a `forEach` loop to get the index as shown:

```javascript
// I actually did encodedWord first but it makes more sense to iterate through the users submission rather than the constant word itself
encodedSubmittedWord.forEach((value, index) => {
  if (encodedWord[index] == value) {
    // The character is in the right spot & letter exists in word
  } else if (encodedWord.includes(value)) {
    // The character is in the wrong spot & letter exists in word
  }
});
```

### Optimisations

There is no doubt that this is currently a result of many tests, iterations and revisions, but the one that I have yet to focus on is how to make the code more efficient and clean.
