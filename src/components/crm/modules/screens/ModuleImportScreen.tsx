'use client';

import { Button, Loader, Stack, Stepper, Text } from '@mantine/core';
import { CommonDebugger } from '@uiComponents/common/CommonDebugger';
import { CommonHeader } from '@uiComponents/common/CommonHeader/CommonHeader';
import { isNil } from 'lodash';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export const ModuleImportScreen = () => {
  const [
    moduleData,
    setModuleData,
  ] = useState<any>( null );
  const [
    activeStep,
    setActiveStep,
  ] = useState<number>( 0 );

  const onDrop = useCallback( async ( acceptedFiles: any[]) => {
    const file = acceptedFiles[ 0 ];
    const reader = new FileReader();

    reader.onload = ( e ) => {
      const contents = e.target.result as string;
      // const data = atob( contents );
      const decoded = Buffer.from( contents, 'base64' ).toString( 'ascii' );
      const data = JSON.parse( decoded );
      // const data = atob( contents.split( ',' )[ 1 ]);
      console.log( '####', data );
      setModuleData( data );
      setActiveStep( 1 );
      // displayContents( contents );
    };

    reader.readAsText( file );
    // reader.readAsArrayBuffer( file );
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/ndm': [ '.ndm' ],
    },
  });

  return (
    <Stack>
      <CommonHeader
        title="Import module"
        description="Import module from file"
        backButtonUrl="/crm/settings/modules"
        id="ModuleImportScreen"
      />

      <Stepper active={activeStep} mx="lg" my="lg">
        <Stepper.Step label="First step" description="Select a .ndm file">
          <div
            {...getRootProps()}
            style={{
              textAlign: 'center',
              padding: '5rem 0',
              border: '2px dashed #888',
              margin: '3rem 0',
            }}>
            <input {...getInputProps()} />
            {
              isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop a .ndm file here, or click to select one</p>
            }
          </div>
        </Stepper.Step>
        <Stepper.Step label="Second step" description="Review new module structure">
          {!isNil( moduleData ) && (
            <Stack gap="sm">
              <Text>Module data</Text>
              <Text>Name: <b>{moduleData.name}</b></Text>
              <Text>Description: <b>{moduleData.description}</b></Text>
              <CommonDebugger data={moduleData} field="module data" />
              <Button
                onClick={() => setActiveStep( 2 )}
              >
                  Import
              </Button>
            </Stack>
          )}
        </Stepper.Step>
        <Stepper.Step label="Final step" description="Import module">
          <Stack gap="lg">
            <Loader />
            <Text>Importing module...</Text>
          </Stack>
        </Stepper.Step>
        <Stepper.Completed>
          Completed, click back button to get to previous step
        </Stepper.Completed>
      </Stepper>

    </Stack>
  );
};
