import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PrismaService } from 'src/shared/services/prisma.service';
import { Order } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Order[]> {
    return this.prismaService.order.findMany({
      include: { product: true, client: true },
    });
  }

  public getById(id: Order['id']): Promise<Order | null> {
    return this.prismaService.order.findUnique({
      where: { id },
      include: {
        product: true,
        client: true,
      },
    });
  }

  public async create(orderData: CreateOrderDto): Promise<Order> {
    const { productId, clientId } = orderData;
    try {
      return await this.prismaService.order.create({
        data: {
          product: {
            connect: { id: productId },
          },
          client: {
            connect: { id: clientId },
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new BadRequestException(
          "Product or Client with given id doesn't exist",
        );
      }
      throw error;
    }
  }

  public deleteById(id: Order['id']): Promise<Order> {
    return this.prismaService.order.delete({
      where: { id },
    });
  }

  public updateById(
    id: Order['id'],
    orderData: UpdateOrderDto,
  ): Promise<Order> {
    const { productId, clientId } = orderData;
    return this.prismaService.order.update({
      where: { id },
      data: {
        product: {
          connect: { id: productId },
        },
        client: {
          connect: { id: clientId },
        },
      },
    });
  }
}
