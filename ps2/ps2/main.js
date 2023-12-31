const WORD_LENGTH = 5; // How long each guess should be
const inputEl = document.querySelector('#guess-inp'); // The input DOM element

// Will store the correct answer once fetched
let correctAnswer = '';

// Before we have a set answer, disable the input field and show a loading message
inputEl.setAttribute('disabled', true);
showInfoMessage('Loading...');

// Get a random answer from the list
getRandomAnswer((answer) => {
    correctAnswer = answer;              // Once we have it, store it, ...
    console.log('Correct Answer:', correctAnswer);
    inputEl.removeAttribute('disabled'); // enable the input field, ...
    clearInfoMessage();                  // clear the loading message, and...
    inputEl.focus();                     // and focus the input field
    // NOTE : If you use Live Preview, the focus line ☝️ can get annoying because
    //       it will keep focusing the input field every time you edit the file.
    //       You can comment it out.
});

// TODO: Fill in your code here


function displayGuessFeedback(guess, correctAnswer) {
    const guessesElement = document.querySelector('#guesses');

    const guessRow = document.createElement('div');
    guessRow.classList.add('guess');

    // iterate
    for (let i = 0; i < guess.length; i++) {
        const letter = guess[i].toUpperCase();
        const correctLetter = correctAnswer[i].toUpperCase();

        // Create a new <span> element
        const letterSpan = document.createElement('span');

        // Set the text content of the <span> element to the current letter
        letterSpan.textContent = letter;

        // Add the 'letter' class to the <span> element
        letterSpan.classList.add('letter');

        if (letter === correctLetter) {
            // This letter is in the correct position
            letterSpan.classList.add('correct');
        } else if (correctAnswer.toUpperCase().includes(letter)) {
            // This letter is in the correct answer but in the wrong position
            letterSpan.classList.add('present');
        } else {
            // This letter is completely incorrect
            letterSpan.classList.add('absent');
        }

        guessRow.appendChild(letterSpan);
    }


    guessesElement.appendChild(guessRow);

}

inputEl.addEventListener('keydown', function(event) {
    // Check if the pressed key is 'Enter'
    if (event.key === 'Enter') {
        const guess = inputEl.value;

        //  Not empty
        if (guess.trim() !== '') {
            if (guess.length === WORD_LENGTH) {
                if (guess == correctAnswer){
                    showInfoMessage(`You win! The correct answer was ${correctAnswer}.`);
                    inputEl.setAttribute('disabled', true);
                    inputEl.value = '';


                } else {
                    inputEl.value = '';
                    isValidWord(guess, (realword) => {
                        if (realword) {
                            displayGuessFeedback(guess, correctAnswer);
                        } else {
                            // The guess is not a valid word
                            showInfoMessage(`${guess} is not a valid word. Try again.`);
                        }
                    });
        
                }
            } else {
                showInfoMessage(`Your guess must be ${WORD_LENGTH} letters long.`);
                inputEl.value = '';

                }
                    inputEl.value = '';
                    
            }
            inputEl.value = '';

        } else {
            clearInfoMessage()
        }


        
    }
);

displayGuessFeedback('hello')


// used chatgpt for assistance with both parts, but mostly for explanations & syntax help





// Step 1: Define a function displayGuessFeedback(guess) that takes a guess and displays it on the page.
// It should accept one argument (guess, a string) and will display feedback for that guess on the page.
// Steps:
// 1. Create a new <div> element with class 'guess'
// 2. For each letter in the guess, create a new <span> element with class 'letter'
//         HINT: You can use the following code to iterate over each letter of the guess and each correct letter:
//         for(let i = 0; i<guess.length; i++) {
//             const letter = guess[i].toUpperCase();
//             const correctLetter = correctAnswer[i].toUpperCase();
//             if(letter === correctLetter) {
//                  ...
//             } else if(correctAnswer.toUpperCase().includes(letter)) {
//                  ...
//             } else {
//                  ...
//             }
//         ...
//
//      2.a. If the letter is in the correct position, add the (additional) class 'correct' to the <span> element
//      2.b. If the letter is in the answer but not in the correct position, add the (additional) class 'present' to the <span> element
//      2.c. If the letter is not in the answer, add the (additional) class 'absent' to the <span> element
//      2.d. Set the text content of the <span> element to the letter
//      2.e. Append the <span> element to the guess's <div> element
// 3. Append the guess's <div> element to the existing <div> with ID 'guesses'
// 4. Try it out by calling displayGuessFeedback('hello') and displayGuessFeedback('world')
// 





// Step 2: Add an event listener to the input element that listens for the 'keydown' event.
// 1. When the user presses the 'Enter' key, the event listener should:
//     1.a. Get the value of the input element (which is the guess)
//     1.b. If the guess is not the correct length (WORD_LENGTH), use showInfoMessage to display: "Your guess must be {WORD_LENGTH} letters long." (where {WORD_LENGTH} is the value of WORD_LENGTH)
//     1.c. If the guess is the correct answer, use showInfoMessage to display: "You win! The answer was "{correctAnswer}". (where {correctAnswer} is the value of correctAnswer)
//          1.c.i. If the guess is correct, also disable the input element so the user can't enter any more guesses (the game is over)
//     1.d. If the guess is not the correct answer, then:...
//          1.d.i. Clear the input element's value
//          1.d.ii. Check if the guess is a valid word (using the isValidWord function)
//              1.d.ii.A If the guess is a valid word, display feedback for the guess (using the displayGuessFeedback function from Step 1)
//              1.d.ii.B If the guess is not a valid word, show an error message: "{guess} is not a valid word." (where {guess} is the value of the guess)
// 2. When the user presses key other than 'Enter', clear the info message (using the clearInfoMessage function)