import { Form, Input, Modal, Button, notification } from 'antd'
import { FC, useEffect, useState } from 'react';
import { UpdateShopsUrl } from '../../Utils/Config';
import { axiosRequest } from '../../Utils/functions';
import { DataProps, FormModalProps, ShopProps } from '../../Utils/types';


interface UpdateShopFormProps extends FormModalProps {
    record?: any
    onRowClick?: any
    setRecord?: (record: ShopProps[]) => void
}

const UpdateShopForm: FC<UpdateShopFormProps> = ({
    isVisible = false,
    onSuccessCallBack,
    onRowClick, setRecord,
    onClose, record,
}) => {

    console.log(record)
    let newRecord = record

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (isVisible && setRecord) {
            setRecord(record)
        }
    }, [isVisible])

    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        values = { ...values, id: newRecord.id }
        console.log(values)

        const response = await axiosRequest({
            method: "put",
            url: UpdateShopsUrl + "/" + newRecord["id"],
            payload: values,
            hasAuth: true,
        })

        setLoading(false)
        if (response) {
            let x: any = response
            console.log(x.data)
            if (x.data.status === "Error") {
                notification.error({
                    message: "Operation Error",
                    description: "Shop Not Updated"
                })
            }
            if (x.data.status === "Updated") {
                notification.success({
                    message: "Operation Successful",
                    description: "Shop Updated Successfully"
                })
                onSuccessCallBack()
                form.resetFields()
                //window.location.reload()
            }
        }
    }

    return (
        <Modal
            title="Update Shop"
            visible={isVisible}
            onCancel={onClose}
            footer={false}
            maskClosable={false}

        >
            <Form layout='vertical' onFinish={onSubmit} form={form}>
                <Form.Item label={newRecord.name} name="name"
                    rules={[{ required: true, message: "Please Input Shop Name" }]}
                >
                    <Input placeholder={newRecord.name} />
                </Form.Item>

                <Form.Item label="ID" name="id"
                >
                    <Input placeholder={newRecord.id} readOnly />
                </Form.Item>

                <Form.Item>
                    <Button htmlType='submit' type='primary' block loading={loading} >Submit</Button>
                </Form.Item>
            </Form>
        </Modal >
    )
}

export default UpdateShopForm;