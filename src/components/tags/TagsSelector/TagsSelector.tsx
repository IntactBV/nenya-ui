import { FC, useMemo } from 'react';
import { Box, Loader, TagsInput, useCombobox } from '@mantine/core';
import { useTranslation } from 'react-i18next';
import { useCreateTagMutation, useGetAllTagsQuery } from '@uiRepos/tags.repo';
import { TTag } from '@uiDomain/types';
import { GoTag } from 'react-icons/go';

type TTagsSelectorProps = {
  value?: string[];
  onChange?: ( values: string[]) => void;
};

export const TagsSelector: FC<TTagsSelectorProps> = ({
  value,
  onChange,
}) => {
  const { t } = useTranslation();
  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });
  const [ performAddTag, addTagState ] = useCreateTagMutation();
  const { data, isLoading } = useGetAllTagsQuery();
  const strTags = useMemo(
    () => data?.map(( item: TTag ) => item.id ) || [],
    [ data ]
  );

  if ( isLoading || addTagState.isLoading ) {
    return (
      <Box ta="center" p="md">
        <Loader size={22} />
      </Box>
    );
  }

  return (
    <TagsInput
      mb="xl"
      leftSection={<GoTag />}
      label={t( 'tags.plural' )}
      placeholder="Pick tag from list"
      data={strTags}
      value={value}
      onChange={onChange}
      onOptionSubmit={async( val: string ) => {
        if ( !strTags.includes( val )) {
          await performAddTag( val );
        }
      }}
      clearable
      clearButtonProps={{
        'aria-label': 'Clear input',
      }}
    />
  );
};
