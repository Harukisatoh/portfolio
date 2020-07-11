// List of sentences
var content = [
    "I'm Gabriel, a 21 yo computer science student.",
    "I'm also a full stack web developer.",
    'And passionate about Javascript frameworks!'
];

var emojis = ['images/emojis/technologist.png', 'images/emojis/sunglasses.png', 'images/emojis/hearteye.png'];

// Current sentence being processed
var part = 0;

// Character number of the current sentence being processed 
var partIndex = 0;

// Holds the handle returned from setInterval
var intervalValue;

// Element that holds the text
var element = document.querySelector('#text');

// Cursor element 
var cursor = document.querySelector('#cursor');

var emoji = document.querySelector('#dynamic-emoji');

// Implements typing effect
function Type() {
    // Get substring with 1 character added
    var text = content[part].substring(0, partIndex + 1);
    element.innerHTML = text;
    partIndex++;

    // If full sentence has been displayed then start to delete the sentence after some time
    if (text === content[part]) {

        // Types the emoji
        emoji.src = emojis[part];
        emoji.style.display = 'inline-block';

        // Hide the cursor
        cursor.style.display = 'none';

        clearInterval(intervalValue);
        setTimeout(function () {
            intervalValue = setInterval(Delete, 100);
        }, 1000);
    }
}

// Implements deleting effect
function Delete() {
    // Hides the emoji
    emoji.style.display = 'none';

    // Get substring with 1 character deleted
    var text = content[part].substring(0, partIndex - 1);
    element.innerHTML = text;
    partIndex--;

    // If sentence has been deleted then start to display the next sentence
    if (text === '') {
        clearInterval(intervalValue);

        // If current sentence was last then display the first one, else move to the next
        if (part == (content.length - 1))
            part = 0;
        else
            part++;

        partIndex = 0;

        // Start to display the next sentence after some time
        setTimeout(function () {
            cursor.style.display = 'inline-block';
            intervalValue = setInterval(Type, 100);
        }, 200);
    }
}

// Start the typing effect on load
intervalValue = setInterval(Type, 60);
