const poKolei3 = (funTab, fcb) => {
    const helper = (funTab, fcb) => funTab.length > 0 
        ? arg => funTab.shift()(arg, helper(funTab, fcb))
        : fcb

    return funTab.shift()(helper(funTab, fcb));
}

var first = (cb) => {
    setTimeout(() => {
        console.log("first");
        cb("first");
    }, 1000)
}

var second = (result, cb) => {
    setTimeout(() => {
        result += " second";
        console.log(result);
        cb(result);
    }, 1000)
}

var third = (result, cb) => {
    setTimeout(() => {
        result += " third";
        console.log(result);
        cb(result);
    }, 1000)
}

var end = (res) => console.log(res + " DONE")

poKolei3([first,second,third],end)