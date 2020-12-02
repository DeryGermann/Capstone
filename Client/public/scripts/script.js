let puzzles = document.getElementById('account-puzzles');

// Assign click events to each puzzle object
puzzles.children.forEach(puzzle => {
    puzzle.onclick = handleClick;
});