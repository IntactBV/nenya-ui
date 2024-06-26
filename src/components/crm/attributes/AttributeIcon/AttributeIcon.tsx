import { TAttributesType } from '@uiDomain/domain.types';
import { FC } from 'react';
import { CiBoxList, CiCalendarDate, CiDroplet, CiFaceSmile, CiMail, CiMicrochip, CiPhone, CiText, CiUser } from 'react-icons/ci';

type TAttributeIconProps = {
  attributeType: TAttributesType
};

export const AttributeIcon: FC<TAttributeIconProps> = ({ attributeType }) => {
  const size = '2.5rem';

  return (
    <>
      {attributeType === '' && (
        <CiDroplet size={size} />
      )}
      {attributeType === '_entity' && (
        <CiMicrochip size={size} />
      )}
      {attributeType === 'text' && (
        <CiText size={size} />
      )}
      {( attributeType === 'date' ||
        attributeType === 'date-time'
      ) && (
        <CiCalendarDate size={size} />
      )}
      {attributeType === 'html' && (
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
      {attributeType === 'avatar' && (
        <CiFaceSmile size={size} />
      )}
      {attributeType === 'user' && (
        <CiUser size={size} />
      )}

      {/* <i className="icon" >
        {attributeType}
      </i> */}
    </>
  );
};
