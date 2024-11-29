import express from 'express'
import userRouter from './routes/user.router.js'
import adminRouter from './routes/admin.router.js'
import cors from 'cors'

const app = express();
app.use(express.json())
app.use(cors())

app.use("/user",userRouter)
app.use("/admin",adminRouter)


app.listen(3001,()=>{
    console.log("server invoked at link http://localhost:3001")
});