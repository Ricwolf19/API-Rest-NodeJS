const url = 'http://localhost:3000/api/technologies'
const token = 'qwerty'

async function fetchData() {
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
            throw new Error('La solicitud no fue exitosa')
        }
        const data = await response.json()
        console.log(data);
    } catch (error) {
        console.error('Error:', error)
    }
}

fetchData()