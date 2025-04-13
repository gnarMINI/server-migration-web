// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const Task = require('./models/Task');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// 정적 파일 제공 (work.html 포함)
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB 연결 성공'))
    .catch(err => console.error('❌ MongoDB 연결 실패:', err));

// POST 요청 - 작업 등록
app.post("/api/tasks", async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json({ message: "작업이 저장되었습니다!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "서버 오류" });
    }
});

// GET / -> public/work.html 열기
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'work.html'));
});

// GET 요청 - 모든 작업 조회
app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 }); // 최신순
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "작업 조회 실패" });
    }
});

// 작업 수정
app.put("/api/tasks/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "작업 수정 실패" });
    }
});

// 작업 삭제
app.delete("/api/tasks/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "작업 삭제 완료" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "작업 삭제 실패" });
    }
});



// 서버 실행
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`🚀 서버 실행 중: http://localhost:${PORT}`));
