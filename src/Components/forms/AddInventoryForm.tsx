import { Form, Input, Modal, Button, Select, notification } from 'antd'
import { ChangeEvent, FC, useEffect, useRef, useState } from 'react';
import { CreateGroupUrl, CreateInventoryUrl, UploadImageUrl } from '../../Utils/Config';
import { axiosRequest } from '../../Utils/functions';
import { DataProps, FormModalProps, GroupProps } from '../../Utils/types';
import SvgFemaleCompUser from '../../assets/SvgFemaleCompUser.svg'

const { Option } = Select

interface AddInventoryFormProps extends FormModalProps {
    groups: GroupProps[]
}

const AddInventoryForm: FC<AddInventoryFormProps> = ({
    isVisible = false,
    onSuccessCallBack,
    onClose,
    groups
}) => {

    const [form] = Form.useForm();

    const [loading, setLoading] = useState(false)

    const [errors, setErrors] = useState({
        photo_url: "",
    })

    const [imageLoading, setImageLoading] = useState(false)

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
        if (photo_url) {
            notification.success({
                message: "Operation Info",
                description: "Photo Selected"
            })
        } else {
            console.log("PHOTO NOT SELECTED")
        }
    }, [photo_url])

    const onSubmit = async (values: DataProps) => {
        setLoading(true)

        if (photo_url) {
            console.log(photo_url)
            values = { ...values, photo: photo_url }
        }

        console.log(values)

        const response = await axiosRequest({
            method: "post",
            url: CreateInventoryUrl,
            payload: values,
            hasAuth: true,
            file: file
        })

        setLoading(false)
        if (response) {
            console.log(response)
            notification.success({
                message: "Operation Successful",
                description: "InventoryItem Created Successfully"
            })
            onSuccessCallBack()
            form.resetFields();
            setImageUrl(null);
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
                console.log(response.data.url)
                setImageUrl(response.data.url)
                console.log({ response })

            }
        }
    }

    return (
        <Modal
            title="Add Inventory"
            visible={isVisible}
            onCancel={onClose}
            footer={false}
            maskClosable={false}
        // closable={false}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form}>

                <Form.Item
                    label="Item Photo"
                >
                    <div
                        className='imageView'
                        onClick={() => !loading && fileSelect.current?.click()}
                        style={{
                            backgroundImage: `url(${imageUrl ? imageUrl : SvgFemaleCompUser})`
                        }}
                    />
                    <input type="file" style={{ display: "none" }}
                        accept="image/jpeg,image/jpg,image/png,image/gif"
                        ref={fileSelect}
                        onChange={(e) => { handleImageChange(e) }}
                    />
                </Form.Item>

                <Form.Item label="Inventory Name" name="name"
                    rules={[{ required: true, message: "Please Input Inventory Name!" }]}
                >
                    <Input
                        placeholder='Inventory Name'
                    />
                </Form.Item>

                <Form.Item label="Count" name="total"
                    rules={[{ required: true, message: "Please Input Item Count!" }]}
                >
                    <Input placeholder='Item Count ' type='number' min={1} />
                </Form.Item>

                <Form.Item label="Price (F CFA)" name="price"
                    rules={[{ required: true, message: "Please Provide Item Individual Price!" }]}
                >
                    <Input placeholder='Item Count ' type='number' min={10} />
                </Form.Item>

                <Form.Item label="Group / Category" name="group_id">
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

export default AddInventoryForm;