import { Request, RequestHandler, Response } from 'express'
import { UserService } from './User.service'
import CatchAsync from '../../utils/CatchAsync'

// create user in db proccess
const CreateUser: RequestHandler = CatchAsync(
  async (req: Request, res: Response) => {
    const UserData = req.body

    UserData.role = 'user'

    const UserResult = await UserService.createUserInToDb(UserData)

    res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User registered successfully',
      data: UserResult,
    })
  },
)


const CreateAdmin = CatchAsync((req, res)=>{

  const Data = req.body

  Data.role = 'admin'

  const Result = UserService.CreateadminIntoDb(Data)

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'Admin Create Successfully',
    data: Result,
  })

})

const loginUser = CatchAsync(async (req, res) => {
  const Userinfo = req.body

  const UserData = await UserService.LoginUserInDb(Userinfo)

  res.status(200).json({
    success: true,
    statusCode: 200,
    message: 'User Login successfully',
    data: UserData.AccessToken,
  })
})


const GetUser = CatchAsync(async(req, res) => {

    const UserId = req.params.id
    
    const Result  = await UserService.GetUserIntoDb(UserId)

    if(!Result){
      return res.status(200).json({
        success: false,
        statusCode: 400,
        message: 'No User Found',
        data: Result,
      })
    }

    return res.status(200).json({
      success: true,
      statusCode: 200,
      message: 'User retrive successfully!',
      data: Result,
    })

})

export const UserController = {
  CreateUser,
  loginUser,
  GetUser,
  CreateAdmin
}
