const btn = document.querySelector('.header__btn');
btn.addEventListener('click', () => {
  let answer = capitalize(prompt('Which tour do you prefer?'));
  alert(`${answer} tour is selected`);
});

const capitalize = string => {
  return string[0].toUpperCase() + string.slice(1);
};
