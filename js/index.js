function colorButton() {
  //console.log(apple.name);
  let root = document.documentElement;
  root.style.setProperty('--main-accent-color', getRandomColor());
}

function getRandomColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
