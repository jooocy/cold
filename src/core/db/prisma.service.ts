import {Injectable, Logger, type OnModuleDestroy, type OnModuleInit} from '@nestjs/common'
import {ConfigService} from '@nestjs/config'
import {type Prisma, PrismaClient} from '@prisma/client'

@Injectable()
export class PrismaService
  extends PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger: Logger = new Logger(PrismaService.name)

  readonly primary: PrismaClient<Prisma.PrismaClientOptions, Prisma.LogLevel>

  constructor(private readonly configService: ConfigService) {
    const primaryUrl: string = configService.getOrThrow<string>('DATABASE_URL')

    /**
     * use-case에서 명시적으로 primary와 replica로 나눠서 쿼리하는 경우,
     * replicaUrl이 없으면 primary로 연결되어야 장애가 발생하지 않음.
     */
    super({
      datasourceUrl: primaryUrl,
      log: [
        {level: 'query', emit: 'event'}, // 1
        {level: 'info', emit: 'event'}, // 2
        {level: 'warn', emit: 'event'}, // 3
        {level: 'error', emit: 'event'}, // 4
      ],
    })

    /** 명시적으로 primary를 사용하기 위해 this를 primary로 copy함 */
    this.primary = this

  }

  async onModuleInit() {
    const ENVIRONMENT: string = this.configService.getOrThrow('ENVIRONMENT')

    if (['local'].includes(ENVIRONMENT)) {
      this.primary.$on('query', (event: Prisma.QueryEvent) => {
        this.logger.verbose(
          `<Primary>
          <Query>: ${event.query}  
          <Duration>: ${event.duration}ms  
          <Params>: ${event.params}`
        )
      })
    }


      this.primary.$on('info', event => {
        this.logger.log(event)
      })

      this.primary.$on('warn', event => {
        this.logger.warn(event)
      })

      this.primary.$on('error', event => {
        this.logger.error(event)
      })
    

    if (ENVIRONMENT !== 'build') {
      await this.primary.$connect()
    }
  }

  async onModuleDestroy(): Promise<void> {
    await this.primary.$disconnect()
  }
}
