import React from 'react';
import axios from 'axios';
import { message, Tabs } from 'antd';
import styled from 'styled-components';
import LeftPanel from './components/LeftPanel';
import TableForPresent from './components/TableForPresent';
import TableForQuiting from './components/TableForQuiting';

const { TabPane } = Tabs;

const Wrapper = styled.div`
  height: 100vh;
  width: 100%;
  padding: 15px;
  display: flex;
`;

const LeftPanelWrapper = styled.div`
  border: 1px solid black;
  padding: 5px;
  width: 50%;
  margin-right: 5px;
`;
const RightPanelWrapper = styled.div`
  border: 1px solid black;
  padding: 5px;
  width: 50%;
  overflow: scroll;
  overflow-x: hidden;
  margin-left: 5px;
`;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: {},
      present: [],
      quiting: [],
    };
  }

  componentDidMount() {
    this.loadMedData();
  }

  loadMedData = async () => {
    const config = {
      headers: { 'secret-key': '$2b$10$Rw3AI5quZuC5WnfhEFXFpuDYCf7Y/SOIGrtmnW2VZlCyQtvd6NxOO' },
    };
    try {
      const present = await axios.get('https://api.jsonbin.io/b/5e624a7e763fa966d410fa1d', config);
      this.setState({
        present: present.data,
      });
    } catch (err) {
      message.error('что-то пошло не так');
      // eslint-disable-next-line no-console
      console.log(err);
    }
    try {
      const quiting = await axios.get('https://api.jsonbin.io/b/5e624ac4baf60366f0e4cd57', config);
      this.setState({
        quiting: quiting.data,
      });
    } catch (err) {
      message.error('что-то пошло не так');
      // eslint-disable-next-line no-console
      console.log(err);
    }
  };

  choosePatient = patient => {
    this.setState({ active: patient });
  };

  render() {
    const { present, quiting, active } = this.state;
    return (
      <Wrapper>
        <LeftPanelWrapper>
          <LeftPanel data={active} />
        </LeftPanelWrapper>

        <RightPanelWrapper>
          <Tabs defaultActiveKey="1">
            <TabPane tab={`Присутствуют(${present.length})`} key="1">
              <TableForPresent data={present} choosePatient={this.choosePatient} />
            </TabPane>
            <TabPane tab={`Выбывшие(${quiting.length})`} key="2">
              <TableForQuiting data={quiting} choosePatient={this.choosePatient} />
            </TabPane>
          </Tabs>
        </RightPanelWrapper>
      </Wrapper>
    );
  }
}

export default App;
