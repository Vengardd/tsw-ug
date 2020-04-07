const poKolei = (funTab, fcb) => {
     return funTab.length > 0 
        ? funTab.shift()(() => poKolei(funTab, fcb)) 
        : fcb()
}


var first = (cb) => {
    setTimeout(() => {
        console.log("first");
        cb();
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
        cb();
    }, 1000)
}

var end = () => console.log("end");

poKolei([first,second,third], end)