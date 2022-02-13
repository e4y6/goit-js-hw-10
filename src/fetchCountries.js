import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function fetchCountries(name, callback) {
  fetch(
    `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`
  )
    .then((response) => response.json())
    .then((results) => {
      if (results.status === 404) {
        throw new Error('404');
      };

      callback(results);
    })
    .catch((error) => {
      Notify.failure('Oops, there is no country with that name');
    });
};