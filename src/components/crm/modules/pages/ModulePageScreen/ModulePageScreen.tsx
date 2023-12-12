'use client';

import { Stack } from '@mantine/core';
import { useGetModulePageDetailsQuery } from '@uiRepos/modules.repo';
import { useParams } from 'next/navigation';
import { NoData } from '@uiComponents/common/NoData';
import { isEmpty, isNil } from 'lodash';
import * as renderers from '@crmComponents/renderers';
import { useMemo } from 'react';
import { CommonPageLoader } from '@uiComponents/common/CommonPageLoader';

export const ModulePageScreen = () => {
  const { pageId } = useParams();
  const { data, isLoading, isSuccess } = useGetModulePageDetailsQuery({
    pageId,
  });
  const PageRenderer = useMemo(() => {
    if ( !isSuccess ) {
      return null;
    }

    return ( renderers as Record<string, any> )[ data.pageType ];
  }, [ data ]);

  if ( isLoading ) {
    return <CommonPageLoader message="Loading page ..." />;
  }

  if ( !isSuccess ) {
    return (
      <div>
        <NoData
          title="Failed to fetch page data"
          description="Could not fetch page data"
        />
      </div>
    );
  }

  if ( isSuccess && isNil( PageRenderer )) {
    return (
      <NoData
        title="Invalid renderer"
        description={`Required renderer "${data.pageType}" is not defined so this page cannot be displayed`}
      />
    );
  }

  return (
    <Stack h="80vh">
      {isSuccess && (
        <>
          {isEmpty( data.pageType ) && (
            <NoData
              title="No page type found"
              description="Please define a page type so we know how to render this page"
            />
          )}

          {!isNil( PageRenderer ) && (
            <PageRenderer pageData={data} />
          )}
        </>
      )}
    </Stack>
  );
};
