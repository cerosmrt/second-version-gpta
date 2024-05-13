let previousLines = [];
let currentIndex = -1;
let isInputting = false;
let justFetched = false;

function formatString(str) {
    return str.replace(/[.,]/g, '<br>')
        .split('<br>')
        .map(line => {
            line = line.trim();
            if (line.length > 0) {
                line = line[0].toLowerCase() + line.slice(1);
                while (line.length > 0 && (line[line.length - 1] === ';' || line[line.length - 1] === ' ')) {
                    line = line.slice(0, -1);
                }
            }
            return line;
        }).filter(line => line.length > 0)
        .join('<br>');
}

document.addEventListener('keydown', function(e) {
    const entry = document.getElementById('entry');
    if (e.key === 'Tab') {
        e.preventDefault(); // Prevent the default action (switching to the next focusable element)
        entry.focus(); // Set the focus to the input field
        isInputting = true; // User is now inputting text
    } else if (e.key === 'ArrowDown' && !isInputting) {
        e.preventDefault();
        if (currentIndex === previousLines.length - 1) {
            fetchNewLine();
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
        fetchNewLine();
    } else if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1 && document.activeElement === entry) {
        justFetched = false;
    }
});

function fetchNewLine() {
    fetch('getRandomLine.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.text();
        })
        .then(line => {
            line = formatString(line);
            const entry = document.getElementById('entry');
            entry.innerHTML = line;
            previousLines.push(line); // Add the new line at the end of previousLines
            currentIndex++; // Increment currentIndex
            isInputting = false;
            justFetched = true;
            entry.blur(); // Remove focus from the input field
        })
        .catch(e => {
            console.log('There was a problem with the fetch operation: ' + e.message);
        });
}

window.onload = function() {
    // No need to add anything here as we've already handled the 'Tab' key in the document's 'keydown' event listener
};