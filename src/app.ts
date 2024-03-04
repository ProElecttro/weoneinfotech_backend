import "reflect-metadata"

import express from "express"
import cors from "cors"

import AppDataSource from "./config"

import authRoutes from "./auth/router"
import productRoutes from "./product/router"
import adminRoutes from "./admin/router"

const app = express()
app.use(express.json())

app.use(
    cors({
        origin: '*'
    })
)


app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/product", productRoutes)
app.use("/api/v1/admin", adminRoutes)

const port = 3002

AppDataSource.initialize().then(() => {
    console.log('Database connected successfully')
    app.listen(port, () => {
        console.log(`running on port ${port}`)
    })
}).catch((err) => {
    console.log(`Error`, err)
})
