/* eslint-disable no-unused-vars */
declare namespace Express {
  export interface Request {
    auth: {
      userId: string
    }
  }
}
