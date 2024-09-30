import mongoose from 'mongoose'
import config from './app/config'
import app from './app'

function main() {
  try {
    mongoose
      .connect(config.Database_Url as string)
      .then(() => {
        console.log('Database Connected...')
      })
      .catch(err => console.log(err))

    app.listen(config.Port, () => {
      console.log(`server listening port on ${config.Port}...`)
    })
  } catch (error) {
    console.log(error)
  }
}

main()
