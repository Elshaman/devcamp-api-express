//18. ahora metodo middleware se pone en carpeta y archivos separados
const logger = (req,res,next) => {
    //19. ahora el logger va a mostrar metodo y protocolo de transmision    
    console.log(`${req.method} ${req.protocol}://${req.get('host')} ${req.originalUrl}  `)
    next(); 
}

module.exports = logger
