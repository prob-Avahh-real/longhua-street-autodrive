const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json());

// 车辆数据（内存存储，演示用）
let cars = [];
let carId = 1;

// 龙华街道地点（推广用）
const LONGHUA_PLACES = {
  "龙华公园": { lng: 114.085, lat: 22.698 },
  "龙华天虹": { lng: 114.082, lat: 22.695 },
  "龙华人民医院": { lng: 114.090, lat: 22.701 },
  "壹方天地": { lng: 114.078, lat: 22.692 },
  "龙华文化广场": { lng: 114.088, lat: 22.690 }
};

// 创建车辆
app.post('/api/car/create', (req, res) => {
  const { role, start, target } = req.body;
  const startPos = LONGHUA_PLACES[start];
  const targetPos = LONGHUA_PLACES[target];

  if (!startPos || !targetPos) {
    return res.json({ code: -1, msg: "地点错误" });
  }

  const car = {
    id: carId++,
    role,
    lng: startPos.lng,
    lat: startPos.lat,
    targetLng: targetPos.lng,
    targetLat: targetPos.lat,
    targetName: target
  };

  cars.push(car);
  res.json({ code: 0, data: car });
});

// 获取所有车辆
app.get('/api/car/list', (req, res) => {
  res.json({ code: 0, data: cars });
});

// 获取地点列表
app.get('/api/places', (req, res) => {
  res.json({ code: 0, data: LONGHUA_PLACES });
});

// 启动服务
app.listen(3000, () => {
  console.log("=====================================");
  console.log("✅ 后端启动成功：http://localhost:3000");
  console.log("✅ 前端打开 index.html 即可调试");
  console.log("=====================================");
});

