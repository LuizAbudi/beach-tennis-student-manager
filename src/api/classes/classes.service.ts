import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Class } from 'src/entities/class/classes.entity';
import { Repository } from 'typeorm';
import { CreateClassDto } from './dto/create-classes.dto';

@Injectable()
export class ClassesService {
  constructor(
    @InjectRepository(Class)
    private readonly classRepository: Repository<Class>,
  ) {}

  async getClasses(): Promise<Class[]> {
    return this.classRepository.find();
  }

  async getClassById(classId: number): Promise<Class> {
    return this.classRepository.findOneBy({ id: classId });
  }

  async createClass(createClassDto: CreateClassDto): Promise<Class> {
    return this.classRepository.save(createClassDto);
  }

  async updateClass(
    classId: number,
    updateClassDto: CreateClassDto,
  ): Promise<Class> {
    const classToUpdate = await this.classRepository.findOneBy({ id: classId });
    if (!classToUpdate) {
      throw new NotFoundException(`Class with id ${classId} not found`);
    }
    return this.classRepository.save({ ...classToUpdate, ...updateClassDto });
  }
}
