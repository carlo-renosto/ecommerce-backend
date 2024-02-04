
var buttons = document.querySelectorAll(".button-extend");

buttons.forEach(button => {
    button.addEventListener("click", () => {
        var elements = button.parentElement.querySelectorAll(".element-hidden");

        if(elements.length > 0) {
            elementsChange(elements, "element-hidden", "element-visible", button)
        }
        else {
            elements = button.parentElement.querySelectorAll(".element-visible");
            elementsChange(elements, "element-visible", "element-hidden", button)
        }
    });
});

function elementsChange(elements, classRemove, classAdd, button) {
    elements.forEach(element => {
        element.classList.remove(classRemove);
        element.classList.add(classAdd);
    });
    
    button.textContent = classRemove == "element-hidden" ? "-" : "+";
}