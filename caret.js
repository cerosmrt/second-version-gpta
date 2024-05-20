export default function centerCaret() {
    const targetElement = document.getElementById('entry'); // Replace 'entry' with the id of your target element
    const cursorElement = document.createElement('div');
    cursorElement.classList.add('blinking-cursor');

    targetElement.appendChild(cursorElement);

    // Position the cursor in the center of the target element
    cursorElement.style.position = 'absolute';
    cursorElement.style.top = '50%';
    cursorElement.style.left = '50%';
    cursorElement.style.transform = 'translate(-50%, -50%)';
}