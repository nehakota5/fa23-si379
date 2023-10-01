// Global variables to store the list of events, the current selected event index, and the timeout ID
let eventsList = []; 
let selectedEventIndex = 0; // first event
let timeoutID = null; 

// Function for the click on thumbnail 
function handleThumbnailClick(eventIndex) {
    // Clear the existing timeout if it's set
    if (timeoutID !== null) {
        clearTimeout(timeoutID);
    }

    // Set the selected event index to the clicked thumbnail
    selectedEventIndex = eventIndex;

    // Remove the 'selected' class from all thumbnail images
    const thumbnailImages = document.querySelectorAll('#thumbnails img');
    thumbnailImages.forEach((thumbnail) => {
        thumbnail.classList.remove('selected');
    });

    // Add the 'selected' class to the clicked thumbnail
    thumbnailImages[eventIndex].classList.add('selected');

    // Display the selected event based on the clicked thumbnail
    displayEvent(selectedEventIndex);

    // Set a new timeout to advance to the next image after 10 seconds
    timeoutID = setTimeout(advanceToNextImage, 10000);
}


// Function to display the selected event based on its index
function displayEvent(eventIndex) {
    const selectedEvent = eventsList[eventIndex];

    // Update the HTML elements with the selected event's information
    const selectedImage = document.querySelector('#selected-image');
    const selectedTitle = document.querySelector('#selected-title');
    const selectedDate = document.querySelector('#selected-date');
    const selectedDescription = document.querySelector('#selected-description');

    // Update the selected title with a link to the event
    selectedTitle.textContent = selectedEvent.event_title;
    selectedTitle.href = selectedEvent.permalink;

    // Update the selected image source
    selectedImage.src = selectedEvent.image_url;

    // Add the CSS class for the selected image outline
    selectedImage.classList.add('selected-image-outline');

    // Display the readable start time using getReadableTime function
    selectedDate.textContent = getReadableTime(selectedEvent.datetime_start);

    // Update the selected description
    selectedDescription.textContent = selectedEvent.description;
}

// Function to create the thumbnail images
function createThumbnailImages(eventData) {
    const thumbnailsContainer = document.querySelector('#thumbnails');

    // Iterate through the events and create thumbnail images
    eventData.forEach((event, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = event.styled_images.event_thumb;
        thumbnail.alt = event.title;

        // Add a 'selected' class to the first thumbnail
        if (index === 0) {
            thumbnail.classList.add('selected');
        }

        // Add a click event listener to each thumbnail
        thumbnail.addEventListener('click', () => {
            handleThumbnailClick(index);
        });

        thumbnailsContainer.appendChild(thumbnail);
    });
}

// Function to advance to the next image
// Function to advance to the next image
function advanceToNextImage() {
    // Increment the selected event index and loop back to the first event if it's the last one
    selectedEventIndex = (selectedEventIndex + 1) % eventsList.length;

    // Remove the 'selected' class from all thumbnail images
    const thumbnailImages = document.querySelectorAll('#thumbnails img');
    thumbnailImages.forEach((thumbnail) => {
        thumbnail.classList.remove('selected');
    });

    // Add the 'selected' class to the next thumbnail
    thumbnailImages[selectedEventIndex].classList.add('selected');

    // Display the next selected event
    displayEvent(selectedEventIndex);

    // Set a new timeout to advance to the next image after 10 seconds
    timeoutID = setTimeout(advanceToNextImage, 10000);
}


// Fetch the events with images and create thumbnail images
getUMEventsWithImages((eventData) => {
    eventsList = eventData;

    // Create the thumbnail images
    createThumbnailImages(eventsList);

    // Initialize the carousel with the first event
    displayEvent(0);

    // Set a timeout to automatically advance to the next image after 10 seconds
    timeoutID = setTimeout(advanceToNextImage, 10000);
});


// used chatgpt to assist with the code, especially the function createThumbnailImages(). Mainly used it for explanations of the code.