//Importando este metodo podremos utilizar los metodos post, put, delete ETC......
import { Router } from "express";
import { prisma } from "../db"

const router = Router()

router.get('/categories', async (req, res) =>{
    const categories = await prisma.category.findMany({
        include: {
            technolgies: true, //relacion con la propiedad de tecnologias de la tabla que contiene una array
        }
    })
    res.json(categories)
})

export default router