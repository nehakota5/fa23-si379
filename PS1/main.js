let score = 0;
let interval = null; // Initialize interval as null

// Write code that *every second*, picks a random unwhacked hole (use getRandomUnwhackedHoleId)
// and adds the "needs-whack" class
interval = setInterval(() => {
    const randomHoleId = getRandomUnwhackedHoleId();
    if (randomHoleId !== null) {
        const randomHole = document.getElementById(randomHoleId);
        randomHole.classList.add('needs-whack');
    } else {
        clearInterval(interval); // Clear the interval if there are no more unwhacked holes
    }
    console.log('TODO: Add the "needs-whack" class to a random hole');
}, 1000);

for(const id of getAllHoleIds()) {
    const element = document.querySelector(`#${id}`);

    if (element) {
        element.addEventListener("click", function() {
            if (element.classList.contains("needs-whack")) {
                // Remove "needs-whack" class and adds animating whack
                element.classList.remove("needs-whack");
                element.classList.add("animating-whack");
                setTimeout(function() {
                    element.classList.remove("animating-whack");
                }, 500);

                // Add 1 to the score only if the element has "needs-whack" class
                score++;
                const scoreElement = document.getElementById("score");
                scoreElement.textContent = `Score: ${score}`;
            }

            // Clear the interval when the score reaches 45 or higher
            if (score >= 45) {
                clearInterval(interval);
            }
            
            // Your click event handling code here
        });
    }
}



/**
 * @returns a random ID of a hole that is "idle" (doesn't currently contain a mole/buckeye). If there are none, returns null
 */
function getRandomUnwhackedHoleId() {
    const inactiveHoles = document.querySelectorAll('.hole:not(.needs-whack)');  // Selects elements that have class "hole" but **not** "needs-whack"

    if(inactiveHoles.length === 0) {
        return null;
    } else {
        const randomIndex = Math.floor(Math.random() * inactiveHoles.length);
        return inactiveHoles[randomIndex].getAttribute('id');
    }
}

/**
 * @returns a list of IDs (as strings) for each hole DOM element
 */
function getAllHoleIds() {
    const allHoles = document.querySelectorAll('.hole'); 
    const ids = [];
    for(const hole of allHoles) {
        ids.push(hole.getAttribute('id'));
    }
    return ids;
}


// USE OF CHATGPT: used it primarily to help with the second function, as well as for explanations about action (especially for the event listeners)