import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledTable = styled.table`
  width: 100%;
`;

const StyledTd = styled.td`
  padding: 5px 0;
`;
const StyledTr = styled.tr`
  cursor: pointer;
  border-top: 1px solid black;
  border-bottom: 1px solid black;
`;

function TableForPresent({ data, choosePatient }) {
  return (
    <StyledTable>
      <tbody>
        <tr>
          <th>№ ИБ</th>
          <th>ФИО</th>
          <th>ПАЛАТА</th>
        </tr>
        {data.map((item, index) => (
          <StyledTr
            key={item.historyNumber}
            onClick={() => {
              choosePatient(item);
            }}
          >
            <StyledTd>{index + 1}</StyledTd>
            <StyledTd>{item.firstName}</StyledTd>
            <StyledTd>{item.bedNumber}</StyledTd>
          </StyledTr>
        ))}
      </tbody>
    </StyledTable>
  );
}
TableForPresent.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  choosePatient: PropTypes.func.isRequired,
};
export default TableForPresent;
