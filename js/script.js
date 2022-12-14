const genderMale = document.querySelector('#gender-male');
const genderFemale = document.querySelector('#gender-female');
const age = document.querySelector('#age');
const height = document.querySelector('#height');   //рост
const weight = document.querySelector('#weight');
const activity = document.querySelector('.radios-group');
const submitButton = document.querySelector('.form__submit-button');
const resetButton = document.querySelector('.form__reset-button');

const counterResult = document.querySelector('.counter__result');
const caloriesNorm = document.querySelector('#calories-norm');
const caloriesMinimal = document.querySelector('#calories-minimal');
const caloriesMaximal = document.querySelector('#calories-maximal');

const form = () => {
    if (age.value !== "" && height.value !== "" && weight.value !== "") {
        submitButton.removeAttribute('disabled', 'true');
    } else {
        submitButton.setAttribute('disabled', 'true');
    };

    if (age.value !== "" || height.value !== "" || weight.value !== "") {
        resetButton.removeAttribute('disabled', 'true');
    } else {
        resetButton.setAttribute('disabled', 'true');
    };
};

let coeff = 1.2;
const weightFormula = (a, h, w) => 10*w + 6.25*h - 5*a;

age.addEventListener('input', () => {
    form();
});
height.addEventListener('input', () => {
    form();
});
weight.addEventListener('input', () => {
    form();
});

activity.addEventListener('change', (evt) => {
    switch(evt.target.id) {
        case 'activity-minimal':
            coeff = 1.2;
            break;
        
        case 'activity-low':
            coeff = 1.375;
            break;

        case 'activity-medium':
            coeff = 1.55;
            break;

        case 'activity-high':
            coeff = 1.725;
            break;

        case 'activity-maximal':
            coeff = 1.9;
            break;
    };
});

submitButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    const genderNumber = genderFemale.checked ? -161 : 5;
    const result = Math.ceil((weightFormula(age.value, height.value, weight.value) + genderNumber) * coeff);
    counterResult.classList.remove('counter__result--hidden');
    caloriesNorm.textContent = result;
    caloriesMinimal.textContent = Math.ceil(result * 0.85);
    caloriesMaximal.textContent = Math.ceil(result * 1.15);
});

resetButton.addEventListener('click', () => {
    genderMale.setAttribute('checked', 'true');
    genderFemale.removeAttribute('checked', 'true');

    age.value = "";
    height.value = "";
    weight.value = "";

    activity.querySelector('#activity-minimal').setAttribute('checked', 'true');
    activity.querySelector('#activity-low').removeAttribute('checked', 'true');
    activity.querySelector('#activity-medium').removeAttribute('checked', 'true');
    activity.querySelector('#activity-high').removeAttribute('checked', 'true');
    activity.querySelector('#activity-maximal').removeAttribute('checked', 'true');

    counterResult.classList.add('counter__result--hidden');
    submitButton.setAttribute('disabled', 'true');
    resetButton.setAttribute('disabled', 'true');
});
