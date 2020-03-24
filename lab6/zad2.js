const poKolei2 = (funTab, fcb) => {
    const helper = (funTab, fcb, resArr) => {
        return funTab.length > 0 ? 
            funTab.shift()((result) => {
                resArr.push(result);
                return helper(funTab, fcb, resArr);
            })
            : fcb(resArr)
    }
    return helper(funTab, fcb, []);
}

var first = (cb) => {
    setTimeout(() => {
        console.log("first");
        cb(2);
    }, 1000)
}

var second = (cb) => {
    setTimeout(() => {
        console.log("second");
        cb();
    }, 1000)
}

var third = (cb) => {
    setTimeout(() => {
        console.log("third");
        cb(3);
    }, 1000)
}

var end = (res) => console.log(res)

poKolei2([first,second, third], end)