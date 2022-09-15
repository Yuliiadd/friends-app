"use strict"

const cardsSection = document.querySelector('.grid__wrapper');
const url = "https://randomuser.me/api/?results=100";
let requestErrorsCounter = 0;
let copyOfFiltredUsers;
// first screen 
const firstScreen = document.querySelector('.form__wrapper');
const firstScreenForm = document.querySelector('.form_first-screen');
// aside
const aside = document.querySelector('.aside');



firstScreenForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    const sex = document.querySelector('input[name="sex"]:checked').id;
    const ageRange = {
        min: document.querySelector('input[id="input-min"]').value,
        max: document.querySelector('input[id="input-max"]').value,
    };
    switch (sex) {
        case 'male': 
        document.querySelector('input[id="male_aside"]').checked = true;
        break;

        case 'female': 
        document.querySelector('input[id="female_aside"]').checked = true;
        break;

        case 'all': 
        document.querySelector('input[id="all_aside"]').checked = true;
        break;
    };

    const min = document.querySelector('input[id="aside_input-min"]');
    const max = document.querySelector('input[id="aside_input-max"]');

    ageRange.min ? min.value = ageRange.min : min.value = 18;
    ageRange.max ? max.value = ageRange.max : max.value = 120;
    getUsers(sex, min.value , max.value);
});

function getUsers(sex, minAge, maxAge) {
    const promise = fetch(url);
    return promise
        .then(data => data.json())
        .then(users => {
            if (sex == "all") {
                const filtredUsers = users.results.filter(user => user.dob.age >= minAge && user.dob.age <= maxAge);
                copyOfFiltredUsers = [...filtredUsers];
                renderCards(filtredUsers);
            } else {
                const filtredUsers = users.results.filter(user => user.gender == sex && user.dob.age >= minAge && user.dob.age <= maxAge);
                copyOfFiltredUsers = [...filtredUsers];
                console.log(copyOfFiltredUsers)
                renderCards(filtredUsers);
            }
        }).catch(function() {
            requestErrorsCounter++;
            console.log(requestErrorsCounter);
            if (requestErrorsCounter < 5) {
                getUsers();
            } else {
                console.log(Error("Помилка серверу. Перезапустіть сторінку."))
            }
        });
}

function renderCards(usersArr) {
    console.log('render');
    usersArr.forEach(user => {
        new Card(user).render();
    });
    firstScreen.style.display = "none";
    aside.style.display = "block";
};

