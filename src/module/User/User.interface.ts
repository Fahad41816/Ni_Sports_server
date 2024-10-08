export interface TUser {
  name: string
  email: string
  password: string
  phone: string
  role: 'admin' | 'user'
  address: string
}

export interface LogicUser {
  email: string
  password: string
}
