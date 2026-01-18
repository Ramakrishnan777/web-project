// Load events from JSON file

  let loadEvents=async ()=>{
    const response =await fetch("mainpage.json")
    const events=await response.json();
    displayEvents(events)
  }
  loadEvents();
// Display event cards on the page
function displayEvents(events) {
  const container = document.querySelector(".events");

  // Remove old cards before adding new ones
  container.innerHTML = "";

  events.forEach(event => {
    const card = document.createElement("div");
    card.className = "eventcard";

    // Create card content
    card.innerHTML = `
      <img src="${event.image}" alt="${event.title}">
      <div class="eventcard-body">
        <span class="event-category">${event.category}</span>
        <h3 class="event-name">${event.title}</h3>
        <p class="event-date">📅 ${event.date} · ${event.time}</p>
        <p class="event-location">📍 ${event.location}</p>
        <div class="cardfooter">
          <span class="event-price">${event.price}</span>
          <button class="ticket-btn">Get Ticket</button>
        </div>
      </div>
    `;

    // Add card to page
    container.appendChild(card);
  });
}
