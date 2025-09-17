import userModel from "../model/userModel.js";
import {comparePassword} from "../helper/authHelper.js";
import JWT from "jsonwebtoken";

export const loginController = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(404).send({
                success: false,
            });
        }

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).send({
                success: false,
                message: "Utilisateur non trouvé",
            });
        }


        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).send({
                success: false,
                message: "email ou mot de passe incorrect",
            });
        }

        const token = JWT.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET,
            { expiresIn: "3600s" }
        );

        res.status(200).send({
            success: true,
            message: "Connexion réussie",
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
            },
        });
    } catch (err) {
        console.log(err);
        res.status(500).send({
            success: false,
            message: "Erreur",
            err,
        });
    }
};