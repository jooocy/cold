export interface VerifyLinkUserUsecase {
  execute(linkId: number, userId: number): Promise<boolean>;
}

export const VerifyLinkUserUsecase = Symbol('VerifyLinkUserUsecase');