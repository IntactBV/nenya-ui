import { Stack } from '@mantine/core';
import { IEntity } from '@uiDomain/domain.types';
import { FC } from 'react';
import { ProjectCard } from './ProjectCard';

type TProjectsListProps = {
  records: any[];
  entity: IEntity;
};

export const ProjectsList: FC<TProjectsListProps> = ({
  records,
  entity,
}) => {
  const a = 1;
  return (
    <Stack>
      {records.map(( record ) => (
        <ProjectCard key={record.id} record={record} entity={entity} />
      ))}
    </Stack>
  );
};
