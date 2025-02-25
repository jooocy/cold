import { Controller, Get, Query } from "@nestjs/common";

@Controller('link')
export class LinkController {
  constructor() {}

  @Get()
  async getMyLink(@Query('id') id: string) {
    return ''
  }
}