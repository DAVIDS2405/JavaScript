import {Router} from 'express'
import verificarAutenticacion from '../middlewares/autenticacion.js'
import {
    login,
    perfil,
    registro,
    confirmEmail,
    listarVeterinarios,
    detalleVeterinario,
    actualizarPerfil,
    actualizarPassword,
    recuperarPassword,
    comprobarTokenPasword,
    nuevoPassword,
} from "../controllers/veterinario_controller.js";


const router = Router()
/**
 * @openapi
 * /api/login:
 *   post:
 *     tags:
 *       - Login y Registro Veterinarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: test123@hotmail.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     usuario:
 *                       type: object
 *                       properties:
 *                         nombre:
 *                           type: string
 *                           example: Usuario Ejemplo
 *                         email:
 *                           type: string
 *                           example: test123@hotmail.com
 */

router.post('/login',login)
/**
 * @openapi
 * /api/registro:
 *   post:
 *     tags:
 *       - Login y Registro Veterinarios
 *     summary: Registro de nuevo usuario
 *     description: Crea un nuevo usuario con correo electrónico y contraseña.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: julio@hotmail.com
 *               password:
 *                 type: string
 *                 example: contraseña
 *               token:
 *                 type: string
 *                 example: 4FYSTYaaA1564
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object 
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Usuario registrado exitosamente.
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: julio@hotmail.com
 *                         token:
 *                           type: string
 *                           example: 4FYSTYaaA1564
 */

router.post('/registro',registro)
/**
 * @openapi
 * /api/confirmar/:token:
 *   post:
 *     tags:
 *       - Login y Registro Veterinarios
 *     parameters:
 *      - name: token
 *        in: path
 *        description: Token de confirmación de email
 *        required: true
 *        schema:
 *          type: string
 *     summary: Registro de nuevo usuario
 *     description: Crea un nuevo usuario con correo electrónico y contraseña.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object 
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Usuario confirmado exitosamente.
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: julio@hotmail.com
 *                         token:
 *                           type: string
 *                           example: 4FYSTYaaA1564
 */
router.get('/confirmar/:token',confirmEmail)

/**
 * @openapi
 * /api/veterinarios:
 *   get:
 *     tags:
 *       - Veterinarios
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object 
 *                   properties:
 *                     message:
 *                       type: string
 *                       example: Usuarios.
 *                     user:
 *                       type: object
 *                       properties:
 *                         email:
 *                           type: string
 *                           example: julio@hotmail.com
 *                         nombre:
 *                           type: string
 *                           example: Julio
 *                         apellido:
 *                           type: string
 *                           example: Ríos
 *                         id:
 *                           type: string
 *                           example: s45l5oi10A
 */

router.get('/veterinarios',listarVeterinarios)

/**
 * @openapi
 * /api/recuperar-password:
 *   post:
 *     tags:
 *       - Recuperar Contraseña Veterinarios
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *                 example: julio@hotmail.com
 *               token:
 *                 type: string
 *                 example: 4FYSTYaaA1564
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message: 
 *                   type: string
 *                   example: Contraseña recuperada exitosamente
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

router.post('/recuperar-password',recuperarPassword)

/**
 * @openapi
 * /api/recuperar-password/:token:
 *   get:
 *     tags:
 *       - Recuperar Contraseña Veterinarios
 *     parameters:
 *      - name: token
 *        in: path
 *        description: Token de confirmación de recuperación de contraseña
 *        required: true
 *        schema:
 *          type: string
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Token validado exitosamente.
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

router.get('/recuperar-password/:token',comprobarTokenPasword)

/**
 * @openapi
 * /api/nuevo-password/:token:
 *   post:
 *     tags:
 *       - Nueva Contraseña Veterinarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               password:
 *                 type: string
 *                 example: contraseña
 *               confirm-password:
 *                 type: string
 *                 example: contraseña
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Ya puede iniciar sesión.
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

router.post('/nuevo-password/:token',nuevoPassword)

/**
 * @openapi
 * /api/perfil:
 *   get:
 *     summary: Obtener perfil del veterinario autenticado
 *     tags:
 *       - Veterinarios
 *     responses:
 *       200:
 *         description: Perfil del veterinario obtenido exitosamente.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: array 
 *                   items: 
 *                     type: object
 */

router.get('/perfil',verificarAutenticacion,perfil)

/**
 * @openapi
 * /api/veterinario/actualizarpassword:
 *   put:
 *     tags:
 *       - Veterinarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               old_password:
 *                 type: string
 *                 example: 4FYSTYaaA1564
 *               new_password:
 *                 type: string
 *                 example: 4FYSTYaaA1564
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Contraseña actualizada exitosamente.
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     result:
 *                       type: string
 *                       example: Password updated successfully.
 */


router.put('/veterinario/actualizarpassword',verificarAutenticacion,actualizarPassword)

/**
 * @openapi
 * /api/veterinario/{id}:
 *   get:
 *     tags:
 *       - Veterinarios
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del veterinario a obtener.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     veterinarian:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                           example: Juan Pérez
 *                         email:
 *                           type: string
 *                           example: juan@example.com
 */

router.get('/veterinario/:id',verificarAutenticacion,detalleVeterinario)
/**
 * @openapi
 * /api/veterinario/{id}:
 *   put:
 *     tags:
 *       - Veterinarios
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Julio
 *               apellido:
 *                 type: string
 *                 example: Ríos
 *               direccion:
 *                 type: string
 *                 example: Enrique Segoviano
 *               telefono:
 *                 type: string
 *                 example: 0056163585
 *               email:
 *                 type: string
 *                 example: julio@hotmail.com
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del veterinario a actualizar.
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Perfil actualizado exitosamente.
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *                   properties:
 *                     veterinarian:
 *                       type: object
 *                       properties:
 *                         nombre:
 *                           type: string
 *                           example: Julio
 *                         apellido:
 *                           type: string
 *                           example: Ríos
 *                         direccion:
 *                           type: string
 *                           example: Enrique Segoviano
 *                         telefono:
 *                           type: string
 *                           example: 0056163585
 *                         email:
 *                           type: string
 *                           example: julio@hotmail.com
 */



router.put('/veterinario/:id',verificarAutenticacion,actualizarPerfil)



export default router




