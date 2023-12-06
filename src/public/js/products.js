
var buttons = document.querySelectorAll(".button");

document.getElementById('div-products').addEventListener('click', function(event) {
    if (event.target.classList.contains('button')) {
        var button = event.target;
        var elements = button.parentElement.querySelectorAll('.hidden');

        if(elements.length > 0) {
            elementsChange(elements, 'hidden', 'visible', button);
        } 
        else {
            elements = button.parentElement.querySelectorAll('.visible');
            elementsChange(elements, 'visible', 'hidden', button);
        }
    }
});

function elementsChange(elements, classRemove, classAdd, button) {
    elements.forEach(element => {
        element.classList.remove(classRemove);
        element.classList.add(classAdd);
    });
    
    button.textContent = classRemove == "hidden" ? "-" : "+";
}