/* eslint-disable no-undef */
const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {

  const password = process.argv[2]

  const url =
    `mongodb+srv://fullstack:${password}@cluster0.qyd30.mongodb.net/person-app?retryWrites=true`

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
    mongoose.connection.close()
  })

} else if (process.argv.length === 5) {
  const password = process.argv[2]

  const url =
    `mongodb+srv://fullstack:${password}@cluster0.qyd30.mongodb.net/person-app?retryWrites=true`

  mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

  const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
  })

  person.save().then(response => {
    console.log(`added ${process.argv[3]} number ${process.argv[4]} to phonebook`)
    mongoose.connection.close()
  })

} else {
  console.log('no supported functions')
  process.exit(1)
}







