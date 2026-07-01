import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(
    req: VercelRequest,
    res: VercelResponse
) {

    if (req.method !== "POST") {

        return res.status(405).json({
            error: "Method Not Allowed",
        });

    }

    console.log("Payment API called");

    return res.status(200).json({

        paymentId: "mock-payment-001",

        status: "pending",

        amount: 125000,

        expiresAt: new Date(
            Date.now() + 15 * 60 * 1000
        ).toISOString(),

        qrType: "image",

        qrData: "/qris-demo.png",

    });

}