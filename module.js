console.log('smelly');

console.log('start fetching');
const rest = await fetch('https://jsonplaceholder.typicode.com/posts');
const data = await rest.json();
console.log(data);
console.log('something');