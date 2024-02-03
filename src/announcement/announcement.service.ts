import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAnnouncementDto } from './dto/create-announcement.dto';
import { UpdateAnnouncementDto } from './dto/update-announcement.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Announcement } from './entities/announcement.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnnouncementService {
  constructor(
    @InjectRepository(Announcement)
    private readonly announcementRepository: Repository<Announcement>,
  ) {}

  async create(createAnnouncementDto: CreateAnnouncementDto, id: number) {
    const isExist = await this.announcementRepository.findBy({
      user: { id },
      title: createAnnouncementDto.title,
    });

    if (isExist.length)
      throw new BadRequestException('Announcement already exist!');

    const newAnnouncement = {
      title: createAnnouncementDto.title,
      description: createAnnouncementDto.description,
      image: createAnnouncementDto.image,
      price: createAnnouncementDto.price,
      category: createAnnouncementDto.category,
      user: {
        id,
      },
    };

    return await this.announcementRepository.save(newAnnouncement);
  }

  findAll() {
    return this.announcementRepository.find();
  }

  async findOne(id: number) {
    const announcement = await this.announcementRepository.findOne({
      where: { id },
      relations: {
        user: true,
      },
    });

    if (!announcement) throw new NotFoundException('Announcement not found!');

    return announcement;
  }

  async update(id: number, updateAnnouncementDto: UpdateAnnouncementDto) {
    const announcement = await this.announcementRepository.findOne({
      where: { id },
    });

    if (!announcement)
      throw new NotFoundException("Announcement doesn't found!");

    return await this.announcementRepository.update(id, updateAnnouncementDto);
  }

  async remove(id: number) {
    const announcement = await this.announcementRepository.findOne({
      where: { id },
    });

    if (!announcement)
      throw new NotFoundException("Announcement doesn't found!");

    return await this.announcementRepository.delete(id);
  }
}
