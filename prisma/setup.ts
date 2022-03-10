import { Prisma, PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const items: Prisma.ItemCreateInput[] = [
  {
    image: 'socks.jpg',
    title: 'Socks',
    price: 1.99
  },
  {
    image: 'flatcap.jpg',
    title: 'Flat Cap',
    price: 5.99
  },
  {
    image: 'glasses.jpg',
    title: 'Glasses',
    price: 3.99
  }
]

const users: Prisma.UserCreateInput[] = [
  {
    email: 'nicolas@email.com',
    name: 'Nicolas',
    orders: {
      create: [
        { item: { connect: { title: 'Socks' } }, quantity: 100 },
        { item: { connect: { title: 'Flat Cap' } }, quantity: 7 },
        { item: { connect: { title: 'Glasses' } }, quantity: 2 }
      ]
    }
  },
  {
    email: 'ed@email.com',
    name: 'Ed',
    orders: {
      create: [
        {
          item: {
            connectOrCreate: {
              where: { title: 'Cat Ears' },
              create: { image: 'catears.jpg', title: 'Cat Ears', price: 2.99 }
            }
          },
          quantity: 69
        }
      ]
    }
  },
  {
    email: 'artiola@email.com',
    name: 'Artiola'
  }
]

async function createStuff () {
  for (const item of items) {
    await prisma.item.create({ data: item })
  }

  for (const user of users) {
    await prisma.user.create({ data: user })
  }
}

createStuff()
