var basicPlan = "basic-plan";
var proPlan = "pro-plan";
var unstyledList = "list-unstyl ed";

const zadanie1 = () => {
    var ul = document
        .getElementsByClassName("card-body")[0]
        .getElementsByTagName("ul");
    var node = document.createElement("li");
    var textnode = document.createTextNode("Wsparcie telefoniczne 24/7");
    node.appendChild(textnode);
    ul[0].appendChild(node);
};
const zadanie2 = () => {
    document
        .getElementById(basicPlan)
        .parentNode.insertBefore(
            document.getElementById(basicPlan),
            document.getElementById(proPlan)
        );
};
const zadanie3 = () => {
    var pro = document.getElementById(proPlan);
    var button = pro.getElementsByTagName("button")[0];
    button.style.background = "red";
    button.style.color = "white";
    button.innerHTML = "KUP TERAZ";
};
const zadanie4 = () => {
    var newBasicCapacity =
        document
            .getElementById(basicPlan)
            .getElementsByClassName(unstyledList)[0]
            .firstElementChild.textContent.split(" ")[1] * 1.25;
    document
        .getElementById(basicPlan)
        .getElementsByClassName(unstyledList)[0]
        .firstElementChild.textContent = document
            .getElementById(basicPlan)
            .getElementsByClassName(unstyledList)[0]
            .firstElementChild.textContent.replace(10, newBasicCapacity);
    var newProCapacity =
        document
            .getElementById(proPlan)
            .getElementsByClassName(unstyledList)[0]
            .firstElementChild.textContent.split(" ")[1] * 1.25;
    document
        .getElementById(proPlan)
        .getElementsByClassName(
            unstyledList
        )[0].firstElementChild.textContent = document
            .getElementById(proPlan)
            .getElementsByClassName(unstyledList)[0]
            .firstElementChild.textContent.replace(100, newProCapacity);
};
const runDom = () => {
    zadanie1();
    zadanie2();
    zadanie3();
    zadanie4();
};