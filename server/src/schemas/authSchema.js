const {z} = require('zod');

const loginSchema = z.object({
    username: z.string().min(5).max(20),
    password: z.string().min(6).max(20),
});

const registerSchema = z.object({
    username: z.string().min(5).max(20),
    email: z.string().email(),
    password: z.string().min(6).max(20),
    avatar: z.string(),
    gender: z.string(),
})

module.exports = { loginSchema, registerSchema }