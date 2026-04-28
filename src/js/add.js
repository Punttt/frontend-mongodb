const apiUrl = "http://localhost:3000/api/workexperience";
import '../styles/main.scss'

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("add-work");
    const errorMessage = document.getElementById("errorMessage");
    const successMessage = document.getElementById("successMessage");


    form.addEventListener("submit", async(e) => {
        e.preventDefault();

        // Skapar ett objekt för varje input
        const newItem = {
            companyname: document.getElementById("companyname").value.trim(),
            jobtitle: document.getElementById("jobtitle").value.trim(),
            location: document.getElementById("location").value.trim(),
            startdate: document.getElementById("startdate").value.trim(),
            enddate: document.getElementById("enddate").value.trim(),
            description: document.getElementById("description").value.trim()
        };

        if(
            !newItem.companyname ||
            !newItem.jobtitle ||
            !newItem.location ||
            !newItem.startdate ||
            !newItem.enddate ||
            !newItem.description
        ){
            successMessage.textContent = "";
            errorMessage.textContent = "Alla fält måste fyllas i.";
            return;
        }

        try {
            const res = await fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newItem)
            });

            if(!res) {
                console.error("Kunde inte spara posten");
                return;
            } 
            errorMessage.textContent = "";
            successMessage.textContent = "Den nya posten är nu sparad!"
            form.reset();

        } catch (error) {
            console.error("Fel vid POST:" + error);
        }
    });
});