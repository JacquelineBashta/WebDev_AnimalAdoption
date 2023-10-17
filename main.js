// fetch the pets data from remote server
const petPromise = await fetch("https://learnwebcode.github.io/pet-adoption-data/pets.json");
const pets = await petPromise.json();

// adapt the HTML content based on the data recieved ( use animal card as template)

//grab the Tag with the "id=animal-card" and save it in template var
const template = document.querySelector("#animal-card");
const wrapperCardsDiv = document.createElement("div");

// clone the template tag for each
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

    wrapperCardsDiv.appendChild(clone)
});

// insert the newly created div (which contains all animal cards divs) to the tag with class "animals"
document.querySelector(".animals").appendChild(wrapperCardsDiv);


function decideAgeText(petAge) {
    if (!petAge) {
        return "Less than a year old"
    }
    return petAge > 1 ? `${petAge} years old` : "1 year old"
}

//////////////////////////////////////////////////////////////////
// to handle the filter buttons

const filterButtons = document.querySelectorAll(".filter-div a")
filterButtons.forEach(el => {
    el.addEventListener("click", e => handleFiterClick(e))
})

function handleFiterClick(e) {
    let target = e.target;

    // fix the error of clicking on the "span" in "a" section, then redirect target to look ad whole "a"
    if (e.target.classList.contains("only-large-screen")) {
        target = e.target.closest("a")
    }

    e.preventDefault();
    filterButtons.forEach(el => {
        el.classList.remove("active")
    })
    target.classList.add("active");

    filterPets(target.dataset.filter);// use data-filter tag
}

function filterPets(chosenFilter) {
    const allPets = document.querySelectorAll(".animal-card")
    if (chosenFilter == "All") {
        allPets.forEach(el => {
            el.style.display = ""
        })
    } else {
        allPets.forEach(el => {
            if (el.querySelector(".species").textContent == chosenFilter) {
                el.style.display = ""
            } else {
                el.style.display = "none"
            }
        })
    }
}

