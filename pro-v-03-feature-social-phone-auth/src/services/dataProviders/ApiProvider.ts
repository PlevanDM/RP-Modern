import { EscrowPayment, IEscrowDataProvider } from '../../types';

// Этот класс будет использоваться для взаимодействия с реальным API бэкенда.
// Пока что он содержит заглушки.
export class ApiProvider implements IEscrowDataProvider {
  public getById(_id: string): EscrowPayment | null {
    console.warn('Метод ApiProvider.getById еще не реализован');
    // В будущем здесь будет GET-запрос к API: /api/escrow/{id}
    return null;
  }

  public getByOrderId(_orderId: string): EscrowPayment[] {
    console.warn('Метод ApiProvider.getByOrderId еще не реализован');
    // В будущем здесь будет GET-запрос к API: /api/escrow/order/{orderId}
    return [];
  }

  public getAll(): EscrowPayment[] {
    console.warn('Метод ApiProvider.getAll еще не реализован');
    // В будущем здесь будет GET-запрос к API: /api/escrow
    return [];
  }

  public save(_payment: EscrowPayment): void {
    console.warn('Метод ApiProvider.save еще не реализован');
    // В будущем здесь будет POST или PUT-запрос к API: /api/escrow
  }
}
