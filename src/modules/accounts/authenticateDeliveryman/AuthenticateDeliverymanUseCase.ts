import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { prisma } from "../../../database/prismaClient";

interface IAuthenticateDeliveryman {
  username: string;
  password: string;
}
export class AuthenticateDeliverymanUseCase {
  async execute({ username, password }: IAuthenticateDeliveryman) {
    const deliveryman = await prisma.deliveryman.findFirst({
      where: { username }
    })
    if (!deliveryman) {
      throw new Error('Deliveryman or password invalid')
    }
    const passwordMath = await compare(password, deliveryman.password)
    
    if (!passwordMath) {
      throw new Error('Deliveryman or password invalid')
    }

  const token = sign({username}, 'md5-generator-deliveryman', {
    subject: deliveryman.id,
    expiresIn: "1d"
  })
    return token
    
  }
}