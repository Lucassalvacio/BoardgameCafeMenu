import { StaffOrder } from "../../types";

interface Props{

    order:StaffOrder;

    onStatusChange:(

        id:string,

        status:StaffOrder["status"]

    )=>void;

}

export default function OrderCard({

    order,

    onStatusChange

}:Props){

    return(

        <div className="order-card">

            <div className="order-top">

                <div>

                    <h3>

                        Table {order.tableNumber}

                    </h3>

                    <p>

                        Order #{order.id.slice(0,6)}

                    </p>

                </div>

                <span>

                    {order.status}

                </span>

            </div>

            <hr/>

            {

                order.items.map(item => (

                    <div
                        key={item.id}
                        className="order-item"
                    >

                        <span>

                            {item.qty}×

                        </span>

                        <span>

                            {item.name}

                        </span>

                        <span>

                            Rp{(item.qty * item.unitPrice).toLocaleString()}

                        </span>

                    </div>

                ))

            }

            {

                order.note &&

                <>

                    <hr/>

                    <strong>

                        Note

                    </strong>

                    <p>

                        {order.note}

                    </p>

                </>

            }

            <hr/>

            <strong>

                Total

            </strong>

            <h2>

                Rp{order.total.toLocaleString()}

            </h2>

            {

                order.status==="received" &&

                <button

                    onClick={()=>onStatusChange(

                        order.id,

                        "preparing"

                    )}

                >

                    Start Preparing

                </button>

            }

            {

                order.status==="preparing" &&

                <button

                    onClick={()=>onStatusChange(

                        order.id,

                        "served"

                    )}

                >

                    Mark Served

                </button>

            }

            {

                order.status==="served" &&

                <button

                    onClick={()=>onStatusChange(

                        order.id,

                        "paid"

                    )}

                >

                    Mark Paid

                </button>

            }

        </div>

    );

}