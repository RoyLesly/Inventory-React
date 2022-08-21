import { Form, Input, Modal, Button, Select, notification } from 'antd'
import { FC, useState } from 'react';
import { CreateUserUrl } from '../../Utils/Config';
import { axiosRequest } from '../../Utils/functions';
import { DataProps, FormModalProps } from '../../Utils/types';

const { Option } = Select

const AddUserForm: FC<FormModalProps> = ({
    isVisible = false,
    onSuccessCallBack,
    onClose,
}): any => {

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false)

    const onSubmit = async (values: DataProps) => {
        setLoading(true)

        const response = await axiosRequest({
            method: "post",
            url: CreateUserUrl,
            payload: values,
            hasAuth: true,
            //headers: {...headers}
        })

        setLoading(false)
        if (response) {
            notification.success({
                message: "Operation Successful",
                description: "User Created Successfully"
            })
            onSuccessCallBack()
            form.resetFields();
        }
    }

    return (
        <Modal
            title="Add New User"
            visible={isVisible}
            onCancel={onClose}
            footer={false}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form}>

                <Form.Item label="First Name" name="first_name"
                    rules={[{ required: true, message: "Please Input First Name" }]}
                >
                    <Input placeholder='First Name' type='first_name' />
                </Form.Item>

                <Form.Item label="Last Name" name="last_name"
                    rules={[{ required: true, message: "Please Input Last Name" }]}
                >
                    <Input placeholder='Last Name' type='last_name' />
                </Form.Item>

                <Form.Item label="Email" name="email"
                    rules={[{ required: true, message: "Please Input Email" }]}
                >
                    <Input placeholder='Email' type='email' />
                </Form.Item>

                <Form.Item label="Role" name="role"
                    rules={[{ required: true, message: "Please Select a Role!!!" }]}
                >
                    <Select placeholder='Role'>
                        <Option value="admin">Admin</Option>
                        <Option value="creator">Creator</Option>
                        <Option value="sale">Sale</Option>
                        <Option value="user1">User1</Option>
                        <Option value="user2">User2</Option>
                        <Option value="user3">User3</Option>
                        <Option value="user4">User4</Option>
                        <Option value="user5">User5</Option>
                        <Option value="user6">User6</Option>
                        <Option value="user7">User7</Option>
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button htmlType='submit' type='primary' block loading={loading} >Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddUserForm;