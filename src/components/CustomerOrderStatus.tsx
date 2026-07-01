import { StaffOrder } from "../types";

interface Props {
    orders: StaffOrder[];
}


export default function CustomerOrderStatus({
    orders
}: Props) {

    if (orders.length === 0) {

        return null;

    }

    return (

        <section className="customer-orders">

            <h2>Current Orders</h2>

            {

                orders.map(order => (

                    <div
                        key={order.id}
                        className="customer-order-card"
                    >

<div className="order-progress">

<div
    className={
        order.status === "received" ||
        order.status === "preparing" ||
        order.status === "served" ||
        order.status === "paid"

            ? "progress-step active"

            : "progress-step"
    }
>
    Received
</div>

<div
    className={
        order.status === "preparing" ||
        order.status === "served" ||
        order.status === "paid"

            ? "progress-step active"

            : "progress-step"
    }
>
    Preparing
</div>

<div
    className={
        order.status === "served" ||
        order.status === "paid"

            ? "progress-step active"

            : "progress-step"
    }
>
    Served
</div>

</div>

                        {

                            order.items.map(item => (

                                <div
                                    key={item.id}
                                    className="customer-order-item"
                                >

                                    <span>

                                        {item.qty} × {item.name}

                                    </span>

                                    <span>

                                        Rp{(
                                            item.qty *
                                            item.unitPrice
                                        ).toLocaleString()}

                                    </span>

                                </div>

                            ))

                        }

                        {

                            order.note &&

                            <p>

                                Note: {order.note}

                            </p>

                        }

                    </div>

                ))

            }

        </section>

    );

}