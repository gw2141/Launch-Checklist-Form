// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

window.addEventListener("load", function () {
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
      response.json().then(function (json) {
         const div = document.getElementById("missionTarget");
         // Add HTML that includes the JSON data
         div.innerHTML = `
        <h2>Mission Destination</h2>
        <ol>
            <li>Name: ${json[2].name}</li>
            <li>Diameter: ${json[2].diameter}</li>
            <li>Star: ${json[2].star}</li>
            <li>Distance from Earth: ${json[2].distance}</li>
            <li>Number of Moons: ${json[2].moons}</li>
        </ol>
        <img src="${json[2].image}">
         `;
      });
   });
   let form = document.querySelector("form");
   let faultyItemsList = document.getElementById("faultyItems");
   faultyItemsList.style.visibility = "hidden";
   let pilotStatus = document.getElementById("pilotStatus");
   let copilotStatus = document.getElementById("copilotStatus");
   let fuelStatus = document.getElementById("fuelStatus");
   let cargoStatus = document.getElementById("cargoStatus");
   let launchStatus = document.getElementById("launchStatus");
   form.addEventListener("submit", function (event) {
      event.preventDefault();
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]")
      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
         // stop the form submission
      } else if (!isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value) || isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)) {
         alert("Make sure to enter valid information for each field!")
      } else {
         faultyItemsList.style.visibility = "visible";
         pilotStatus.innerHTML = `Pilot ${pilotNameInput.value} is ready for launch`
         copilotStatus.innerHTML = `Copilot ${copilotNameInput.value} is ready for launch`
         if (fuelLevelInput.value <= 10000 && cargoMassInput.value >= 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch";
            cargoStatus.innerHTML = "Cargo Mass too heavy for launch";
            launchStatus.style.color="red";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
         }
         if (fuelLevelInput.value > 10000 && cargoMassInput.value >= 10000) {
            fuelStatus.innerHTML = "Fuel level sufficient for launch";
            cargoStatus.innherHTML = "Cargo Mass to heavy for launch";
            launchStatus.style.color ="red";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
         }
         if (fuelLevelInput.value <= 10000 && cargoMassInput.value < 10000) {
            fuelStatus.innerHTML = "Fuel level too low for launch";
            cargoStatus.innerHTML = "Cargo Mass light enough for launch";
            launchStatus.style.color="red";
            launchStatus.innerHTML = "Shuttle Not Ready for Launch";
         }
         if (fuelLevelInput.value > 10000 && cargoMassInput.value < 10000) {
            fuelStatus.innerHTML = "Fuel level sufficient for launch";
            cargoStatus.innerHTML = "Cargo Mass light enough for launch";
            launchStatus.style.color ="green";
            launchStatus.innerHTML = "All systems are a go, standby for launch";
         }
      }
   });
});
