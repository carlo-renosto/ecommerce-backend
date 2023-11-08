const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const userInfo = {
        name: e.target.name.value,
        email: e.target.email.value
    }

    fetch("http://localhost:8080/api/sessions/user-login", {
        method: "post", 
        headers: {"Content-type": "application/json"}, 
        body: JSON.stringify(userInfo)
    })
    .then(response => {
        return response.json();
    })
    .then(data => {
        console.log(data);
    });
});