import { mockBalances } from '../mocks';
import { BalanceCard } from '../components/BalanceCard';
import { mockRate } from '../../rates/mocks';
import { RateCard } from '../../rates/components/RateCard';

export default function DashboardPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-xl font-semibold text-gray-900">Dashboard</h1>

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {mockBalances.map((balance) => (
          <BalanceCard
            key={balance.currency}
            currency={balance.currency}
            amount={balance.amount}
          />
        ))}
      </section>

      <section>
        <RateCard {...mockRate} />
      </section>
    </div>
  );
}