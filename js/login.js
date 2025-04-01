'use strict';
const container = document.querySelector('.container');
const registerBtn = document.querySelector(".register-btn");
const loginBtn = document.querySelector(".login-btn");
const registerForm = document.querySelector(".form-box.register form");
const loginForm = document.querySelector(".form-box.login form");
const roleToggle = document.getElementById("roleToggle");

// Toggle Forms
registerBtn?.addEventListener('click', () => container.classList.add('active'));
loginBtn?.addEventListener('click', () => container.classList.remove('active'));

// Password Visibility Toggle
document.querySelectorAll(".input-box i").forEach(icon => {
    icon.addEventListener("click", function () {
        let passwordInput = this.previousElementSibling;
        passwordInput.type = passwordInput.type === "password" ? "text" : "password";
        this.classList.toggle("fa-eye-slash");
        this.classList.toggle("fa-eye");
    });
});

// Email and Password Validation
registerForm?.addEventListener("submit", function (e) {
    let email = this.querySelector("input[type='email']").value;
    let password = this.querySelector("input[type='password']").value;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email) || password.length < 8) {
        alert("Invalid email or password must be at least 8 characters long");
        e.preventDefault();
    }
});

// Handle Login
loginForm?.addEventListener("submit", async function (e) {
    e.preventDefault();
    let email = this.querySelector("input[type='email']").value;
    let password = this.querySelector("input[type='password']").value;

    try {
        let res = await fetch("https://320b-197-203-168-106.ngrok-free.app/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        let data = await res.json();

        if (res.ok) {
            localStorage.setItem("token", data.token);
            localStorage.setItem("role", data.role); // Store role for later use

            if (data.role === "doctor") {
                window.location.href = "./doctor.html";
            } else if (data.role === "patient") {
                window.location.href = "./patient.html";
            } else {
                alert("Invalid role. Please contact support.");
            }
        } else {
            alert("Login failed: " + data.message);
        }
    } catch (error) {
        alert("An error occurred. Please try again later.");
    }
});

// Handle Register
registerForm?.addEventListener("submit", async function (e) {
    e.preventDefault();
    let name = this.querySelector("input[type='text']").value;
    let email = this.querySelector("input[type='email']").value;
    let password = this.querySelector("input[type='password']").value;
    let role = roleToggle?.checked ? "patient" : "doctor";
    try {
        let res = await fetch("https://320b-197-203-168-106.ngrok-free.app/api/auth/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email, password, role })
        });
        let data = await res.json();
        if (res.ok) {
            window.location.href = role == "doctor" ? "./doctor.html" : "./patient.html";
        } else alert("Registration failed: " + data.message);
    } catch (error) {
        alert("An error occurred. Please try again later.");
    }
});
