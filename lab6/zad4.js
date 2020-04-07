const poKolei3 = (funTab, fcb) => {
    const helper = (funTab, fcb) => funTab.length > 0 
        ? (arg, errPropagation) => {
            try {
                funTab.shift()(errPropagation, arg, helper(funTab, fcb))
            } catch(error) {
                funTab.shift()(error, arg, helper(funTab, fcb))
            }
        }
        : fcb

    return funTab.shift()(helper(funTab, fcb));
}

var first = (cb) => {
    setTimeout(() => {
        console.log("first");
        cb("first");
    }, 1000)
}

var second = (err, result, cb) => {
    setTimeout(() => {
        result += " second";
        throw "ERR in 2"
        console.log(result);
        cb(result, err);
    }, 1000)
}

var third = (err, result, cb) => {
    setTimeout(() => {
        result += " third";
        console.log(result);
        cb(result, err);
    }, 1000)
}

var end = (res, err) => console.log(res + " DONE" + " ERROR: " + err)

poKolei3([first,second,third], end)