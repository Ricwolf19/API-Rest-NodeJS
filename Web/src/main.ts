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
        const updateName = document.getElementById('updateName') as HTMLInputElement;
        const updateCreator = document.getElementById('updateCreator') as HTMLInputElement;
        // const updateLaunchDate = document.getElementById('updateLaunchDate') as HTMLInputElement;
        const updateObjective = document.getElementById('updateObjective') as HTMLInputElement;
        
        const updatePrice = document.getElementById('updatePrice') as HTMLInputElement;
        const priceValue = parseInt(updatePrice.value, 10);
        const isValidPrice = !isNaN(priceValue);


        const updateCategory = document.getElementById('updateCategory') as HTMLInputElement;
        const categoryValue = parseInt(updateCategory.value, 10)
        const isValidCategory = !isNaN(categoryValue)

        // Construir el objeto con los datos actualizados
        const updatedData = {
            name: updateName.value,
            creator: updateCreator.value,
           // launch_date: updateLaunchDate.value,
            objective: updateObjective.value,
            //price: updatePrice.value,
            price: isValidPrice ? priceValue : 0, 
            categoryId: isValidCategory ? categoryValue: 0,
        };

        // Realizar la solicitud PUT al servidor
        const response = await fetch(`${url}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorize': token
            },
            body: JSON.stringify(updatedData),
        });

        if (!response.ok) {
            throw new Error("UPDATE NOT SUCCESSFUL");
        }

        // Ocultar el formulario de actualización después de una actualización exitosa
        const updateForm = document.getElementById('updateForm');
        if (updateForm) {
            updateForm.style.display = 'none';
        }

        // Actualizar la vista
        getData();
    } catch (error) {
        console.error(`Error: ${error}`);
    }
}



//METHOD POST
async function postData() {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json',
                'Authorize': token
            }
        });
        if (!response.ok) {
            throw new Error("POST NOT SUCCESSFULL");
        }
        getData() //Traemos la funcion get para que actualize automaticamente la tabla con los datos
    } catch (error) {
        console.error(`Error: ${error}`)
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
            <button onclick="watchData(${data.id})">watch</button>
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