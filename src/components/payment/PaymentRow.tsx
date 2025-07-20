interface IPaymentRowProps {
    data: {
        orderNumber: string;
        date: string;
        amount: string;
        method: string;
        status: string;
    };
}

export default function PaymentRow({ data }: IPaymentRowProps) {
    return (
        <tr className="border-b border-default-gray-400 text-default-gray-800">
            <td className="py-4">{data.orderNumber}</td>
            <td>{data.date}</td>
            <td>{data.amount}</td>
            <td>{data.method}</td>
            <td>{data.status}</td>
        </tr>
    );
}
