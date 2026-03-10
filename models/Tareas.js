const moongose = require('mongoose');

const TareasSchema = moongose.Schema({    
    nombre: {
        type: String,
        required: true,
        trim: true  
    },
    creador: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    creado: {
        type: Date,
        default: Date.now()
    },
    proyecto: {
        type: moongose.Schema.Types.ObjectId,
        ref: 'Proyecto'
    },
    estado: {
        type: Boolean,
        default: false
    }
});

module.exports = moongose.model('Tarea', TareasSchema);