// Create twinkling stars
function createStars() {
    const starsCount = 100;
    const container = document.body;
    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(star);
    }
}

// Initialize stars
createStars();

// Handle form submission
document.getElementById('story-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const badTimes = document.getElementById('bad-times').value;
    const overcoming = document.getElementById('overcoming').value;

    addStory(title, badTimes, overcoming);

    // Clear form
    this.reset();
});


function addStory(title, badTimes, overcoming) {
    const storiesList = document.getElementById('stories-list');
    const storyBox = document.createElement('div');
    storyBox.className = 'story-box';
    storyBox.innerHTML = `
        <div class="story-title">${title}</div>
        <div class="bad-times">${badTimes}</div>
        <div class="overcoming">${overcoming}</div>
    `;
    storiesList.prepend(storyBox);

    fetch('http://localhost:5002/api/stories', { // Ensure the URL is correct
        method: 'POST',
        headers: {
            'Content-Type': 'application/json', // Set content type
        },
        body: JSON.stringify({ title, badTimes, overcoming }), // Convert to JSON
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Story saved:', data);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}





// Add some initial stories
addStory(
    "Rising from the Ashes",
    "I lost everything in a house fire, including precious memories and my sense of security.",
    "Through the support of my community and inner strength I didn't know I had, I rebuilt not just my home, but a stronger version of myself."
);
addStory(
    "Conquering the Mountain of Debt",
    "Drowning in student loans and credit card debt, I felt hopeless and trapped.",
    "By creating a strict budget, finding additional income streams, and staying committed, I paid off all my debt in 3 years and now help others do the same."
);
