import { ForbiddenException, Injectable } from '@nestjs/common';
import BasketService from '../../basket/services/basket.service';
import OrderRepositoryService from './order-repository.service';
import TransactionRepositoryService from './transaction-repository.service';
import CreateOrderDto from '../dto/create-order.dto';
import PaymentService from '../../payment/services/payment.service';
import NewOrderDto from '../dto/new-order.dto';
import NewPaymentMethodDto from '../../payment/dto/newPaymentMethod.dto';
import PaymentMethodDto from '../../payment/dto/paymentMethod.dto';
import OrderDetailsDto from '../dto/order-details.dto';
import Transaction from '../../database/entities/order/transaction.entity';
import PaymentDetailsDto from '../dto/payment-details.dto';
import OrderNotFoundException from '../exceptions/user-not-found.exception';
import StoreService from '../../store/services/store.service';
import OrderListDto from '../dto/order-list.dto';

@Injectable()
export default class OrderService {
  constructor(
    private readonly paymentService: PaymentService,
    private readonly basketService: BasketService,
    private readonly orderRepositoryService: OrderRepositoryService,
    private readonly transactionRepositoryService: TransactionRepositoryService,
    private readonly storeService: StoreService,
  ) {}

  async getPaymentDetails(
    paymentData: NewPaymentMethodDto,
    saveNewPaymentMethod,
    userId,
    paymentMethodId,
  ): Promise<{ paymentMethodData: PaymentMethodDto; rawPaymentData: string }> {
    let paymentMethodData;
    let rawPaymentData;
    if (paymentMethodId && userId) {
      paymentMethodData = await this.paymentService.getPaymentMethod(paymentMethodId, userId);
      rawPaymentData = null;
    } else if (paymentData && (!saveNewPaymentMethod || !userId)) {
      paymentMethodData = this.paymentService.formatPaymentData(paymentData);
      rawPaymentData = `${paymentMethodData.maskedCardNumber},${paymentMethodData.cardType}`;
    } else if (paymentData && saveNewPaymentMethod && userId) {
      paymentMethodData = this.paymentService.addPaymentMethod(paymentData, userId);
      rawPaymentData = null;
    }
    return { paymentMethodData, rawPaymentData };
  }

  async createOrder(orderData: CreateOrderDto, userId: number = null): Promise<NewOrderDto> {
    const {
      basketId,
      paymentMethodId,
      saveNewPaymentMethod,
      paymentDetails,
      totalOrderSum,
    } = orderData;
    const order = await this.orderRepositoryService.createOrder(basketId, userId);
    const { paymentMethodData, rawPaymentData } = await this.getPaymentDetails(
      paymentDetails,
      saveNewPaymentMethod,
      userId,
      paymentMethodId,
    );
    const transaction = await this.transactionRepositoryService.createTransaction(
      order.id,
      totalOrderSum,
      paymentMethodData?.id,
      rawPaymentData,
    );

    return {
      status: transaction.status,
      timestamp: transaction.created_at,
      id: order.id,
      transactionId: transaction.id,
      sum: totalOrderSum,
    };
  }

  private formOrderPaymentDetails(transaction: Transaction): PaymentDetailsDto {
    const { id, payment_raw_data, payment_method, created_at } = transaction;
    const basePaymentData = { transaction_id: id, timestamp: created_at };
    if (payment_raw_data) {
      const [card_number, card_type] = payment_raw_data.split(',');
      return { ...basePaymentData, card_number, card_type };
    } else if (payment_method) {
      const { card_number, card_type } = payment_method;
      return { ...basePaymentData, card_number, card_type };
    }
  }

  async getOrderDetails(orderId: number, userId: number = null): Promise<OrderDetailsDto> {
    const order = await this.orderRepositoryService.getOrder(orderId);
    if (!order) {
      throw new OrderNotFoundException(orderId);
    }
    if (order.user_id && userId && order.user_id !== userId) {
      throw new ForbiddenException();
    }
    const transaction = await this.transactionRepositoryService.getTransactionByOrderId(orderId);
    const basket = await this.basketService.getBasketDetails(order.basket_id);
    const formedPaymentDetails = this.formOrderPaymentDetails(transaction);
    const store = await this.storeService.getStoreShortDetails(basket.storeId);

    return {
      id: order.id,
      products: basket,
      timestamp: order.created_at,
      paymentDetails: formedPaymentDetails,
      store,
    };
  }

  deleteOrder(orderId: number, userId: number = null): Promise<object> {
    return this.orderRepositoryService.delete({ id: orderId, user_id: userId });
  }

  async getOrdersList(ids: number[] = [], userId: number = null): Promise<OrderListDto> {
    let data;
    if (userId) {
      data = await this.orderRepositoryService.getOrdersListByUserId(userId);
    } else {
      data = await this.orderRepositoryService.getOrdersListByIdsList(ids);
    }
    return { data };
  }
}
