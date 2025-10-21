import { User, Order } from '../types';

interface MasterReportsProps {
  currentUser: User;
  orders: Order[];
}

export function MasterReports(_props: MasterReportsProps) {
  return <div className="text-center py-12"><p className="text-gray-500">Звіти майстра (в розробці)</p></div>;
}


