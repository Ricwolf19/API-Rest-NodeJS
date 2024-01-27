import express from 'express'
import techRoutes from './routes/technologies.routes' //Todos los que son modulos de terceros pide node poner extension .js (USANDO TYPESCRIPT TIRA ERROR)
import catRoutes from './routes/categories.routes' //Tambien se debe de quitar el "type": "module", del package.json ya que TSC tiene su propio compilador 
import cors from "cors"

const app = express();
const port = 3000;

app.use(cors()) //Se usa cors

const optionsCors = {
    origin: '*', //Permite el acceso desde cualquier origen
    methods: ['GET', 'POST', 'DELETE', 'PUT']
}

//Como queremos mandar los datos en json invocamos al metodo de express .json para enviar y recibir datos
//app.use(express.json()) //MiddleWare

app.use(cors(optionsCors))

app.use('/api', techRoutes);
app.use('/api', catRoutes);


app.listen(port, () => {
    console.log(`Server is on port ${port}`)
})
