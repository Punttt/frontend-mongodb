const apiUrl = "http://localhost:3000/api/workexperience";
import '../styles/main.scss';

async function loadData() {
    try{
        const res = await fetch(apiUrl);
        const data = await res.json();

        // Hämtar list-elementet och nollar innehåll
        const container = document.getElementById("list");
        container.innerHTML = "";

        // Loopar igenom innehåll.
        data.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("item");

            div.innerHTML = `
                <h3>${item.companyname}</h3>
                <p class="title">${item.jobtitle} - ${item.location}</p>
                <span class="date">${formatDate(item.startdate)} - ${formatDate(item.enddate)}</span>
                <span class="description">${item.description}</span>
                <button class="delete-btn" data-id="${item._id}">Delete</button>
            `;

            container.appendChild(div);
        });

        // Event-lyssnare på delete-knappen
        document.querySelectorAll(".delete-btn").forEach(btn => {
            btn.addEventListener("click", ()=>{
                const id = btn.dataset.id;
                deleteItem(id);
            });
        });
        
    } catch (error){
        console.error("Fel vi hämtning av data: " + error);
    }
}

// Funktion för delete
async function deleteItem(id) {
    const deleteMessage = document.getElementById("deleteMessage");

    try {
        const res = await fetch(`${apiUrl}/${id}`, {
            method: "DELETE"
        });

        if(!res.ok) {
            console.error("Kunde inte radera posten");
            deleteMessage.textContent = "Kunde inte radera posten.";
            deleteMessage.classList.remove("success");
            deleteMessage.classList.add("error");
            return;
        }

        deleteMessage.textContent = "Posten har raderats!";
        deleteMessage.classList.remove("error");
        deleteMessage.classList.add("success");

        // Laddar om sidan på nytt.
        loadData();

    } catch (error) {
        console.error("Fel vi delete: " + error);
    }
}

// Formaterar datumsträngen till åååå-mm-dd
function formatDate(dateString) {
    if(!dateString) return "";
    return dateString.split("T")[0];
}


document.addEventListener("DOMContentLoaded", () => {
  loadData();
});