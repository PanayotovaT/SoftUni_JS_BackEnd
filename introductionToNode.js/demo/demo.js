const url = new URL('/cataog?page=4', 'http://localhost:3000');
console.log(url);
console.log(url.pathname);
console.log(url.searchParams.get('page'));
