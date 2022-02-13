import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { debounce } from 'lodash';
import { fetchCountries } from './fetchCountries';

const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector('input#search-box');
const listRef = document.querySelector('.country-list');
const countryCardRef = document.querySelector('.country-info');

inputRef.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const inputValue = inputRef.value;

  clearField();

  if (inputValue.trim() === '') {
    Notify.info('Input field must not be empty');
    return;
  };

  fetchCountries(inputValue, renderCountries);
};

function renderCountries(countries) {
  if (countries.length > 10) {
    return Notify.warning(
      'Too many matches found. Please enter a more specific name.'
    );
  }

  if (countries.length <= 10 && countries.length > 1) {
    renderCountryList(countries);
  }

  if (countries.length === 1) {
    renderCountryCard(countries[0]);
  }
}

function renderCountryList(countries) {
  listRef.innerHTML = countries
    .map(
      ({ name: { common }, flags: { svg } }) =>
        `<li class="list-item"><img src="${svg}" alt="${common}" class="list-flag">${common}</li>`
    )
    .join('');
}

function renderCountryCard({
  name: { common },
  capital,
  flags: { svg },
  population,
  languages,
}) {
  countryCardRef.innerHTML = `
    <img class="card-img" src="${svg}" alt="${common}">
    <h2 class="country-name"><span class="text-accent" >Country:</span> ${common}</h2>
    <p class="capital"><span class="text-accent" >Capital:</span> ${capital}</p>
    <p class="population"><span class="text-accent" >Population:</span> ${population}</p>
    <p class="languages"><span class="text-accent" >Languages:</span> ${Object.values(
      languages
    ).join(', ')}</p>`;
}

function clearField() {
  listRef.innerHTML = ' ';
  countryCardRef.innerHTML = ' ';
}