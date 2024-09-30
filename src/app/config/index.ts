import dotenv from 'dotenv'

dotenv.config()

export default {
  Port: process.env.PORT,
  Database_Url: process.env.DATABASE_URL,
  saltRounds: process.env.saltRoundsL,
  JWTSecret: process.env.JWTSecret,
}
