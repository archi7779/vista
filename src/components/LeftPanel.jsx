import React from 'react';
import parseISO from 'date-fns/parseISO';
import differenceInCalendarYears from 'date-fns/differenceInCalendarYears';
import styled from 'styled-components';
import { LeftOutlined } from '@ant-design/icons';
import { Button } from 'antd';
import PropTypes from 'prop-types';

const DataWrapper = styled.div`
  padding-top: 20px;
`;

const PatientInfoWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  background-color: lightblue;
  font-size: 36px;
`;
const StyledButton = styled(Button)`
  align-self: center;
  background-color: inherit;
  border: none;
  margin-right: 10px;
`;
function LeftPanel({ data }) {
  return (
    <div>
      <PatientInfoWrapper>
        <div>Информация о пациенте</div>
        <StyledButton icon={<LeftOutlined />} />
      </PatientInfoWrapper>
      <DataWrapper>
        {data.firstName ? (
          <>
            <p>ФИО: {data.firstName}</p>
            <p>Возраст: {differenceInCalendarYears(Date.now(), parseISO(data.birthDate))}</p>
            <p>Диагноз: {data.diagnosis}</p>
          </>
        ) : (
          'Информация отсутствует'
        )}
      </DataWrapper>
    </div>
  );
}
LeftPanel.propTypes = {
  data: PropTypes.shape({
    firstName: PropTypes.string.isRequired,
    birthDate: PropTypes.string.isRequired,
    diagnosis: PropTypes.string.isRequired,
  }).isRequired,
};
export default LeftPanel;
