const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Proyecto = require('../models/Proyecto');
const Tarea = require('../models/Tareas');
require('dotenv').config({ path: 'variables.env' });

const requireAuth = (ctx) => {
    if (!ctx?.usuario?.id) {
        throw new Error('No autenticado');
    }

    return ctx.usuario;
};

// Crea y firma un JWT
const crearToken = (usuario, secreta, expiresIn) => {
    const { id, email, nombre } = usuario;
    return jwt.sign({ id, email, nombre }, secreta, { expiresIn });
};

const resolvers = {
    Query: {
        obtenerProyectos: async (_, {}, ctx) => {
            try {
                const usuario = requireAuth(ctx);
                const proyectos = await Proyecto.find({ creador: usuario.id });
                return proyectos;
            } catch (error) {
                if (error.message === 'No autenticado') {
                    throw error;
                }
                console.log(error);
                throw new Error('Error al obtener los proyectos');
            }
        },
        obtenerTareas: async (_, {input}, ctx) => {
            try {
                const usuario = requireAuth(ctx);
                const tareas = await Tarea.find({ creador: usuario.id}).where('proyecto').equals(input.proyecto);
                return tareas;
            } catch (error) {
                if (error.message === 'No autenticado') {
                    throw error;
                }
                console.log(error);
                throw new Error('Error al obtener las tareas');
            }
        }
    },
    Mutation: {
        crearUsuario: async (_, { input }) => {
           const { email, password } = input;

           // Revisar si el usuario ya existe
           const existeUsuario = await Usuario.findOne({ email });
           if (existeUsuario) {
               throw new Error('El usuario ya está registrado');
           }
           try {
               //Hash de password
               const salt = await bcrypt.genSalt(10);
               input.password = await bcrypt.hash(password, salt);
               const usuario = new Usuario(input);
               await usuario.save();
               return 'Usuario creado correctamente';
           } catch (error) {
               console.log(error);
               throw new Error('Error al crear el usuario');
           }
        },

        autenticarUsuario: async (_, { input }) => {
            const { email, password } = input;
            // Revisar si el usuario existe
            const existeUsuario = await Usuario.findOne({ email });
            if (!existeUsuario) {
                throw new Error('El usuario no existe');
            }
            // Revisar si el password es correcto
            const passwordCorrecto = await bcrypt.compare(password, existeUsuario.password);
            if (!passwordCorrecto) {
                throw new Error('Password incorrecto');
            }
            //Dar acceso a la app
            return { token : crearToken(existeUsuario, process.env.SECRETA, '2hr') };
        },

        nuevoProyecto: async (_, { input }, ctx) => {
            try {
                const usuario = requireAuth(ctx);
                const proyecto = new Proyecto(input);
                //asociar el proyecto al creador
                proyecto.creador = usuario.id;

                const resultado = await proyecto.save();
                return resultado;
            } catch (error) {
                if (error.message === 'No autenticado') {
                    throw error;
                }
                console.log(error);
                throw new Error('Error al crear el proyecto');
            }

        },
        actualizarProyecto: async (_, { id, input }, ctx) => {
            const usuario = requireAuth(ctx);
            // Revisar si el proyecto existe
            let proyecto = await Proyecto.findById(id);
            if (!proyecto) {
                throw new Error('Proyecto no encontrado');
            }
            // Revisar si el creador del proyecto es el mismo que intenta actualizarlo
            if (proyecto.creador.toString() !== usuario.id) {
                throw new Error('No tienes las credenciales para actualizar este proyecto');
            }
            // Actualizar el proyecto
            proyecto = await Proyecto.findByIdAndUpdate(id, input, { returnDocument: 'after' });
            return proyecto;
        },
        eliminarProyecto: async (_, { id }, ctx) => {
            const usuario = requireAuth(ctx);
            // Revisar si el proyecto existe
            let proyecto = await Proyecto.findById(id);
            if (!proyecto) {
                throw new Error('Proyecto no encontrado');
            }

             // Revisar si el creador del proyecto es el mismo que intenta actualizarlo
            if (proyecto.creador.toString() !== usuario.id) {
                throw new Error('No tienes las credenciales para actualizar este proyecto');
            }
            //Eliminar
            await Proyecto.findOneAndDelete({_id : id})
            return "Proyecto Eliminado"
        },
        nuevaTarea: async (_, { input }, ctx) => {
            try {
                const usuario = requireAuth(ctx);
                const tarea = new Tarea(input);
                //asociar la tarea al creador
                tarea.creador = usuario.id;
                const resultado = await tarea.save();
                return resultado;
            } catch (error) {
                if (error.message === 'No autenticado') {
                    throw error;
                }
                console.log(error);
                throw new Error('Error al crear la tarea');
            }
        },
        actualizarTarea: async (_, { id, input, estado }, ctx) => {
            const usuario = requireAuth(ctx);
            // Revisar si la tarea existe
            let tarea = await Tarea.findById(id);
            if (!tarea) {
                throw new Error('Tarea no encontrada');
            }
            // Revisar si el creador de la tarea es el mismo que intenta actualizarlo
            if (tarea.creador.toString() !== usuario.id) {
                throw new Error('No tienes las credenciales para actualizar esta tarea');
            }
            // Asignamos el estado
            input.estado = estado;
            // Actualizar la tarea
            tarea = await Tarea.findByIdAndUpdate(id, { ...input, estado }, { returnDocument: 'after' });
            return tarea;
        },
        eliminarTarea: async (_, { id }, ctx) => {
            const usuario = requireAuth(ctx);
            // Revisar si la tarea existe
            let tarea = await Tarea.findById(id);
            if (!tarea) {
                throw new Error('Tarea no encontrada');
            }
            // Revisar si el creador de la tarea es el mismo que intenta eliminarla
            if (tarea.creador.toString() !== usuario.id) {
                throw new Error('No tienes las credenciales para eliminar esta tarea');
            }
            // Eliminar la tarea
            await Tarea.findOneAndDelete({ _id: id });
            return "Tarea eliminada";
        }
    }
};

module.exports = resolvers;