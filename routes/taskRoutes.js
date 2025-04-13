// ✅ routes/taskRoutes.js
const express = require("express");
const router = express.Router();
const Task = require("../models/Task");

// 작업 등록
router.post("/", async (req, res) => {
    try {
        const newTask = new Task(req.body);
        await newTask.save();
        res.status(201).json({ message: "작업이 저장되었습니다!" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "서버 오류" });
    }
});

// 모든 작업 조회
router.get("/", async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.json(tasks);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "작업 조회 실패" });
    }
});

// 작업 수정
router.put("/:id", async (req, res) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTask);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "작업 수정 실패" });
    }
});

// 작업 삭제
router.delete("/:id", async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "작업 삭제 완료" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "작업 삭제 실패" });
    }
});

// 상태 업데이트
router.put("/:id/status", async (req, res) => {
    const { status } = req.body;
    try {
        const updated = await Task.findByIdAndUpdate(req.params.id, { status }, { new: true });
        if (!updated) return res.status(404).json({ error: "작업을 찾을 수 없습니다." });
        res.json({ message: "상태 업데이트 완료", task: updated });
    } catch (err) {
        console.error("상태 업데이트 오류:", err);
        res.status(500).json({ error: "서버 오류" });
    }
});

// 현재 위치 변경
router.put("/:id/location", async (req, res) => {
    try {
        const { currentLocation } = req.body;
        const updated = await Task.findByIdAndUpdate(req.params.id, { currentLocation }, { new: true });
        res.json(updated);
    } catch (err) {
        res.status(500).json({ error: "서버 오류" });
    }
});

// 체크박스 필드 단일 업데이트 (PATCH)
router.patch("/:id", async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ success: true, task });
    } catch (err) {
        res.status(400).json({ error: "업데이트 실패" });
    }
});

module.exports = router;
