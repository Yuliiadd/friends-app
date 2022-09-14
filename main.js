"use strict"

const cardsSection = document.querySelector('.grid__wrapper');
// first screen 
const firstScreen = document.querySelector('.form__wrapper');
const firstScreenForm = document.querySelector('.form_first-screen');
// main content 
const aside = document.querySelector('.aside');

console.log(firstScreen);
let defaultUsers = [];
let requestErrorsCounter = 0;

firstScreenForm.addEventListener('submit', function(e) {
    e.preventDefault(); 
    const sex = document.querySelector('input[name="sex"]:checked').value;
    const ageRange = {
        min: document.querySelector('input[id="input-min"]').value,
        max: document.querySelector('input[id="input-max"]').value,
    };
    firstScreen.style.display = "none";
    aside.style.display = "block";

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
    min.value = ageRange.min;
    max.value = ageRange.max;

    getUsers(sex, ageRange.min, ageRange.max);
});

// function getUsers(sex, minAge, maxAge) {
//     const promise = fetch("https://randomuser.me/api/?results=100");
//     return promise
//         .then(data => data.json())
//         .then(users => {
//             const filtredUsers = users.results.filter(user => user.gender == sex && user.dob.age >= minAge && user.dob.age <= maxAge);
//             renderCards(filtredUsers);
//         }).catch(function() {
//             requestErrorsCounter++;
//             console.log(requestErrorsCounter);
//             if (requestErrorsCounter < 5) {
//                 getUsers();
//             } else {
//                 console.log(Error("Помилка серверу. Перезапустіть сторінку."))
//             }
//         });
// }

// getUsers("male", 18, 50);

// function renderCards(usersArr) {
//     usersArr.forEach(user => {
//         new Card(user).render();
//     });
// };

