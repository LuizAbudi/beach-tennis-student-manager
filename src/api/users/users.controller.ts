import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Request,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UserProfileSchema } from 'src/schemas/users/users.schemas';
import { ApiOperation, ApiResponse, ApiTags, ApiOAuth2 } from '@nestjs/swagger';
import { UpdateStatusDto } from './dto/update-user.dto';

@ApiOAuth2([], 'Authentication')
@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @ApiResponse({ status: 200, type: UserProfileSchema })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  @ApiOperation({ summary: 'Get User Me' })
  getProfile(@Request() req) {
    return this.usersService.findById(req.user.id);
  }

  @Get('all')
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [UserProfileSchema] })
  @ApiResponse({ status: 404, description: 'Users not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  findAll(): Promise<UserProfileSchema[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get single user' })
  @ApiResponse({ status: 200, type: UserProfileSchema })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  findOne(@Param('id') id: number): Promise<UserProfileSchema> {
    return this.usersService.findById(id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete User' })
  @ApiResponse({ status: 200, description: 'User Deletion Success' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  deleteUser(
    @Param('id') id: number,
    @Request() req,
  ): Promise<{ message: string }> {
    const requestUserId = req.user.id;
    return this.usersService.deleteUser(id, requestUserId);
  }

  @Put('update-status')
  @ApiOperation({ summary: 'Update User Status' })
  @ApiResponse({ status: 200, description: 'User Status Updated' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @ApiResponse({ status: 401, description: 'Access Forbidden' })
  updateStatus(
    @Body() updateStatusDto: UpdateStatusDto,
  ): Promise<{ message: string }> {
    return this.usersService.updateStatus(
      updateStatusDto.id,
      updateStatusDto.status,
    );
  }
}
