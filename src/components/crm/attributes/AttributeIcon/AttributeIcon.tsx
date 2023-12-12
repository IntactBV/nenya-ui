import { TAttributesType } from '@uiDomain/domain.types';
import { FC } from 'react';
import { CiBoxList, CiMail, CiPhone, CiText } from 'react-icons/ci';

type TAttributeIconProps = {
  attributeType: TAttributesType
};

export const AttributeIcon: FC<TAttributeIconProps> = ({ attributeType }) => {
  const size = '1.5rem';

  return (
    <>
      {attributeType === 'text' && (
        <CiText size={size} />
      )}
      {attributeType === 'email' && (
        <CiMail size={size} />
      )}
      {attributeType === 'phone' && (
        <CiPhone size={size} />
      )}
      {attributeType === 'list' && (
        <CiBoxList size={size} />
      )}
    </>
  );
};
