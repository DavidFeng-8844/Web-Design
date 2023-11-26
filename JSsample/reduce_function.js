arr = [x => x / 2, x => x / 2, x => x * 2];

let compose = fun => {
    return arr.reduce((cur, acc) => {
        return x => acc(cur(x));
    });
}

let fn = compose(arr);
console.log(fn(2));