import { Controller, Get, Param, Query } from "@nestjs/common";

const DUMMY_LINK_USER = {
  id: 1,
  email: 'john.doe@example.com',
  createdAt: new Date(),
  phone: '+1234567890',
  profileImageUrl: 'https://example.com/profile.jpg',
  role: 'admin',
  nickname: 'John',
}

const DUMMY_LINK_USER_2 = {
  id: 2,
  email: 'jane.doe@example.com',
  createdAt: new Date(),
  phone: '+1234567890',
  profileImageUrl: 'https://example.com/profile.jpg',
  role: 'admin',
  nickname: 'John 2',
}

const DUMMY_LINK_USER_3 = {
  id: 3,
  email: 'jane.doe@example.com',
  createdAt: new Date(),
  phone: '+1234567890',
  profileImageUrl: 'https://example.com/profile.jpg',
  role: 'admin',
  nickname: 'John 3',
}

@Controller('link-users')
export class LinkUsersController {
  constructor() {}

  @Get('me')
  async getMyLinkUser(@Query('id') id: string) {
    return DUMMY_LINK_USER
  }

  @Get(':id')
  async getMyLinkUsers(@Param('id') id: string) {
    return {
      data: [DUMMY_LINK_USER_2, DUMMY_LINK_USER_3],
      total: 2,
    }
  }
}