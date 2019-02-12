# Dear Trivia

A trivia game utilizing new skills learned with setInterval(), clearInterval(), and setTimeout().

### Link to Game

https://dpadillajs.github.io/DearTrivia/

**Browser compatibility checked with:**

- Google Chrome - Version 70.0.3538.77 and up
- Firefox Developer Edition - 64.0b8 (64-bit) and up
- Safari - Version 12.0.1 and up

### Assignment

I was tasked with having to make a trivia game with time-sensitive constraints while
the player decides the correct answer to each question. My last couple of games have
been geared towards my own interests and such, so for this next project I immediately
decided to take my own wants out of the equation and design it with a softer look
and theme in mind. Questions around romantic-comedy films is what I ultimately decided
to do. Logic-wise, I pushed myself harder than any other project before by having
each question, choice option, notification, and result come from elements made in
JavaScript using jQuery's library. Aside from the header, footer, and overall
design template, everything in the DOM was created behind the scenes. I had to keep
track of answers that were correct, wrong, and unanswered. I also felt very comfortable
with object oriented programming this time around as I did not need nor seek assistance.

### Skills Learned

I learned many things while doing this project with the support of my wife
who is also a very talented programmer and Stack Overflow. Here are some things
I learned on the fly:

- method chaining
- function hoisting
- fadeOut()
- .show()
- .hide()
- .empty()
- .mouseenter()
- .mouseleave()

**Also, feel free to refer to the comments within game.js to see how I integrated:**

- setTimeout()
- setInterval()
- clearInterval()

### Comments

I think my favorite part about this project was how clean my code was. I really strived to
make the **app.js** read like simple english and avoid DRY Programming. I grouped instructions
into functions even though I may have not needed to call that function more than once simply
because it added a level of organization that made it easy to read than just endless lines of
code. Also, I'm quite proud of how I managed to pass in just one _newGame_ variable as the
parameter in a function that was constantly called with a new value everytime. Each time
_newGame_ was passed in, it referenced a different section in the main array of objects.
I had many functions bounce off one another like a pinball machine and it was glorious to
watch using Chrome's DevTools.

_created by David M. Padilla_
