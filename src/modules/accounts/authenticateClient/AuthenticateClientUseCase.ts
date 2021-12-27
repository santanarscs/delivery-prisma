import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateClient {
  username: string;
  password: string;
}
export class AuthenticateClientUseCase {
  async execute({ username, password }: IAuthenticateClient) {
    const client = await prisma.clients.findFirst({
      where: { username }
    })
    if (!client) {
      throw new Error('Client or password invalid')
    }
    const passwordMath = await compare(password, client.password)
    
    if (!passwordMath) {
      throw new Error('Client or password invalid')
    }

  const token = sign({username}, 'md5-generator', {
    subject: client.id,
    expiresIn: "1d"
  })
    return token
    
  }
}