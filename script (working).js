// let previousLines = [];
// let currentIndex = -1;

// document.getElementById('entry').addEventListener('keydown', function(e) {
//     if (e.key === 'ArrowDown') {
//         e.preventDefault();

//         // If currentIndex is not at the end of the array, clear the array and reset currentIndex
//         if (currentIndex !== previousLines.length - 1) {
//             previousLines = [];
//             currentIndex = -1;
//         }

//         fetch('/files.php')
//             .then(response => {
//                 if (!response.ok) {
//                     throw new Error(`HTTP error! status: ${response.status}`);
//                 }
//                 return response.json();
//             })
//             .then(files => {
//                 console.log('Received files:', files);
//                 const file = files[Math.floor(Math.random() * files.length)];

//                 fetch(`readfile.php?file=${encodeURIComponent(file)}`)
//                     .then(response => {
//                         if (!response.ok) {
//                             throw new Error(`HTTP error! status: ${response.status}`);
//                         }
//                         return response.text();
//                     })
//                     .then(line => {
//                         console.log('Received line:', line);
//                         this.value = line;
//                         previousLines.push(line);
//                         currentIndex++;
//                     })
//                     .catch(e => {
//                         console.log('There was a problem with the fetch operation: ' + e.message);
//                     });
//             })
//             .catch(e => {
//                 console.log('There was a problem with the fetch operation: ' + e.message);
//             });
//     } else if (e.key === 'ArrowUp') {
//         e.preventDefault();
//         if (currentIndex > 0) {
//             currentIndex--;
//             this.value = previousLines[currentIndex];
//         }
//     }
// });