import { Form, Input, Modal, Button, Select, notification } from 'antd'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { UpdateInventoryUrl, UploadImageUrl } from '../../Utils/Config';
import { axiosRequest } from '../../Utils/functions';
import { DataProps, FormModalProps, GroupProps, InventoryProps } from '../../Utils/types';

const { Option } = Select

interface UpdateInventoryFormProps extends FormModalProps {
    groups: GroupProps[]
    record?: any
    onRowClick?: any
    setRecord?: (record: InventoryProps[]) => void
}

const UpdateInventoryForm: FC<UpdateInventoryFormProps> = ({
    isVisible = false,
    onSuccessCallBack,
    setRecord,
    onClose, groups, record,
}) => {

    console.log(record)

    const [form] = Form.useForm();

    const [groupID, setGroupID] = useState('')

    const [loading, setLoading] = useState(false)

    const [errors, setErrors] = useState({
        photo_url: "",
    })

    const [imageUrl, setImageUrl] = useState<string | null>()

    const [photo_url, setPhotoUrl] = useState<unknown>("")

    const [file, setFile] = useState(false)

    const fileSelect = useRef<HTMLInputElement>(null)


    const handleImageChange = (e: any) => {
        let photo = e.target.files[0];
        setPhotoUrl(photo);
        setFile(true)
    }

    useEffect(() => {
        console.log(photo_url)
        if (photo_url) {
            setPhotoUrl(photo_url)
            notification.success({
                message: "Operation Info",
                description: "Photo Selected"
            })
        } else {
            console.log("PHOTO NOT SELECTED")
        }
        if (isVisible && setRecord) {
            setGroupID(record.group.id)
        }

    }, [photo_url, isVisible, groupID])

    const onSubmit = async (values: DataProps) => {
        setLoading(true)
        if (photo_url) {
            values = { ...values, photo: photo_url }//, group_id: groupID }
        } else {
            values = { ...values } //, group_id: groupID }
        }
        if (!values['group_id']) {
            values = { ...values, group_id: record.group.id }
        } else {
            console.log("Group Id OK")
        }
        console.log(values)

        const response = await axiosRequest({
            method: "put",
            url: UpdateInventoryUrl + "/" + values["id"],
            payload: values,
            hasAuth: true,
            file: file
        })

        setLoading(false)
        if (response) {
            let x: any = response
            console.log(x.data)
            if (x.data.status === "Error") {
                notification.error({
                    message: "Operation Error",
                    description: "InventoryItem Not Updated"
                })
            }
            if (x.data.status === "Updated") {
                notification.success({
                    message: "Operation Successful",
                    description: "InventoryItem Updated Successfully"
                })
                onSuccessCallBack()
                setImageUrl(null);
                form.resetFields()
            }
        }
    }

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            console.log("file", e.target.files[0])
            const formItem = new FormData()
            formItem.append("file", e.target.files[0])

            setLoading(true)

            const response = await axiosRequest<{ url: string }>({
                method: "post",
                url: UploadImageUrl,
                payload: formItem,
            })
            setLoading(false)

            if (response) {
                setImageUrl(response.data.url)
            }
        }
    }

    return (
        <Modal
            title="Update Inventory"
            visible={isVisible}
            onCancel={onClose}
            footer={false}
            maskClosable={false}

        >
            <Form layout='vertical' onFinish={onSubmit} form={form}>

                <Form.Item
                    label="Item Photo"
                >
                    <div
                        className='imageView'
                        onClick={() => !loading && fileSelect.current?.click()}
                        style={{
                            backgroundImage: `url(${record.photo})`
                        }}
                    />
                    <input type="file" style={{ display: "none" }}
                        accept="image/jpeg,image/jpg,image/png,image/*"
                        ref={fileSelect}
                        onChange={(e) => { handleImageChange(e) }}
                    />
                </Form.Item>

                <Form.Item label="Inventory Name" name="name" initialValue={record.name}
                    rules={[{ required: true, message: "Update Inventory Name!" }]}
                >
                    <Input
                        placeholder={record.name}
                    />
                </Form.Item>

                <Form.Item label="Count" name="total" initialValue={record.remaining}
                    rules={[{ required: true, message: "Please Input Item Count!" }]}
                >
                    <Input placeholder={record.remaining} type='number' min={1} />
                </Form.Item>

                <Form.Item label="Price (F CFA)" name="price" initialValue={record.price}
                    rules={[{ required: true, message: "Please Provide Item Individual Price!" }]}
                >
                    <Input placeholder={record.price} type='number' min={10} />
                </Form.Item>

                <Form.Item label="ID" name="id" initialValue={record.id}
                    rules={[{ required: true, message: "Please" }]}
                //hidden
                >
                    <Input placeholder={record.id} type='number' readOnly />
                </Form.Item>

                <Form.Item label="Group / Category" name="group_id">
                    <Select defaultValue={isVisible ? record.group.id : ""}>
                        <Option value={isVisible ? record.group.id : ""}>{isVisible ? record.group.id : "none"}</Option>
                        {
                            groups.map(
                                (item, index) => <Option value={item.id} key={index}>{item.name}</Option>
                            )
                        }
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button htmlType='submit' type='primary' block loading={loading} >Update</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default UpdateInventoryForm;