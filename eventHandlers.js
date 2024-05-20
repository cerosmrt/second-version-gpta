import { fetchNewLine } from './fetching.js';
import centerCaret from './caret.js';

let previousLines = [];
let currentIndex = -1;
let isInputting = false;
let justFetched = false;

document.addEventListener('keydown', async function(e) {
    const entry = document.getElementById('entry');
    if (e.key === 'Tab') {
        e.preventDefault();
        entry.focus();
        isInputting = true;
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
        console.log(currentIndex);
    } else if (e.key === 'ArrowUp' && !isInputting) {
        e.preventDefault();
        if (currentIndex > 0) {
            currentIndex--;
            entry.innerHTML = previousLines[currentIndex];
        }
        console.log(currentIndex);
    } else if (e.key === 'Enter' && document.activeElement === entry) {
        e.preventDefault();
        const currentLine = entry.innerText.trim();
        if (currentLine === '') {
            return;
        }
        previousLines.push(currentLine); // Add the new line to the end of the array
        currentIndex = previousLines.length - 1; // Set currentIndex to the index of the new line
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
        isInputting = false;

        // Call the centerCaret function after a new line is entered
        centerCaret();
    } else if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1 && document.activeElement === entry) {
        justFetched = false;
    } else if (e.key === 'Backspace' && document.activeElement === entry) {
        e.preventDefault();
        const selection = window.getSelection();
        const selectedText = selection.toString();
        if (selectedText.length > 0) {
            // If text is selected, delete the selected text and send it to -1.txt
            document.execCommand('delete');
            fetch(`savefile.php?file=-1.txt&line=${encodeURIComponent(selectedText)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                })
                .catch(e => {
                    console.log('There was a problem with the fetch operation: ' + e.message);
                });
        } else {
            // If no text is selected, delete the last character
            entry.innerText = entry.innerText.slice(0, -1);
        }
    }
});