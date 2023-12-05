const express = require("express")
const app = express()
const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

app.use(express.json())

app.get("/", async (req, res) => {
  const allUsers = await prisma.user.findMany()
  res.json(allUsers)
})

app.post("/", async (req, res) => {
  const newUser = await prisma.user.create({ data: req.body })
  res.json(newUser)
})

app.get("/:id", async (req, res) => {
  const newUser = await prisma.user.findUnique({
    where: { id: req.params.id },
  })
  res.json(newUser)
})

app.put("/:id", async (req, res) => {
  const newAge = req.body.age
  const updatedUser = await prisma.user.update({
    where: { id: req.params.id },
    data: { age: newAge },
  })
  res.json(updatedUser)
})

app.delete("/:id", async (req, res) => {
  const updatedUser = await prisma.user.delete({
    where: { id: req.params.id },
  })
  res.json(updatedUser)
})

app.post("/house", async (req, res) => {
  const newHouse = await prisma.house.create({ data: req.body })
  res.json(newHouse)
})

app.get("/house", async (req, res) => {
  const allHouses = await prisma.house.findMany({
    include: {
      builtBy: true,
      owner: true,
    },
  })
  res.json(allHouses)
})

app.get("/house/:id", async (req, res) => {
  const singleHouse = await prisma.house.findUnique({
    where: { id: req.params.id },
    include: {
      builtBy: true,
      owner: true,
    },
  })
  res.json(singleHouse)
})

app.get("/house/filter", async (req, res) => {
  const filteredHouses = await prisma.house.findMany({
    where: {
      wifiPassword: {
        not: null,
      },
      owner: {
        age: {
          gte: 22,
        },
      },
    },
    orderBy: [
      {
        owner: {
          firstName: "desc",
        },
      },
    ],
    include: {
      owner: true,
      builtBy: true,
    },
  })
  return res.json(filteredHouses)
})

app.listen(3000, () => console.log(`Server is running on port ${3000}`))
