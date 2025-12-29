require('dotenv').config(); // 读取 .env 文件
const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors()); // 允许前端跨域调用
app.use(express.json());

const API_KEY = process.env.DEEPSEEK_API_KEY; // 从环境变量获取 Key

// 定义一个接口供前端调用
app.post('/api/chat', async (req, res) => {
    try {
        const response = await axios.post(
            'https://api.deepseek.com/chat/completions',
            req.body, // 直接转发前端的参数
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${API_KEY}` // 在后端注入 Key
                }
            }
        );
        res.json(response.data);
    } catch (error) {
        console.error('API Error:', error.response ? error.response.data : error.message);
        res.status(500).json({ error: '服务器请求 DeepSeek 失败' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});