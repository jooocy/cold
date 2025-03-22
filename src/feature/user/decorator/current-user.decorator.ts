import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Role } from "src/common/interface/interfaces/role";

export const CurrentUser = createParamDecorator((_data: unknown, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest()
  return request.user
})

export interface CurrentUser {
  id: number
  email: string
  role: Role
}
