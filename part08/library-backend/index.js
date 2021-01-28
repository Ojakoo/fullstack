const config = require('./config')
const mongoose = require('mongoose')
const { ApolloServer, gql, UserInputError } = require('apollo-server')

const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = config.MONGODB_URI

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    addAuthor(
      name: String!
      born: Int
    ): Author
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`

const resolvers = {
  Query: {
    bookCount: async () => Author.collection.countDocuments(),
    authorCount: async () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const author = await Author.findOne({ name: { $eq : args.author } })

      return Book
        .find({ 
          genres: !args.genre ? {$ne : null} : {$in : args.genre},
          author: !author ? {$ne : null} : {$in : author._id }
        })
        .populate('author', { name: 1, born: 1, bookCount: 1, id: 1 })
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: async (root) => {
      return Book.find({ author: { $eq : root._id }}).countDocuments()
    }
  },
  Mutation: {
    addBook: async (root, args) => {
      console.log("enter")
      try {
        let author = await Author.findOne({ name: { $eq : args.author }})

        if ( !author ) {
          author = new Author({ name: args.author })
          await author.save()
        } 

        const book = new Book({ ...args, author: author.id })
        const savedBook = await book
          .save()

        const returnBook = await Book
          .findById(savedBook.id)
          .populate('author', { name: 1, born: 1, bookCount: 1, id: 1 })

        return returnBook
      } catch (error) {
        throw new UserInputError(error.message, {
          ivalidArgs: args,
        })
      }
    },
    addAuthor: async (root, args) => {
      const author = new Author({ ...args })
      try {
        author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          ivalidArgs: args,
        })
      }
      return author
    },
    editAuthor: async (root, args) => {
      const author = await Author.findOne({ name: { $eq : args.name } })
      console.log(author)
      console.log(args)

      if (!author) {
        return null
      }

      const newAuthor = {
        name: author.name,
        born: args.setBornTo
      }

      const updatedAuthor = await Author
        .findByIdAndUpdate(author._id, newAuthor, { new: true })
      
      return updatedAuthor
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})