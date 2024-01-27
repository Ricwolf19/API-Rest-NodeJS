//Importando este metodo podremos utilizar los metodos post, put, delete ETC......
import { Router } from "express";
import { prisma } from "../db"; 
import { Request, Response, NextFunction } from "express";
// import { authorize } from "../index" //importamos la funcion que nos da la autorizacion (Ver por que no se puede importar desde otro archivo)

const router = Router()

function authorize(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorize
    if (token === "qwerty") { //Agregando un middleware Next con cors a la vez que un token al hacer los methods disponibles
       next(); 
    } else {
        res.send('Something is wrong')
    }
}

//METODOS -----------------------

// GET (Todas las tecnologias)
router.get('/technologies', authorize , async (req, res) => {
    const technologies = await prisma.technologies.findMany() //Esto es asyncrono ya que tiene relacion con una base de datos
    res.json(technologies)
})

//GET (Una unica tecnologia)
// req.params.id es igual a la url que tenemos abajo
router.get('/technologies/:id', authorize , async (req, res) => {
    //console.log(typeof req.params.id)
    const techFound = await prisma.technologies.findFirst({
        where: {
            id: parseInt(req.params.id) //Como vino como string el id teniamos que convertirlo a entero con parseInt
        },
        include: { //Con include obtenemos con que modelos se relaciona nuestra tabla con sus datos
            category: true,
        }
    });

    if (!techFound) return res.status(404).json("Error: Product dont found");

    return res.json(techFound)
})

//POST
//Peticion con prisma para postear 
router.post('/technologies', authorize , async (req, res) => {
    const newTechnologie = await prisma.technologies.create({
        data: req.body,
    })
    res.json(newTechnologie)
})

//DELETE
router.delete('/technologies/:id', authorize , async (req, res) => {
    //console.log(typeof req.params.id)
    const Techdeleted = await prisma.technologies.delete({
        where: {
            id: parseInt(req.params.id) //Como vino como string el id teniamos que convertirlo a entero con parseInt
        },
    });

    if (!Techdeleted) return res.status(404).json("Error: Product dont found");

    return res.json(`This product ${Techdeleted} has been deleted`)
})

//PUT
router.put('/technologies/:id', authorize , async (req, res) => {
    const TechUpdated = await prisma.technologies.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: req.body
    })
    return res.json(TechUpdated)
})

export default router
