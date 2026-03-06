const express = require('express');
const app = express();
const cors = require('cors');

app.use(cors()); // Allows your website to talk to this API

app.get('/api/config', (req, res) => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    // YOUR FORMULA: (Hours * 60 + Minutes) / 30, then take remainder and round
    // Note: To get a 0-9 index from a 30-minute cycle, we use modulo 10
    const totalMinutes = (hours * 60) + minutes;
    const rawValue = totalMinutes / 30;
    const imageIndex = Math.round(rawValue % 10); 

    // Generate the 3-minute schedule
    let schedule = [];
    for (let i = 0; i < 1440; i += 3) {
        let h = String(Math.floor(i / 60)).padStart(2, '0');
        let m = String(i % 60).padStart(2, '0');
        schedule.push(`${h}:${m}`);
    }

    res.json({
        serverTime: `${hours}:${minutes}`,
        imageIndex: imageIndex, // 0 to 9
        schedule: schedule
    });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`API running on port ${PORT}`));
