import express from 'express'
import techRoutes from './routes/technologies.routes' //Todos los que son modulos de terceros pide node poner extension .js (USANDO TYPESCRIPT TIRA ERROR)
import catRoutes from './routes/categories.routes' //Tambien se debe de quitar el "type": "module", del package.json ya que TSC tiene su propio compilador 

const app = express()
app.listen(3000)

//Como queremos mandar los datos en json invocamos al metodo de express .json para enviar y recibir datos
app.use(express.json()) //MiddleWare

app.use('/api', techRoutes);
app.use('/api', catRoutes);

console.log(`Server is on port ${3000}`)       