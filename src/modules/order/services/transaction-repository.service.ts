import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import BaseRepositoryService from '../../../shared/base-repository.service';
import { TRANSACTION_REPOSITORY } from '../../../constants';
import Transaction from '../../database/entities/order/transaction.entity';
import { OrderStatus } from '../interfaces/status.enum';

@Injectable()
export default class TransactionRepositoryService extends BaseRepositoryService<Transaction> {
  constructor(
    @Inject(TRANSACTION_REPOSITORY)
    private readonly transactionRepository: Repository<Transaction>,
  ) {
    super(transactionRepository);
  }

  createTransaction(orderId: number, sum: number, paymentMethodId: number, paymentRawData: string): Promise<Transaction> {
    const transaction = new Transaction();
    transaction.order_id = orderId;
    transaction.sum = sum;
    transaction.payment_method_id = paymentMethodId;
    transaction.payment_raw_data = paymentRawData;
    transaction.status = OrderStatus.PAID;
    return this.transactionRepository.save(transaction);
  }

  getTransactionByOrderId(orderId: number): Promise<Transaction>  {
    return this.transactionRepository.findOne({
      where: { order_id: orderId },
      select: ['id', 'payment_raw_data', 'created_at',  'payment_method', 'sum'],
      relations: ['payment_method'],
    });
  }
}
