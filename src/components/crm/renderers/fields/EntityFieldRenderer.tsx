import { FC } from 'react';
import Link from 'next/link';
import { Button } from '@mantine/core';

type TFieldRendererProps = {
  id: string;
  name: string;
};

type TEntityFieldRendererProps = {
  field: TFieldRendererProps;
};

export const EntityFieldRenderer: FC<TEntityFieldRendererProps> = ({
  field,
}) => {
  const a = 1;
  return (
    <Link href={`/crm/records/${field?.id}`}>
      <Button
        variant="subtle"
      >
        {field?.name}
      </Button>
    </Link>
  );
};
