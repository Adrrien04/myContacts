import { hashPassword } from "../helper/authHelper.js";
import userModel from "../model/userModel.js";

export const authController = async (req, res) => {
    try {
        const { email, password, name } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({
                success: false,
                message: "Les champs n'ont pas été correctement remplis"
            });
        }

        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(409).send({
                success: false,
                message: 'Compte déjà existant',
            });
        }

        const hashedPassword = await hashPassword(password);
        const user = await new userModel({ name, email, password: hashedPassword }).save();

        res.status(201).send({
            success: true,
            message: 'Inscription réussie',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });

    } catch (err) {
        console.error(err);
        res.status(500).send({
            success: false,
            message: 'Erreur',
            err: err.message,
        });
    }
};
