import { Password } from "../model/Password.js";
import { encrypt, decrypt } from "../utils/crypto.js";

export const getallPassword = async (req, res) => {
    try {
        // 1️⃣ Get all passwords of the logged-in user
        const passwords = await Password.find({ user: req.user });

        // 2️⃣ Har password ko decrypt karo
        const decryptedPasswords = passwords.map((item) => ({
            _id: item._id,
            site: item.site,
            username: item.username,
            password: decrypt(item.password),  // <-- decrypted password
        }));

        // 3️⃣ Send response
        res.json({
            message: "Password Fetched Successfully..",
            password: decryptedPasswords,
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching passwords", error });
    }
}


export const addPassword = async (req, res) => {
    try {
        const { site, username, password } = req.body;
        // console.log("req.user =", req.user);
        const encrypted = encrypt(password);
        const newPass = new Password({
            user: req.user,
            site,
            username,
            password: encrypted,
        })
        await newPass.save();
        res.json({ message: "Password Added Successfully..", newPass });
    }
    catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }

}

export const deletePassword = async (req, res) => {
    try {

        const pass = await Password.findByIdAndDelete(req.params.id);

        // Check if password existed
        if (!pass) {
            return res.status(404).json({
                message: "No password found with this ID",
                success: false
            });
        }

        res.json({
            message: "Password Deleted Successfully",
            success: true,
            pass
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error", success: false, error });
    }
};
