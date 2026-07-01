import OrderCard from "./OrderCard";
import { StaffOrder } from "../../types";

interface Props {

    tableNumber: number;

    orders: StaffOrder[];

    onStatusChange: (
        id: string,
        status: StaffOrder["status"]
    ) => void;

}

export default function TableGroup({

    tableNumber,

    orders,

    onStatusChange

}: Props) {

    const outstanding =
        orders
            .filter(order => !order.paid)
            .reduce(
                (sum, order) => sum + order.total,
                0
            );

    return (

        <section className="table-group">

            <div className="table-group-header">

                <div>

                    <h2>

                        Table {tableNumber}

                    </h2>

                    <p>

                        {orders.length} order(s)

                    </p>

                </div>

                <h3>

                    Rp{outstanding.toLocaleString()}

                </h3>

            </div>

            {

                orders.map(order => (

                    <OrderCard

                        key={order.id}

                        order={order}

                        onStatusChange={onStatusChange}

                    />

                ))

            }

        </section>

    );

}