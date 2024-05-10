let previousLines = [];
let currentIndex = -1;
let isInputting = false;
let justFetched = false; // New variable

function formatString(str) {
    return str.split('.').map(line => {
        line = line.trim();
        if (line.length > 0) {
            line = line[0].toLowerCase() + line.slice(1);
            // Remove trailing punctuation and spaces
            while (line.length > 0 && (line[line.length - 1] === ',' || line[line.length - 1] === '.' || line[line.length - 1] === ';' || line[line.length - 1] === ' ')) {
                line = line.slice(0, -1);
            }
        }
        return line;
    }).filter(line => line.length > 0);
}

document.getElementById('entry').addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown') {
        e.preventDefault();

        // If currentIndex is not at the end of the array, clear the array and reset currentIndex
        if (currentIndex !== previousLines.length - 1) {
            previousLines = [];
            currentIndex = -1;
        }

        fetchNewLine();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentIndex > 0) {
            currentIndex--;
            this.value = previousLines[currentIndex];
            isInputting = false;
        }
    } else if (e.key === 'Enter') {
        e.preventDefault();

        if (justFetched) {
            // Prevent the user from submitting a line that was just fetched
            return;
        }

        const currentLine = this.value.trim();
        if (currentLine === '' || previousLines.includes(currentLine)) {
            // Do not allow blank input or input of any fetched line
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

        // Clear the entry
        this.value = '';
        isInputting = false;

        // Fetch a new line
        fetchNewLine();
    } else if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1) {
        // Start inputting when the user starts typing a character, unless they're pressing a control key
        if (!isInputting) {
            this.value = '';
            isInputting = true;
        }
        justFetched = false; // The user started typing, so set justFetched to false
    }
});

function fetchNewLine() {
    fetch('/files.php')
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            return response.json();
        })
        .then(files => {
            console.log('Received files:', files);
            const file = files[Math.floor(Math.random() * files.length)];

            fetch(`readfile.php?file=${encodeURIComponent(file)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(line => {
                    console.log('Received line:', line);
                    line = formatString(line);
                    document.getElementById('entry').value = line;
                    previousLines.push(line);
                    currentIndex++;
                    isInputting = false;
                    justFetched = true; // A new line was just fetched, so set justFetched to true
                })
                .catch(e => {
                    console.log('There was a problem with the fetch operation: ' + e.message);
                });
        })
        .catch(e => {
            console.log('There was a problem with the fetch operation: ' + e.message);
        });
}