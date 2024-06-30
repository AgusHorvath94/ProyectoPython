const BASEURL = 'https://agush94.pythonanywhere.com/';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Funcion que permite crear un elemento <tr> para la tabla de regusters
 * por medio del uso de template string de JS.
 */
async function showUsuarios(){
    let usuarios =  await fetchData(BASEURL+'/api/usuarios/', 'GET');
    const tableUsuarios = document.querySelector('#tbody-table-usuarios');
    tableUsuarios.innerHTML='';
    usuarios.forEach((usuario, index) => {
      let tr = `<tr>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.apellido}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.contraseña}</td>
                    <td>${usuario.nacimiento}</td>
                    
                    <td>
                        <button class="btn-cac" onclick='updateUsuario(${usuario.id_usuario})'><i class="bi bi-pencil"></i></button>
                        <button class="btn-cac" onclick='deleteUsuario(${usuario.id_usuario})'><i class="bi bi-trash3"></i></button>
                    </td>
                  </tr>`;
      tableUsuarios.insertAdjacentHTML("beforeend",tr);
    });
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de usuario
 * @returns 
 */
async function saveUsuario(){
    event.preventDefault(); 
    const idUsuario = document.querySelector('#id-usuario').value;
    const nombre = document.querySelector('#firstname').value;
    const apellido = document.querySelector('#lastname').value;
    const email = document.querySelector('#email').value;
    const contraseña = document.querySelector('#password').value;
    const nacimiento = document.querySelector('#birthday').value;
  
   
    //VALIDACION DE FORMULARIO
    if (!nombre || !apellido || !email || !contraseña || !nacimiento) {
      Swal.fire({
          title: 'Error!',
          text: 'Por favor completa todos los campos.',
          icon: 'error',
          confirmButtonText: 'Cerrar'
      });
      return;
    }
    // Crea un objeto con los datos del usuario
    const usuarioData = {
        nombre: nombre,
        apellido: apellido,
        email: email,
        contraseña: contraseña,
        nacimiento: nacimiento
    };
  let result = null;
  // Si hay un idUsuario, realiza una petición PUT para actualizar el usuario existente
  if(idUsuario!==""){
    result = await fetchData(`${BASEURL}/api/usuarios/${idUsuario}`, 'PUT', usuarioData);
  }else{
    // Si no hay idUsuario, realiza una petición POST para crear un nuevo usuario
    result = await fetchData(`${BASEURL}/api/usuarios/`, 'POST', usuarioData);
  }
  
  const formUsuario = document.querySelector('#FormRegister');
  formUsuario.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showUsuarios();
}

/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deleteUsuario(id){
  Swal.fire({
      title: "Esta seguro de eliminar el usuario?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
  }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await fetchData(`${BASEURL}/api/usuarios/${id}`, 'DELETE');
        showUsuarios();
        Swal.fire(response.message, "", "success");
      }
  });
  
}

/**
* Function que permite cargar el formulario con los datos de la pelicula 
* para su edición
* @param {number} id Id de la pelicula que se quiere editar
*/
async function updateUsuario(id){
  //Buscamos en el servidor la pelicula de acuerdo al id
  let response = await fetchData(`${BASEURL}/api/usuarios/${id}`, 'GET');
  const idUsuario = document.querySelector('#id-usuario');
  const nombre = document.querySelector('#firstname');
  const apellido = document.querySelector('#lastname');
  const email = document.querySelector('#email');
  const contraseña = document.querySelector('#password');
  const nacimiento = document.querySelector('#birthday');
  
  
  idUsuario.value = response.id_usuario;
  nombre.value = response.nombre;
  apellido.value = response.apellido;
  email.value = response.email;
  contraseña.value = response.contraseña;
  nacimiento.value = response.nacimiento;
}

// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
    const btnSaveUsuario = document.querySelector('#btn-send');
    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveUsuario.addEventListener('click',saveUsuario);
    showUsuarios();
});