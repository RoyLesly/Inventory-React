import { Form, Input, Modal, Button, Select, notification } from 'antd'
import { FC, useEffect, useState } from 'react';
import { UpdateShopsUrl } from '../../Utils/Config';
import { axiosRequest } from '../../Utils/functions';
import { DataProps, FormModalProps, GroupProps } from '../../Utils/types';

const { Option } = Select

interface UpdateGroupFormProps extends FormModalProps {
    groups: GroupProps[]
    record?: any
    onRowClick?: any
    setRecord?: (record: GroupProps[]) => void
}

const UpdateGroupForm: FC<UpdateGroupFormProps> = ({
    isVisible = false,
    onSuccessCallBack,
    setRecord,
    onClose, record, groups
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
                    description: "Group Not Updated"
                })
            }
            if (x.data.status === "Updated") {
                notification.success({
                    message: "Operation Successful",
                    description: "Group Updated Successfully"
                })
                onSuccessCallBack()
                form.resetFields()
            }
        }
    }

    return (
        <Modal
            title="Update Group"
            visible={isVisible}
            onCancel={onClose}
            footer={false}
            maskClosable={false}

        >
            <Form layout='vertical' onFinish={onSubmit} form={form}>

                <Form.Item label="Name" name="name"
                    rules={[{ required: true, message: "Please Input Group Name" }]}
                >
                    <Input placeholder={record.name} />
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
        </Modal >
    )
}

export default UpdateGroupForm;