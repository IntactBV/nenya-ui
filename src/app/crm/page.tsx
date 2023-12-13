'use client';

import { Welcome } from '@uiComponents/public/Welcome/Welcome';
import stylex from '@stylexjs/stylex';
import { colors } from '@stylexjs/open-props/lib/colors.stylex';

export default function DashboardPage() {
  const x = stylex.create({
    test: {
      color: colors.red5,
    },
  });
  return (
    <main className={stylex( x.test )}>
      <Welcome />
      <div>example</div>
    </main>
  );
}
