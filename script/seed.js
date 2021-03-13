'use strict'

const db = require('../server/db')
const faker = require('faker')
const {User, Place, Category} = require('../server/db/models')

async function seed() {
  await db.sync({force: true})
  console.log('db synced!')

  //seed sample user
  await Promise.all([User.create({email: 'cody@email.com', password: '123'})])
  console.log(`seeded sample user!`)

  //bulk create users
  function generateUsers(num) {
    let users = []
    for (let i = 0; i < num; i++) {
      users.push({
        email: faker.internet.email(),
        password: faker.internet.password()
      })
    }
    return users
  }

  //bulk create users in database
  const users = await User.bulkCreate(generateUsers(5))
  console.log('Seeded Users')

  //create categories
  await Category.create({category: 'Restaurant'})
  await Category.create({category: 'Cafe'})
  await Category.create({category: 'Bar'})

  //seed places
  const placesArr = [
    {
      name: 'Bouley',
      address: 'Bouley, 75 Wall St, New York, NY',
      phone: '123-456-7890',
      location: [-74.01394, 40.705137],
      rating: 4,
      note: 'Carbonara was the best!',
      tag: ['french'],
      categoryId: 1,
      userId: 1
    },
    {
      name: 'Marc Forgione',
      address: 'Marc Forgione, 134 Reade St, New York, NY',
      phone: '123-456-7890',
      location: [-74.009567, 40.716526],
      rating: 4,
      note: 'Friendly ambience, would like to come with family',
      tag: ['seafood'],
      categoryId: 1,
      userId: 1
    },
    {
      name: 'Tamarind',
      address: 'Tamarind, 99 Hudson St, New York, NY',
      phone: '123-456-7890',
      location: [-74.008929, 40.718977],
      rating: 3,
      note: 'Not bad; good when you are craving Indian cuisine',
      tag: ['friendly', 'indian'],
      categoryId: 1,
      userId: 1
    },
    {
      name: 'Hop Lee Restaurant',
      address: 'Hop Lee Restaurant, 16 Mott St, New York, NY',
      phone: '123-456-7890',
      location: [-73.998509, 40.71423],
      rating: 3,
      note: 'Love the chili shrimp!',
      tag: ['quick bites'],
      categoryId: 1,
      userId: 2
    },
    {
      name: 'Jungsik',
      address: 'Jungsik, 2 Harrison St, New York, NY',
      phone: '123-456-7890',
      location: [-74.0089, 40.718679],
      rating: 5,
      note: 'Must come for kimchi pancakes :)',
      tag: ['korean', 'friendly'],
      categoryId: 1,
      userId: 2
    },
    {
      name: 'The Capital Grille',
      address: 'The Capital Grille, 120 Broadway, New York, NY',
      phone: '123-456-7890',
      location: [-74.010846, 40.708475],
      rating: 5,
      note: 'Very juicy steak! Kind of pricey',
      tag: ['steak', 'fancy', 'american'],
      categoryId: 1,
      userId: 2
    },
    {
      name: 'Pylos',
      address: 'Pylos, 128 E 7th St, New York, NY',
      phone: '123-456-7890',
      location: [-73.984152, 40.726096],
      rating: 3,
      note: 'Huge serving; greek salad was really good',
      tag: ['greek', 'quick bites'],
      categoryId: 1,
      userId: 3
    },
    {
      name: "Joe's Shanghai",
      address: `Joe's Shanghai, 9 Pell St, New York, NY`,
      phone: '123-456-7890',
      location: [-73.997761, 40.714601],
      rating: 5,
      note: 'Dim sum is a must have!!! Long wait, but worth it',
      tag: ['chinese', 'quick bites'],
      categoryId: 1,
      userId: 3
    },
    {
      name: 'Cafe Katja',
      address: 'Cafe Katja, 79 Orchard St, New York, NY',
      phone: '123-456-7890',
      location: [-73.990565, 40.717719],
      rating: 3,
      notes: 'Great pastries, comfy chairs',
      tag: ['study', 'comfy'],
      categoryId: 2,
      userId: 3
    },
    {
      name: 'Rosanjin',
      address: 'Rosanjin, 141 Duane St, New York',
      phone: '123-456-7890',
      location: [-74.007724, 40.716403],
      rating: 4,
      notes: 'Good Japanese food and drinks! Go for sake',
      tag: ['drinks', 'comfy', 'healthy'],
      categoryId: 3,
      userId: 4
    },
    {
      name: 'Kittichai',
      address: 'Kittichai, 60 Thompson St, New York, NY',
      phone: '123-456-7890',
      location: [-74.003242, 40.724014],
      rating: 5,
      notes: 'Loved every single dish! Go with friends!',
      tag: ['thai', 'quick bites'],
      categoryId: 1,
      userId: 4
    },
    {
      name: 'Bianca',
      address: 'Bianca, 5 Bleecker St, New York, NY',
      phone: '123-456-7890',
      location: [-73.992662, 40.725495],
      rating: 3,
      notes: 'Get the orange cocktail!!!',
      tag: ['drinks', 'friends'],
      categoryId: 3,
      userId: 4
    },
    {
      name: 'Rayuela',
      address: 'Rayuela, 165 Allen St, New York, NY',
      phone: '123-456-7890',
      location: [-73.989756, 40.721266],
      rating: 5,
      notes: 'Will def go again for the paella; good for large groups',
      tag: ['friends', 'friendly', 'spanish'],
      categoryId: 1,
      userId: 5
    },
    {
      name: 'Mas Farmhouse',
      address: 'Mas Farmhouse, 39 Downing St, New York, NY',
      phone: '123-456-7890',
      location: [-74.003875, 40.729269],
      rating: 5,
      notes: 'Healthy snacks!!! Good coffee!!',
      tag: ['comfy', 'coffee', 'healthy'],
      categoryId: 2,
      userId: 5
    },
    {
      name: 'Lychee',
      address: 'Lychee, 86 Mulberry St, New York, NY',
      phone: '123-456-7890',
      location: [-73.998626, 40.716544],
      rating: 4,
      notes: 'Tried 3 different cocktails, all were great!',
      tag: ['cocktails', 'friends'],
      categoryId: 3,
      userId: 5
    }
  ]

  //bulk create places
  await Place.bulkCreate(placesArr)
  console.log('Seeded places!')
}

// We've separated the `seed` function from the `runSeed` function.
// This way we can isolate the error handling and exit trapping.
// The `seed` function is concerned only with modifying the database.
async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`).
// `Async` functions always return a promise, so we can use `catch` to handle
// any errors that might occur inside of `seed`.
if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
