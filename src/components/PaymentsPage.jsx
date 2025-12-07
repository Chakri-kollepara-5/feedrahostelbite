import { useEffect, useState } from 'react';
import { subscribeToPayments, createPayment } from '../services/payments';

export default function PaymentsPage() {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    const unsub = subscribeToPayments(
      (data) => setPayments(data),
      (err) => console.error(err)
    );

    return () => unsub();
  }, []);

  const handleAddPayment = async () => {
    await createPayment({
      userId: 'MWPFdqzzhP6eBsWkQjQ7',
      amount: 500,
      status: 'pending',
    });
  };

  // Safe date parser (Firestore Timestamp or JS Date)
  const formatDate = (value) => {
    if (!value) return 'N/A';

    // Firestore Timestamp
    if (typeof value.toDate === 'function') {
      return value.toDate().toLocaleString();
    }

    // JS Date
    const d = new Date(value);
    return !isNaN(d.getTime()) ? d.toLocaleString() : 'Invalid Date';
  };

  return (
    <div>
      <h2>Payments</h2>

      <button onClick={handleAddPayment}>Add Payment</button>

      <ul>
        {payments.map((p) => (
          <li key={p.id}>
            ₹{p.amount} — {p.status} — {formatDate(p.createdAt)}
          </li>
        ))}
      </ul>
    </div>
  );
}
