import type { Payment } from "@/types";

const API = import.meta.env.VITE_API_URL;

export async function createPayment(

    tableNumber: number,

    orderIds: string[],

    amount: number

): Promise<Payment> {

    const response = await fetch(

        `${API}/api/payment/create`,

        {

            method: "POST",

            headers: {

                "Content-Type": "application/json",

            },

            body: JSON.stringify({

                tableNumber,

                orderIds,

                amount,

            }),

        }

    );

    if (!response.ok) {

        throw new Error("Unable to create payment.");

    }

    return response.json();

}