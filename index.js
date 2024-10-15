const express = require('express');
const figlet = require('figlet');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors()); // Allow requests from the frontend
app.use(express.json()); // Parse incoming JSON requests

// Available fonts in Figlet (extended with more options)
const availableFonts = [
  'Standard', 'Ghost', 'Banner', 'Block', 'Bubble', 'Digital', 'Lean',
  'Mini', 'Script', 'Shadow', 'Slant', 'Small', 'Star Wars', 'Big', 'Doom',
  '3-D', '3D Diagonal', '3D-ASCII', 'Acrobatic', 'Alligator', 'Alligator2',
  'Alphabet', 'Avatar', 'Barbwire', 'Basic', 'Bell', 'Big Chief', 'Big Money-ne',
  'Big Money-nw', 'Big Money-se', 'Big Money-sw', 'Bigfig', 'Bolger', 'Bright', 'Broadway KB',
  'Crawford', 'Dancing Font', 'Delta Corps Priest', 'DOS Rebel', 'Eftichess', 'Epic', 'Funky',
  'Isometric1', 'Isometric2', 'Isometric3', 'Isometric4', 'Ivrit', 'Kban', 'Larry 3D', 
  'Lcd', 'Lean', 'Lil Devil', 'Morse', 'Nipples', 'O8', 'Pawp', 'Rectangles', 
  'Rot13', 'Rozzo', 'Runic', 'Sans', 'Shimrod', 'Short', 'Speed', 'Stampate',
  'Stellar', 'Stop', 'Straight', 'Thin', 'Varsity', 'Weird'
];

// Route to generate ASCII art
app.post('/generate', (req, res) => {
  const { text, font, horizontalLayout, verticalLayout } = req.body;

  if (!text) {
    return res.status(400).json({ error: 'Text is required to generate ASCII art.' });
  }

  // Use figlet to generate ASCII art with the specified font and layout
  figlet.text(
    text,
    {
      font: font || 'Standard',
      horizontalLayout: horizontalLayout || 'default',
      verticalLayout: verticalLayout || 'default'
    },
    (err, asciiArt) => {
      if (err) {
        console.error('Error generating ASCII art:', err);
        return res.status(500).json({ error: 'Error generating ASCII art.' });
      }
      res.json({ ascii: asciiArt });
    }
  );
});

// Route to get available fonts
app.get('/fonts', (req, res) => {
  res.json({ fonts: availableFonts });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
