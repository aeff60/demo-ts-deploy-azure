
//โค้ดนี้เป็นแอปพลิเคชัน Express ที่เขียนด้วย TypeScript ที่มีการใช้ middleware ต่าง ๆ และกำหนดเส้นทาง (routes) ต่าง ๆ สำหรับ API ของเซิร์ฟเวอร์ ที่ให้บริการผู้ใช้แบบ mock โดยใช้ข้อมูลผู้ใช้ที่ถูกจำลองไว้.
import express, { Request, Response, NextFunction } from 'express';

const app = express();
const port = 3000;

// Middleware to log requests
//นี่คือ middleware ที่ถูกใช้ก่อนทุก request เพื่อบันทึกข้อมูลการร้องขอลง console พร้อมกับ timestamp, HTTP method และ URL.
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`[${new Date().toLocaleString()}] ${req.method} ${req.url}`);
  next();
});

// Middleware to parse JSON
//Middleware การแปลง JSON:
// Middleware นี้ใช้ Express JSON middleware เพื่อแปลง body ของ request ที่เป็น JSON เป็น object ในแบบ JavaScript.
app.use(express.json());

// Mocked user data
//ข้อมูลผู้ใช้ (Mocked user data):
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com' },
  { id: 2, name: 'Jane Doe', email: 'jane@example.com' },
  // Add more users as needed
];

// Route: Home
// เส้นทางหลักที่คืนข้อความ "Hello, this is your TypeScript API!"
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, this is your TypeScript API!');
});

// Route: API version
// เส้นทางที่คืน JSON ที่ระบุเวอร์ชัน API เป็น '1.0'
app.get('/api/version', (req: Request, res: Response) => {
  res.json({ version: '1.0' });
});

// Route: Echo request body
// เส้นทางที่คืน JSON ที่เป็นการ "echo" ข้อมูลที่ได้รับจาก request body
app.post('/api/echo', (req: Request, res: Response) => {
  const { body } = req;
  res.json({ echo: body });
});

// Route: Get all users
//  เส้นทางที่คืนข้อมูลผู้ใช้ทั้งหมดในรูปแบบ JSON
app.get('/api/users', (req: Request, res: Response) => {
  res.json(users);
});

// Route: Get user by ID
// เส้นทางที่คืนข้อมูลผู้ใช้ตาม ID ที่ระบุใน request parameters
app.get('/api/users/:id', (req: Request, res: Response) => {
  const userId = parseInt(req.params.id, 10);
  const user = users.find((u) => u.id === userId);

  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ error: 'User not found' });
  }
});

// Error handling middleware
// Middleware การจัดการข้อผิดพลาด
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// เริ่มเซิร์ฟเวอร์
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
