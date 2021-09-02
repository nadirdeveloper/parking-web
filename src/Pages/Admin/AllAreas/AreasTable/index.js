import React from 'react';
import { Table, Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import DeleteBtn from './DeleteBtn';

class AreasTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: '',
      searchedColumn: '',
    }
  }
  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={node => {
            this.searchInput = node;
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => this.handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false });
              this.setState({
                searchText: selectedKeys[0],
                searchedColumn: dataIndex,
              });
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => this.searchInput.select(), 100);
      }
    },
    render: text =>
      this.state.searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[this.state.searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    this.setState({
      searchText: selectedKeys[0],
      searchedColumn: dataIndex,
    });
  };

  handleReset = clearFilters => {
    clearFilters();
    this.setState({ searchText: '' });
  };

  

  render() {
    const columns = [
      {
        title: 'User ID',
        dataIndex: 'userId',
        key: 'userId',
        width: '10%',
        ...this.getColumnSearchProps('userId'),
      },
      {
        title: 'Full Name',
        dataIndex: 'fullName',
        key: 'fullName',
        width: '10%',
        ...this.getColumnSearchProps('fullName'),
      },
      {
        title: 'Email',
        dataIndex: 'email',
        key: 'email',
        width: '10%',
        ...this.getColumnSearchProps('email'),
      },
      {
        title: 'Role',
        dataIndex: 'role',
        key: 'role',
        width: '10%',
        ...this.getColumnSearchProps('role'),
      },
      {
        title: 'DOB',
        dataIndex: 'dob',
        key: 'dob',
        width: '10%',
        ...this.getColumnSearchProps('dob'),
      },
      {
        title: 'Action',
        key: 'action',
        width: '20%',
        render: (text, record) => (
          <Space size="middle">
           <DeleteBtn record={record} />
          </Space>
        ),
      },
    ];
    return <Table columns={columns} loading={this.props.loading} dataSource={this.props.data || []} />;
  }
}

export default AreasTable;