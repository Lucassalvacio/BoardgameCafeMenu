import type {

    VercelRequest,

    VercelResponse,

} from "@vercel/node";

export default async function handler(

    req: VercelRequest,

    res: VercelResponse

) {

    if (req.method !== "POST") {

        return res.status(405).json({

            error: "Method Not Allowed",

        });

    }

    const {

        tableNumber,

        amount,

        orderIds,

    } = req.body;

    const paymentId =

        `PAY-${Date.now()}`;

    return res.status(200).json({

        id: paymentId,

        paymentId,

        tableNumber,

        orderIds,

        amount,

        provider: "mock",

        status: "pending",

        qrType: "image",

        qrData: "/QRIS-Test.png",

        createdAt:

            new Date().toISOString(),

        expiresAt:

            new Date(

                Date.now()

                + 15 * 60 * 1000

            ).toISOString(),

        paidAt: null,

    });

}