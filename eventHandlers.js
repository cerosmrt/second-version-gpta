import { fetchNewLine } from './fetching.js';

let previousLines = [];
let currentIndex = -1;
let isInputting = false;
let justFetched = false;

document.addEventListener('keydown', async function(e) {
    const entry = document.getElementById('entry');
    if (e.key === 'Tab') {
        e.preventDefault(); // Prevent the default action (switching to the next focusable element)
        entry.focus(); // Set the focus to the input field
        isInputting = true; // User is now inputting text
    } else if (e.key === 'ArrowDown' && !isInputting) {
        e.preventDefault();
        if (currentIndex === previousLines.length - 1) {
            await fetchNewLine(previousLines, currentIndex);
            currentIndex++;
            entry.innerHTML = previousLines[currentIndex];
        } else if (currentIndex < previousLines.length - 1) {
            currentIndex++;
            entry.innerHTML = previousLines[currentIndex];
        }
        console.log(currentIndex); // Log currentIndex
    } else if (e.key === 'ArrowUp' && !isInputting) {
        e.preventDefault();
        if (currentIndex > 0) {
            currentIndex--;
            entry.innerHTML = previousLines[currentIndex];
        }
        console.log(currentIndex); // Log currentIndex
    } else if (e.key === 'Enter' && document.activeElement === entry) {
        e.preventDefault();
        const currentLine = entry.innerText.trim();
        if (currentLine === '') {
            return;
        }
        previousLines.unshift(currentLine);
        currentIndex = 0;
        fetch(`savefile.php?file=void/0.txt&line=${encodeURIComponent(currentLine)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
            })
            .catch(e => {
                console.log('There was a problem with the fetch operation: ' + e.message);
            });
        entry.innerText = '';
        isInputting = false; // User has finished inputting text
    } else if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1 && document.activeElement === entry) {
        justFetched = false;
    }
});