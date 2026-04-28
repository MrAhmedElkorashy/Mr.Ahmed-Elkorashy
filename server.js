const express = require('express');
const app = express();
app.use(express.json());

// 1. GENERATE STUDENT ID ON SIGNUP
app.post('/api/register', async (req, res) => {
    const { name, type, stage } = req.body;
    const historyId = `AK-${Math.floor(1000 + Math.random() * 9000)}`;
    // Save to DB here...
    res.json({ message: "Welcome to the Dynasty!", historyId });
});

// 2. STAFF ACTIVATION & PARENT SMS
app.post('/api/staff/activate', async (req, res) => {
    const { studentHistoryId, lectureId } = req.body;
    
    // Logic: Find student by ID, set is_activated = true
    // Logic: Trigger SMS via SMS Misr API
    const smsText = `Mr. Ahmed Elkorashy: Your student has attended the History lecture.`;
    // await axios.post('SMS_MISR_URL', { to: parentPhone, message: smsText });
    
    res.json({ success: true, message: "Attendance Marked." });
});

// 3. SECURE WATCH LOGIC (The Gatekeeper)
app.get('/api/video/stream/:lectureId', async (req, res) => {
    const user = req.user; // From Auth Middleware
    const { lectureId } = req.params;

    const access = await db.query('SELECT * FROM student_access WHERE student_id=$1 AND lecture_id=$2', [user.id, lectureId]);

    if (user.student_type === 'online') {
        return res.json({ videoUrl: "UNLIMITED_LINK" });
    } 
    
    if (user.student_type === 'center' && access.is_activated && access.watch_count < 3) {
        // Increment watch count
        await db.query('UPDATE student_access SET watch_count = watch_count + 1 WHERE id=$1', [access.id]);
        return res.json({ videoUrl: "SECURE_LINK" });
    }

    res.status(403).json({ error: "Access Denied. Check payment or watch limit." });
});