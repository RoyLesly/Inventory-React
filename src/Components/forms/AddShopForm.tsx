import { Form, Input, Modal, Button, notification } from 'antd'
import { FC, useState } from 'react';
import { CreateShopsUrl } from '../../Utils/Config';
import { axiosRequest } from '../../Utils/functions';
import { DataProps, FormModalProps } from '../../Utils/types';


const AddShopForm: FC<FormModalProps> = ({
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
            url: CreateShopsUrl,
            payload: values,
            hasAuth: true,
            //headers: {...headers}
        })

        setLoading(false)
        if (response) {
            notification.success({
                message: "Operation Successful",
                description: "Shop Created Successfully"
            })
            onSuccessCallBack()
            form.resetFields();
        }
    }

    return (
        <Modal
            title="Add Shop"
            visible={isVisible}
            onCancel={onClose}
            footer={false}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form}>

                <Form.Item label="Shop Name" name="name"
                    rules={[{ required: true, message: "Please Input Shop Name" }]}
                >
                    <Input placeholder='Shop Name' />
                </Form.Item>

                <Form.Item>
                    <Button htmlType='submit' type='primary' block loading={loading} >Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddShopForm;