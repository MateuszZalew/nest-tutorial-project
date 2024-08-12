import { Injectable } from '@nestjs/common';
import { Order, db } from 'src/db';
import { CreateOrderDto } from './dto/create-order.dto';
import { v4 as uuidv4 } from 'uuid';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
  public getAll(): Order[] {
    return db.orders;
  }

  public getById(id: Order['id']): Order | null {
    return db.orders.find((o) => o.id === id);
  }

  public create(orderData: CreateOrderDto): Order {
    const order = { ...orderData, id: uuidv4() };
    db.orders.push(order);
    return order;
  }

  public deleteById(id: Order['id']): void {
    db.orders = db.orders.filter((order) => order.id !== id);
  }

  public updateById(id: Order['id'], orderData: UpdateOrderDto): void {
    db.orders = db.orders.map((order) => {
      if (order.id === id) {
        return {
          ...order,
          ...orderData,
        };
      }
      return order;
    });
  }
}
