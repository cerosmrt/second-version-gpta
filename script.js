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

document.getElementById('entry').addEventListener('keydown', function(e) {
    if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (currentIndex !== previousLines.length - 1) {
            previousLines = [];
            currentIndex = -1;
        }
        fetchNewLine();
    } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        if (currentIndex > 0) {
            currentIndex--;
            this.innerHTML = previousLines[currentIndex];
            isInputting = false;
        }
    } else if (e.key === 'Enter') {
        e.preventDefault();
        if (justFetched) {
            return;
        }
        const currentLine = this.innerText.trim();
        if (currentLine === '' || previousLines.includes(currentLine)) {
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
        this.innerText = '';
        isInputting = false;
        fetchNewLine();
    } else if (!e.ctrlKey && !e.altKey && !e.metaKey && e.key.length === 1) {
        if (!isInputting) {
            this.innerText = '';
            isInputting = true;
        }
        justFetched = false;
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
            const file = files[Math.floor(Math.random() * files.length)];
            fetch(`readfile.php?file=${encodeURIComponent(file)}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                })
                .then(line => {
                    line = formatString(line);
                    document.getElementById('entry').innerHTML = line;
                    previousLines.push(line);
                    currentIndex++;
                    isInputting = false;
                    justFetched = true;
                })
                .catch(e => {
                    console.log('There was a problem with the fetch operation: ' + e.message);
                });
        })
        .catch(e => {
            console.log('There was a problem with the fetch operation: ' + e.message);
        });
}

window.onload = function() {
    const entry = document.getElementById('entry');
    entry.focus();
}