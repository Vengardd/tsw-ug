// zad 1

function chunk(array, size) {
    if (!array) return [];
    const firstChunk = array.slice(0, size); // create the first chunk of the given array
    if (!firstChunk.length) {
      return array; // this is the base case to terminal the recursive
    }
    return [firstChunk].concat(chunk(array.slice(size, array.length), size)); 
  }
  
const telefon = (tab) => {
    if(tab == undefined) {
        throw "Undefined input";
    }
    if(!Array.isArray(tab)) {
        throw "Input is not an array";
    }
    if(tab.length != 9) {
        throw "Bad length";
    }
    tab.map(element => {
        if(Number.isInteger(element) == false || element < 0 || element > 9) {
            throw "Wrong tab";
        }
    });
    splittedTab = chunk(tab, 3);
    let result = splittedTab.map(a => a).join("-").replace(/,/g,"");
    return "+48 " + result;
}


const telefon2 = (tab) => {
    if(tab == undefined) {
        throw "Undefined input";
    }
    if(!Array.isArray(tab)) {
        throw "Input is not an array";
    }
    if(tab.length != 9) {
        throw "Bad length";
    }
    tab.map(element => {
        if(Number.isInteger(element) == false || element < 0 || element > 9) {
            throw "Wrong tab";
        }
    });
    return "+48 " + tab.reduce(function(previousValue, currentValue, index, array) {
        if(index % 3 == 0) {
            return previousValue +  "-" + currentValue;
        }
        return previousValue.toString() + currentValue.toString();
      })
} 
console.log(telefon2([3,2,4,4,3,3,9,8,1]))
console.log(telefon2([3,2,4,4,3,3,9,8,1]) === "+48 324-433-981")
