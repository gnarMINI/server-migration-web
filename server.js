// ✅ server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const taskRoutes = require('./routes/taskRoutes');

dotenv.config();
const app = express();

// 정적 파일 서빙
app.use('/assets', express.static(path.join(__dirname, 'assets')));
// 미들웨어 설정
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public'))); // 정적 파일 (HTML 등) 제공

// MongoDB 연결
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ MongoDB 연결 성공'))
    .catch(err => console.error('❌ MongoDB 연결 실패:', err));

// 라우팅 설정
app.use("/api/tasks", taskRoutes);

// 루트 접근 시 work.html 반환
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'work.html'));
});

// 서버 실행
const PORT = process.env.PORT || 5050;
app.listen(PORT, () => {
    console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
