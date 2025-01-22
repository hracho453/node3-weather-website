
const weatherForm = document.querySelector('form');
const search = document.querySelector('#search');
const messageOne = document.querySelector('#massage-1'); // Correct ID spelling if needed
const messageTwo = document.querySelector('#massage-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  messageOne.textContent = 'Loading...';
  messageTwo.textContent = '';

  fetch(`http://localhost:3000/weather?address=${location}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.error) {
        messageOne.textContent = data.error;
      } else {
        messageOne.textContent = data.location;
        messageTwo.textContent = data.forecast;
      }
    })
    .catch((error) => {
      messageOne.textContent = 'Unable to connect to weather service!';
    });
});