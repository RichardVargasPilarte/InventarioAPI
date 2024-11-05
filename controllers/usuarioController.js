export const crearUsuario = async (req, res, next) => {
    try {
        const { nombre, username, email, password, ...data } = req.body;

        if (await verificarExistencia('nombre', nombre, prisma)) {
            return res.status(400).json({ message: 'El nombre ya está registrado.' });
        }

        if (await verificarExistencia('username', username, prisma)) {
            return res.status(400).json({ message: 'El nombre de usuario ya está registrado.' });
        }

        if (await verificarExistencia('email', email, prisma)) {
            return res.status(400).json({ message: 'El correo electrónico ya está registrado.' });
        }

        // Encriptar la contraseña antes de crear el usuario
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(password, salt);

        const usuario = await usuarioClient.create({
            data: {
                nombre,
                username,
                email,
                password: hashedPassword,
                ...data
            }
        })

        const token = await generarJWT(usuario.id);

        res.status(201).json({
            data: transformToUid(usuario), // Cambiar id a uid
            token
        });
    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(error);
    }
}


export const obtenerUsuarioId = async (req, res, next) => {
    try {
        const usuarioId = req.params.id;

        if (!isUUID(usuarioId)) {
            return res.status(400).send({ message: 'ID inválido' });
        }

        const usuario = await usuarioClient.findUnique({
            where: {
                id: usuarioId
            },
        });

        if (!usuario) {
            res.status(404).send({ message: 'El usuario no existe' });
        } else {
            res.status(200).json({ data: transformToUid(usuario) });
        }

    } catch (error) {
        res.status(500).send({
            message: 'Ocurrió un error'
        });
        next(error);
    }
}