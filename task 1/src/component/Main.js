import React, {useState} from 'react';
import { Table, Input, InputNumber, Popconfirm, Form} from 'antd';
import { Button, Modal, Radio } from 'antd';
import {useHistory} from "react-router-dom";
import post from "../component/post.json";

//add new item of row
const ModalForm = ({ visible, onSubmit, onCancel}) => {
  const [form] = Form.useForm();
 
  
  return (
    <Modal
      visible={visible}
      title="Create a new collection"
      okText="Submit"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then(values => {
            form.resetFields();
            onSubmit(values);
          })
          .catch(info => {
            console.log('Validate Failed:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
      >
        <Form.Item
          name="name"
          label="Course Name"
          rules={[
            {
              required: true,
              message: 'fill the course name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="username"
          label="User Name"
          rules={[
            {
              required: true,
              message: 'fill the name',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="date"
          label="Arrival Date"
          rules={[
            {
              required: true,
              message: 'fill the date',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="count"
          label="Course Count"
          rules={[
            {
              required: true,
              message: 'fill the course count',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="sdate"
          label="Start Date"
          rules={[
            {
              required: true,
              message: 'fill the date',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="edate"
          label="End Date"
          rules={[
            {
              required: true,
              message: 'fill the date',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};


//table form with data-source
const OriginData = [
  {
    key: 1,
    name: 'test1',
    username: 'Wahid Khan',
    date: '10-Aug-2020',
    count:1,
    sdate:'NA',
    edate:'NA',
    action: 'edit',
  },
  {
    key: 2,
    name: 'test2',
    username: 'Alok',
    date: '10-Aug-2020',
    count:1,
    sdate:'NA',
    edate:'NA',
    action: 'edit',
  },
  {
    key: 3,
    name: 'test3',
    username: 'Yashpur',
    date: '10-Aug-2020',
    count:2,
    sdate:'NA',
    edate:'NA',
    action: 'edit',
  },
  {
    key: 4,
    name: 'test4',
    username: 'Joath Khan',
    date: '10-Aug-2020',
    count:1,
    sdate:'NA',
    edate:'NA',
    action: 'edit',
  },
  {
    key: 5,
    name: 'test5',
    username: 'Prakathi',
    date: '10-Aug-2020',
    count:1,
    sdate:'NA',
    edate:'NA',
    action: 'edit',
  },
  {
    key: 6,
    name: 'test6',
    username: 'Anamika',
    date: '10-Aug-2020',
    count:2,
    sdate:'NA',
    edate:'NA',
    action: 'edit',
  },
  {
    key: 7,
    name: 'test7',
    username: 'Pratheep',
    date: '10-Aug-2020',
    count:1,
    sdate:'NA',
    edate:'NA',
    action: 'edit',
  },
];
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

//Main function part
const Main = () => { {

  let history =useHistory();

//item insertion part

  const [visible, setVisible] = useState(false);
  const onSubmit = values => {
    OriginData.push(values);
    console.log(OriginData);
    console.log('Received values of form: ', values);
    setVisible(false);
  };

 

    
  
//form editable part
  const [form] = Form.useForm();
  const [data, setData] = useState(OriginData);
  const [editingKey, setEditingKey] = useState('');

  const isEditing = record => record.key === editingKey;

  const edit = record => {
    form.setFieldsValue({
      name: '',
      username: '',
      date:'',
      count: '',
      sdate: '',
      edate:'',
      ...record,
    });
    setEditingKey(record.key);
  };

  const cancel = () => {
    setEditingKey('');
  };

  const save = async key => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex(item => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, { ...item, ...row });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
 
  const columns =  [
    {

      title: 'Course Name',
      dataIndex: 'name',
      width: '20%',
      editable: true,
      render:(text,record,key) => {
        return(
          <div>
          <span  onClick={() => history.push('/New/${key}')}> {record.name}
          </span>
          </div>
          );
      }
    },
    {
      title: 'User Name',
      dataIndex: 'username',
      width: '20%',
      editable: true,
    },
    {
      title: 'Arrival date',
      dataIndex: 'date',
      width: '15%',
      editable: true,
    },
    {
      title: 'Course Count',
      dataIndex: 'count',
      width: '15%',
      editable: true,
    },
    {
      title: 'Starting date',
      dataIndex: 'sdate',
      width: '10%',
      editable: true,
    },
    {
      title: 'End date',
      dataIndex: 'edate',
      width: '10%',
      editable: true,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <a
              href="javascript:;"
              onClick={() => save(record.key)}
              style={{
                marginRight:15,
              }}
            >
              Save
            </a>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <a disabled={editingKey !== ''} onClick={() => edit(record)}>
            Edit
          </a>
        );
      },
    },
  ];
  const mergedColumns = columns.map(col => {
    if (!col.editable) {
      return col;
    }
//course count increment field
    return {
      ...col,
      onCell: record => ({
        record,
        inputType: col.dataIndex === 'count' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  
  
 
  return (
    <div className="App">
        <Form form={form} component={false}>
      <Table  
        style={{cursor:"pointer"}}
        components={{
          body: {
            cell: EditableCell,
          },
        }}
        bordered
        dataSource={data}
        columns={mergedColumns}
        rowClassName="editable-row"
        pagination={{
          onChange: cancel,
        }}
      />
    </Form>
    <div>
      <Button
        type="primary"
        onClick={() => {
          setVisible(true);
        }}
      >
        Add Row
      </Button>
      <ModalForm
        style={{cursor:"pointer"}}
        visible={visible}
        onSubmit={onSubmit}
        onCancel={() => {
          setVisible(false);
        }}
      />
    </div>
    </div>
  );
}
}

export default Main;
