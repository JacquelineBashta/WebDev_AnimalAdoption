const petPromise = await fetch("https://learnwebcode.github.io/pet-adoption-data/pets.json");
const pets = await petPromise.json();


const template = document.querySelector("#animal-card");
const wrapperCards = document.createElement("div");

function decideAgeText(petAge) {
    if (!petAge) {
        return "Less than a year old"
    }
    return petAge > 1 ? `${petAge} years old` : "1 year old"
}
pets.forEach(pet => {
    const clone = template.content.cloneNode(true);
    clone.querySelector("h3").textContent = pet.name;
    clone.querySelector("span.species").textContent = pet.species.charAt(0).toUpperCase() + pet.species.slice(1);
    clone.querySelector("p.description").textContent = pet.description;
    clone.querySelector("a.primary-btn").textContent = `Adopt ${pet.name}`;

    clone.querySelector("a.primary-btn").href = `https://learnwebcode.github.io/pet-adoption-data/pets/${pet.id}/`
    const image = clone.querySelector("img");
    image.src = pet.photo;
    image.alt = `A ${pet.species} named ${pet.name}`


    const petAge = new Date().getFullYear() - pet.birthYear;
    const petAgeText = decideAgeText(petAge);
    clone.querySelector(".age").textContent = petAgeText;

    wrapperCards.appendChild(clone)
});

document.querySelector(".animals").appendChild(wrapperCards);


const filterButtons = document.querySelectorAll(".filter-div a")
filterButtons.forEach(el => {
    el.addEventListener("click", e => handleFiterClick(e))
})

function handleFiterClick(e) {
    let target = e.target;
    e.preventDefault();

}