const url = 'http://localhost:3000/api/technologies'
const token = 'qwerty'

//METHOD GET
async function getData() {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers:
            {
                'Content-Type': 'application/json',
                'Authorize': token
            }
        });
        if (!response.ok) {
            throw new Error('GET NOT SUCCESSFULL')
        }
        const data = await response.json()
        //console.log(data);
        showTechnologies(data);
    } catch (error) {
        console.error('Error:', error)
    }
}

//METHOD DELETE
async function delData(id: number) {
    try {
        const response = await fetch(`${url}/${id}`, {
            method: 'DELETE',
            headers:
            {
                'Content-Type': 'application/json',
                'Authorize': token
            }
        });
        if (!response.ok) {
            throw new Error("DELETE NOT SUCCESSFULL");
        }
        getData()
    } catch (error) {
        console.error(`Error: ${error}`)
    }
}

//METHOD PUT
async function updateData(id: number) {
    try {
        // Obtener los valores del formulario de actualización
        const updateName = document.getElementById('name') as HTMLInputElement;
        const updateCreator = document.getElementById('creator') as HTMLInputElement;
        const updateLaunchDate = document.getElementById('launchDate') as HTMLInputElement;
        const updateObjective = document.getElementById('objective') as HTMLInputElement;

        //Obtener el precio y convertirlo a entero junto con la validacion numerica
        const updatePrice = document.getElementById('price') as HTMLInputElement;
        const priceValue = parseInt(updatePrice.value, 10);
        const isValidPrice = !isNaN(priceValue);

        //Se formatea a formato ISO para poder guardar la fecha del input en la base de datos
        const launchDateValue = updateLaunchDate.value;
        const isoFormattedDate = new Date(launchDateValue).toISOString();

        //Obtener el ID de su categoria y convertirlo a entero junto con la validacion numerica
        const updateCategory = document.getElementById('category') as HTMLInputElement;
        const categoryValue = parseInt(updateCategory.value, 10)
        const isValidCategory = !isNaN(categoryValue)

        // Construir el objeto con los datos actualizados
        const updatedData = {
            name: updateName.value,
            creator: updateCreator.value,
            launch_date: isoFormattedDate,
            objective: updateObjective.value,
            price: isValidPrice ? priceValue : 0,
            categoryId: isValidCategory ? categoryValue : 0,
        };

        // Realizar la solicitud PUT al servidor
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorize': token
            },
            body: JSON.stringify(updatedData), //Se convierte a formato JSON el objeto con el contenido de los inputs y se devuelve a la base de datos
        });

        if (!response.ok) {
            throw new Error("UPDATE NOT SUCCESSFUL");
        }

        // Ocultar el formulario de actualización después de una actualización exitosa
        const updateForm = document.getElementById('form');
        if (updateForm) {

            // Limpiar el contenido de los campos de entrada
            updateName.value = "";
            updateCreator.value = "";
            updateLaunchDate.value = "";
            updateObjective.value = "";
            updatePrice.value = "";
            updateCategory.value = "";
        }

        getData();
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}


//METHOD POST
async function postData() {
    try {
        // Obtener los valores del formulario de actualización
        const postName = document.getElementById('name') as HTMLInputElement;
        const postCreator = document.getElementById('creator') as HTMLInputElement;
        const postLaunchDate = document.getElementById('launchDate') as HTMLInputElement;
        const postObjective = document.getElementById('objective') as HTMLInputElement;

        //Obtener el precio y convertirlo a entero junto con la validacion numerica
        const postPrice = document.getElementById('price') as HTMLInputElement;
        const priceValue = parseInt(postPrice.value, 10);
        const isValidPrice = !isNaN(priceValue);

        //Se formatea a formato ISO para poder guardar la fecha del input en la base de datos
        const launchDateValue = postLaunchDate.value;
        const isoFormattedDate = new Date(launchDateValue).toISOString();

        //Obtener el ID de su categoria y convertirlo a entero junto con la validacion numerica
        const postCategory = document.getElementById('category') as HTMLInputElement;
        const categoryValue = parseInt(postCategory.value, 10)
        const isValidCategory = !isNaN(categoryValue)

        // Construir el objeto con los datos actualizados
        const postData = {
            name: postName.value,
            creator: postCreator.value,
            launch_date: isoFormattedDate,
            objective: postObjective.value,
            price: isValidPrice ? priceValue : 0,
            categoryId: isValidCategory ? categoryValue : 0,
        };

        // Realizar la solicitud POST al servidor
        const response = await fetch(`${url}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorize': token
            },
            body: JSON.stringify(postData), //Se convierte a formato JSON el objeto con el contenido de los inputs y se devuelve a la base de datos
        });

        if (!response.ok) {
            throw new Error("POST NOT SUCCESSFUL");
        }

        const updateForm = document.getElementById('form');
        if (updateForm) {

            // Limpiar el contenido de los campos de entrada
            postName.value = "";
            postCreator.value = "";
            postLaunchDate.value = "";
            postObjective.value = "";
            postPrice.value = "";
            postCategory.value = "";
        }

        getData();
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}


function showTechnologies(datas: any[]) {
    const tableHtml = `
    <table>
      <tr>
        <th>Name</th>
        <th>Creator</th>
        <th>Launch date</th>
        <th>Objective</th>
        <th>Price</th>
        <th>Category</th>
        <th>Actions</th>
      </tr>
      ${datas.map(data => //Se utiliza el metodo map para recorrer de nuevo todos los datas de la base de datos
        `<tr>
          <td>${data.name}</td>
          <td>${data.creator}</td>
          <td>${data.launch_date}</td>
          <td>${data.objective}</td>
          <td>${data.price}</td>
          <td>${data.categoryId}</td>
          <td>
            <button onclick="delData(${data.id})">delete</button>
            <button onclick="updateData(${data.id})">update</button>
          </td>
        </tr>`
    ).join('')}
    </table>`;

    const tableTech = document.getElementById('tableTech');
    if (tableTech) {
        tableTech.innerHTML = tableHtml
    }
}


getData()