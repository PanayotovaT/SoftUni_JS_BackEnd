function print(text ){
    console.log('>>>' + text);
}

function fancyPint(text) {
    console.log('>>>' + text + '<<<');
}
const arr = [1, 2, 3];

module.exports = {
    print,
    fancyPint,
    arr,
    number: 5
};
