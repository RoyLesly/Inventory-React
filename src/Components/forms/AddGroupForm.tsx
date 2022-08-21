import { Form, Input, Modal, Button, Select, notification } from 'antd'
import { FC, useState } from 'react';
import { CreateGroupUrl } from '../../Utils/Config';
import { axiosRequest } from '../../Utils/functions';
import { DataProps, FormModalProps, GroupProps } from '../../Utils/types';

const { Option } = Select

interface AddGroupFormProps extends FormModalProps {
    groups: GroupProps[]
}

const AddGroupForm: FC<AddGroupFormProps> = ({
    isVisible = false,
    onSuccessCallBack,
    onClose,
    groups
}) => {

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false)

    const onSubmit = async (values: DataProps) => {
        setLoading(true)

        const response = await axiosRequest({
            method: "post",
            url: CreateGroupUrl,
            payload: values,
            hasAuth: true,
            //headers: {...headers}
        })

        setLoading(false)
        if (response) {
            notification.success({
                message: "Operation Successful",
                description: "Group Created Successfully"
            })
            onSuccessCallBack()
            form.resetFields();
        }
    }

    return (
        <Modal
            title="Add New Group"
            visible={isVisible}
            onCancel={onClose}
            footer={false}
            maskClosable={false}
        // closable={false}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form}>

                <Form.Item label="Name To" name="name"
                    rules={[{ required: true, message: "Please Input Group Name" }]}
                >
                    <Input placeholder='Group Name' />
                </Form.Item>

                <Form.Item label="Belongs To" name="belongs_to_id">
                    <Select defaultValue="">
                        <Option value="">Select a Group</Option>
                        {
                            groups.map(
                                (item, index) => <Option value={item.id} key={index}>{item.name}</Option>
                            )
                        }
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button htmlType='submit' type='primary' block loading={loading} >Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddGroupForm;