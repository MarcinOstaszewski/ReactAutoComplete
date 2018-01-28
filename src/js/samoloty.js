var parts = [
    {'from': 12345, 'to': 13455},
    {'from': 12745, 'to': 13755},
    {'from': 2345, 'to': 2755},
    {'from': 5345, 'to': 9455},
    {'from': 2700, 'to': 5240},
    {'from': 345, 'to': 13455},
    {'from': 11345, 'to': 13000}
];

// znajduje minFrom i maxTo - zakres przedziału do przeszukania
var minFrom = Math.min(...parts.map(function(item) {
    return item['from'];
})),
    maxTo = Math.max(...parts.map(function(item) {
    return item['to'];
}));

// tworzy obiekt, w którym dla każdej wartości z przedziału minFrom -> maxTo 
// sprawdza, w ilu przedziałach ona występuje
var scope = {},
    values = [];

for (var i = minFrom; i <= maxTo; i++) {
    var howManyTimes = 0;
    for (var j = 0; j < parts.length; j++) {
        if ( i >= parts[j]["from"] && i <= parts[j]["to"] ) {
            howManyTimes++;
        }
    }
    scope[i] = {[i] : howManyTimes}; // obiekt przechowujący ilość wystąpień danej wartości we wszystkich przedziałach
    values.push(howManyTimes); // tablica przechowująca same ilości wystąpień
}

// podaje najwyższą wartość powtórzeń
console.log(Math.max(...values)); 
