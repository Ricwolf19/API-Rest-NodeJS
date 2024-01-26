//Importando este metodo podremos utilizar los metodos post, put, delete ETC......
import { Router } from "express";
import { prisma } from "../db"; 

const router = Router()

// GET (Todas las tecnologias)
router.get('/technologies', async (req, res) => {
    const technologies = await prisma.technologies.findMany() //Esto es asyncrono ya que tiene relacion con una base de datos
    res.json(technologies)
})

//GET (Una unica tecnologia)
// req.params.id es igual a la url que tenemos abajo
router.get('/technologies/:id', async (req, res) => {
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
router.post('/technologies', async (req, res) => {
    const newTechnologie = await prisma.technologies.create({
        data: req.body,
    })
    res.json(newTechnologie)
})

//DELETE
router.delete('/technologies/:id', async (req, res) => {
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
router.put('/technologies/:id', async (req, res) => {
    const TechUpdated = await prisma.technologies.update({
        where: {
            id: parseInt(req.params.id)
        },
        data: req.body
    })
    return res.json(TechUpdated)
})

export default router
