// zad2

const odwracanie = (napis) => {
    return napis.split(" ").map(actualWord => {
        if(actualWord.length > 4) {
            var newWord = actualWord.split("").reverse().join("");
            if(newWord.charAt(0).match(/^\W/)) {
                return newWord.slice(1) + newWord.charAt(0); 
            }
            return newWord;
        }
        return actualWord;
    }).reduce(function(previousValue, currentValue, index, array) {
        return previousValue.toString() + " " + currentValue.toString();
      });
}

console.log(odwracanie("Dzik jest dziki, dzik jest zły. Dzik ma bardzo ostre kły.") === "Dzik jest ikizd, dzik jest zły. Dzik ma ozdrab ertso kły.")

console.log(odwracanie("Dzik jest dziki, dzik jest zły. Dzik ma bardzo ostre kły."))