// Event class to handle event data and countdown logic remains the same

class Event {
    constructor(name, date, description) {
        this.name = name;
        this.date = date;
        this.description = description;
    }
}

// Load events from Local Storage and display them, now including delete buttons
function loadEvents() {
    const events = JSON.parse(localStorage.getItem('events')) || [];
    const container = document.getElementById('events-container');
    container.innerHTML = ''; // Clear existing events display

    events.forEach((event, index) => {
        const eventElement = document.createElement('div');
        eventElement.classList.add('event');
        const date = new Date(event.date);
        const now = new Date();
        const difference = date - now;
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        eventElement.innerHTML = `<h2>${event.name}</h2>
                                  <p>${event.description}</p>
                                  <p>Time left: ${days}d ${hours}h ${minutes}m ${seconds}s</p>
                                  <button class="delete-btn" onclick="deleteEvent(${index})">Delete</button>`;
        container.appendChild(eventElement);
    });

    // Refresh the display every second for the countdown
    setTimeout(loadEvents, 1000);
}

// Function to delete an event
function deleteEvent(index) {
    let events = JSON.parse(localStorage.getItem('events')) || [];
    events.splice(index, 1); // Remove the event at the specified index
    localStorage.setItem('events', JSON.stringify(events)); // Update Local Storage
    loadEvents(); // Refresh the event list display
}

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('event-form');
    if(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('event-name').value;
            const date = document.getElementById('event-date').value;
            const description = document.getElementById('event-description').value;
            const event = new Event(name, date, description);

            // Store the new event in Local Storage
            const events = JSON.parse(localStorage.getItem('events')) || [];
            events.push(event);
            localStorage.setItem('events', JSON.stringify(events));

            alert('Event added successfully!');
            window.location.href = 'index.html'; // Redirect to the home page
        });
    } else {
        loadEvents(); // If not on the event creation page, load events
    }
});
