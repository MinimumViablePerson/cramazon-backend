import { PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'

const prisma = new PrismaClient()

const app = express()
app.use(cors())
app.use(express.json())
const PORT = 4000

app.get('/users/:email', async (req, res) => {
  const email = req.params.email

  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      include: {
        orders: {
          // include: { item: true } // CAN'T USER BOTH AT THE SAME TIME!
          select: { item: true, quantity: true }
        }
      }
    })

    if (user) {
      res.send(user)
    } else {
      res.status(404).send({ error: 'User not found.' })
    }
  } catch (err) {
    // @ts-ignore
    res.status(400).send({ error: err.message })
  }
})

app.listen(PORT, () => {
  console.log(`Server up: http://localhost:${PORT}`)
})
