import ExpressServer from './expressServer'

const port = parseInt(process.env.PORT ?? '3000')

const starter = new ExpressServer()
  .start(port)
  .then((port) => {
    console.log(`Running on port ${port}`)
  })
  .catch((error) => {
    console.log(error)
  })

export default starter
