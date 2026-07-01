export interface CreatePaymentResponse {

    paymentId: string;

    status: string;

    amount: number;

    expiresAt: string;

    qrType: "image" | "string";

    qrData: string;

}

export async function createPayment() {

    const response = await fetch("/api/payment/create", {

        method: "POST",

        headers: {

            "Content-Type": "application/json",

        },

        body: JSON.stringify({

            amount: 100000,

        }),

    });

    if (!response.ok) {

        throw new Error("Failed to create payment.");

    }

    return response.json() as Promise<CreatePaymentResponse>;

}