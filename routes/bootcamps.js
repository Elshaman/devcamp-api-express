//9. de nuevo añadir la dependencia a express
const express = require('express')
const router = express.Router()

//8. separar las rutas en un archivo separado y refactorarlas :
router.get('/', (req, res) => {
    res.status(200).json(
     { 
         'success' : true,
         'msg' : `mostrar todos los bootcamps` })
})

router.get('/:id', (req, res) => {
res.status(200).json(
 { 
     'success' : true,
     'msg' : `mostrar el  bootcamp con id: ${req.params.id}`  })
})

router.post('/', (req, res)=> {
res.status(200).json(
    { 
        'success' : true,
        'msg' : 'crear bootcamp' })
})

router.put('/:id', (req, res)=> {
res.status(200).json(
    { 
        'success' : true,
        'msg' : `actualizar bootcamp con id: ${req.params.id} ` })
})

router.delete('/:id', (req, res)=> {
res.status(200).json(
    { 
        'success' : true,
        'msg' : `eliminar bootcamp con id: ${req.params.id} ` })
})

module.exports = router

