const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const { pool } = require('../../models/model.employees')
const uuid = require('uuid')
const dotenv = require("dotenv")
dotenv.config()


// register user
const register = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        res.status(400);
        throw new Error('Missing required field(s)');
    }

    const { rows: existingAdminRows } = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);

    if (existingAdminRows.length > 0) {
        res.status(400);
        throw new Error("User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const id = uuid.v4();
    const query = 'INSERT INTO admin(id,name,email,password) VALUES($1,$2,$3,$4) RETURNING id, name, email';
    const { rows: createdAdminRows } = await pool.query(query, [id, name, email, hashedPassword]);

    if (createdAdminRows.length > 0) {
        const createdAdmin = createdAdminRows[0];
        res.status(201).json({
            id: createdAdmin.id,
            name: createdAdmin.name,
            email: createdAdmin.email,
            token: signToken(createdAdmin.id)
        });
    }
});

//log user in
const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const { rows: admin } = await pool.query('SELECT * FROM admin WHERE email = $1', [email]);

    if (admin.length > 0 && (await bcrypt.compare(password, admin[0].password))) {
        res.status(200).json({
            id: admin[0].id,
            name: admin[0].name,
            email: admin[0].email,
            token: signToken(admin[0].id) // Use admin[0].id instead of rows[0].id
        });
    } else {
        res.status(400);
        throw new Error("Authentication failed");
    }
});


//get me

const getMe = asyncHandler(async(req,res) => {
    res.status(200).json(req.user)
})

const signToken = (id) => {
    return jwt.sign({id},process.env.JWT,{
        expiresIn:'30d'
    })
}

module.exports = {
    register,
    login,
    getMe
}