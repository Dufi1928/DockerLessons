import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const { email, password, firstName, lastName } = req.body;
            const pseudo = firstName + email;
            const response = await axios.post('http://localhost:8080/api/auth/register', {
                email, pseudo, password, firstName, lastName
            });

            res.status(200).json({ jwtToken: response.data.jwt });
        } catch (error) {
            if (error.response) {
                res.status(error.response.status).json({ message: error.response.data.error });
            } else {
                res.status(500).json({ message: error.message });
            }
        }
    } else {
        res.setHeader('Allow', 'POST');
        res.status(405).end('Méthode non autorisée');
    }
}