import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateNetworkDto } from './dto/create-network.dto';
import { UpdateNetworkDto } from './dto/update-network.dto';

@Injectable()
export class NetworksService {
  constructor(private prisma: PrismaService) {}

  async create(createNetworkDto: CreateNetworkDto) {
    return this.prisma.network.create({
      data: {
        ...createNetworkDto,
        devices: createNetworkDto.devices
          ? { create: createNetworkDto.devices }
          : undefined,
      },
    });
  }

  async findAll() {
    return this.prisma.network.findMany({
      include: { devices: true }, // Include related devices if needed
    });
  }

  async findOne(id: number) {
    const network = await this.prisma.network.findUnique({
      where: { id },
      include: { devices: true }, // Include related devices if needed
    });

    if (!network) {
      throw new NotFoundException(`Network with id ${id} not found`);
    }

    return network;
  }

  async update(id: number, updateNetworkDto: UpdateNetworkDto) {
    const network = await this.prisma.network.findUnique({
      where: { id },
    });

    if (!network) {
      throw new NotFoundException(`Network with id ${id} not found`);
    }

    return this.prisma.network.update({
      where: { id },
      data: {
        ...updateNetworkDto,
        devices: updateNetworkDto.devices
          ? {
              upsert: updateNetworkDto.devices.map((device) => ({
                where: { id: device && 'id' in device && typeof device.id === 'number' ? device.id : 0 }, // Ensure 'id' is a number
                update: device,
                create: device,
              })),
            }
          : undefined,
      },
    });
  }

  async remove(id: number) {
    const network = await this.prisma.network.findUnique({
      where: { id },
    });

    if (!network) {
      throw new NotFoundException(`Network with id ${id} not found`);
    }

    return this.prisma.network.delete({
      where: { id },
    });
  }
}
