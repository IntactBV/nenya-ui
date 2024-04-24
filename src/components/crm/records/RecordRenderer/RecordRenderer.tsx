import { IAttribute } from "@uiDomain/domain.types";
import { FC } from "react";
import * as fieldRenderers from '@crmComponents/renderers/fields';
import { EEntityFieldType } from "@uiDomain/types";
import { capitalize, isNil } from "lodash";
import { TFieldRendererProps } from "@crmComponents/renderers/fields/field-renderers.types";

type TRecordRendererProps = {
  record: Record<string, any>;
  attribute: IAttribute;
};

export const RecordRenderer: FC<TRecordRendererProps> = ({
  record,
  attribute
}) => {
    const rendererName = (
      attribute.fieldType === EEntityFieldType.Entity
    )
      ? isNil(( fieldRenderers as Record<string, any> )[ `${capitalize( attribute.slug )}FieldRenderer` ])
        ? 'EntityFieldRenderer'
        : `${capitalize( attribute.slug )}FieldRenderer`
      : attribute.slug === '_actions'
        ? 'ActionsFieldRenderer'
        : `${capitalize( attribute.slug )}FieldRenderer`;
    const FieldRenderer = (
      ( fieldRenderers as Record<string, any> )[ rendererName ] as FC<TFieldRendererProps>
    ) || fieldRenderers.TextFieldRenderer;


  return (
    <span data-renderer={rendererName}>
      <FieldRenderer 
        field={attribute.slug === '_actions' ? record : record.data[ attribute.slug ]}
        record={record.data}
        />
    </span>
  );
}