let btnSend = document.querySelector("#btn-send");

btnSend.addEventListener("click", function (event) {
  event.preventDefault(); // esto para evitar que el formulario se envíe

  let inputFirstname = document.getElementById("firstname");
  let inputLastname = document.getElementById("lastname");
  let inputEmail = document.getElementById("email");
  let inputPassword = document.getElementById("password");
  let inputBirthday = document.getElementById("birthday");
  let inputCountry = document.getElementById("country");
  let terms = document.getElementById("terms");

 
  let errorFirstname = document.getElementById("error-firstname");
  let errorLastname = document.getElementById("error-lastname");
  let errorEmail = document.getElementById("error-email");
  let errorPassword = document.getElementById("error-password");
  let errorBirthday = document.getElementById("error-birthday");
  let errorCountry = document.getElementById("error-country");
  let errorTerms = document.getElementById("error-terms");

  // que el mensaje de error sea vacío inicialmente, y si no ocurre la condición que esté vacío
  errorFirstname.textContent = "";
  errorLastname.textContent = "";
  errorEmail.textContent = "";
  errorPassword.textContent = "";
  errorBirthday.textContent = "";
  errorCountry.textContent = "";
  errorTerms.textContent = "";

 
  if (inputFirstname.value.trim() === "") {
    errorFirstname.textContent = "Debes completar el campo Nombre";
  }

  if (inputLastname.value.trim() === "") {
    errorLastname.textContent = "Debes completar el campo Apellido";
  }

  if (inputEmail.value.trim() === "") {
    errorEmail.textContent = "Debes ingresar un email";
  }

  if (inputPassword.value.trim() === "") {
    errorPassword.textContent = "Debes ingresar una contraseña";
  }

  if (inputBirthday.value.trim() === "") {
    errorBirthday.textContent = "Debes ingresar fecha de cumpleaños";
  }

  if (inputCountry.value.trim() === "") {
    errorCountry.textContent = "Debes ingresar país";
  }

  // verificar si los términos y condiciones están marcados
  if (!terms.checked) {
    errorTerms.textContent = "Debes aceptar los términos y condiciones";
  }

  // solo mostrar alerta cuando estén todos completos y los términos estén marcados
  if (
    inputFirstname.value.trim() !== "" &&
    inputLastname.value.trim() !== "" &&
    inputEmail.value.trim() !== "" &&
    inputPassword.value.trim() !== "" &&
    inputBirthday.value.trim() !== "" &&
    inputCountry.value.trim() !== "" &&
    terms.checked
  ) {
    alert("Gracias por enviar el formulario");
  }
});
