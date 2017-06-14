var sentiment = required('sentiment');

var r1 = sentiment('Cats are stupid');
console.dir(r1);

var r2 = sentiment('Cats are totally amazing');
console.dir(r2);

var r3 = sentiment('Donald Trump');
console.dir(r3);
