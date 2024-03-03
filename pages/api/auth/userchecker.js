import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email } = req.body;
            const passkey = process.env.DJANGO_SECRET_KEY

            const response = await axios.post('http://194.163.142.148:8080/api/auth/checkIfUserExist', {
                email,
                passkey
            });
            res.status(200);
        } catch (error) {
            res.status(400).json({ message: error });
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Method not allowed');
    }
}