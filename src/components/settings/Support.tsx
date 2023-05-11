import Link from 'next/link';
import { Card } from '../layouts/Card';

export const Support: React.FC = () => (
  <Card>
    <div className="space-y-4 bg-white px-4 py-6 sm:p-6">
      <div>
        <h2 id="account-heading" className="text-lg font-medium leading-6 text-gray-900">
          Support
        </h2>
      </div>

      <div className="space-y-4">
        <p>
          Email contact:{' '}
          <Link className="font-bold text-primary" href="mailto:sami.hanine22@gmail.com">
            sami.hanine22@gmail.com
          </Link>
        </p>
      </div>
    </div>
  </Card>
);
