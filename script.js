document.getElementById('entry').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        e.preventDefault();

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
                        this.value = line;
                    })
                    .catch(e => {
                        console.log('There was a problem with the fetch operation: ' + e.message);
                    });
            })
            .catch(e => {
                console.log('There was a problem with the fetch operation: ' + e.message);
            });
    }
});