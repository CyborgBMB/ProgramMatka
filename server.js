const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json()); // Obsługa JSON w żądaniach

// Połączenie z MongoDB
mongoose.connect('mongodb+srv://<username>:<password>@cluster0.mongodb.net/parking', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// Schemat użytkownika
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
});

const User = mongoose.model('User', UserSchema);

// Rejestracja użytkownika
app.post('/register', async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('Użytkownik zarejestrowany!');
});

// Logowanie użytkownika
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
        return res.status(400).send('Użytkownik nie znaleziony');
    }
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
        return res.status(400).send('Nieprawidłowe hasło');
    }
    const token = jwt.sign({ id: user._id }, 'sekretny_klucz', { expiresIn: '1h' });
    res.json({ token });
});

// Ochrona endpointów (middleware JWT)
function authMiddleware(req, res, next) {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send('Brak tokenu');
    jwt.verify(token, 'sekretny_klucz', (err, user) => {
        if (err) return res.status(403).send('Błędny token');
        req.user = user;
        next();
    });
}

// Przykładowy endpoint chroniony logowaniem
app.get('/secure', authMiddleware, (req, res) => {
    res.send(`Witaj, użytkowniku ${req.user.id}`);
});

app.listen(3000, () => {
    console.log('Serwer działa na porcie 3000');
});

