import { Form, Modal, Button, notification } from 'antd'
import { ChangeEvent, FC, useState } from 'react';
import { InventoryCSVUrl } from '../../Utils/Config';
import { axiosRequest } from '../../Utils/functions';
import { DataProps, FormModalProps } from '../../Utils/types';


const AddInventoryFormCSV: FC<FormModalProps> = ({
    isVisible = false,
    onSuccessCallBack,
    onClose,
}) => {

    const [form] = Form.useForm();

    const [file, setFile] = useState(false)

    const [loading, setLoading] = useState(false)

    const [csvFile, setCsvFile] = useState<File | null>(null)

    const onSubmit = async (values: DataProps) => {
        console.log(values)
        setLoading(true)

        if (!csvFile) return

        const formItem = new FormData()
        formItem.append("data", csvFile)

        const response = await axiosRequest({
            method: "post",
            url: InventoryCSVUrl,
            payload: formItem,
            hasAuth: true,
            
        })

        setLoading(false)
        if (response) {
            console.log(response)
            notification.success({
                message: "Operation Successful",
                description: "Inventory Items Added Successfully"
            })
            onSuccessCallBack()
            form.resetFields();
        }
    }

    const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setCsvFile(e.target.files[0])
            console.log(csvFile)
            setFile(true)
        }
        
    }

    return (
        <Modal
            title="Add Inventory Items (CSV)"
            visible={isVisible}
            onCancel={onClose}
            footer={false}
            maskClosable={false}
        // closable={false}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form}>

                <Form.Item
                    label="Select File (CSV)"
                    rules={[{
                        required: true,
                        message: "Please Select a CSV File"
                    }]}
                >
                    <input
                        type="file"
                        //accept=".csv, .xlsx"
                        accept=".csv"
                        onChange={handleFileChange}
                    />
                </Form.Item>

                <a href="/inventory_sample.csv" download>Click Here To Download Sample File</a>
                <div className="helperNote" style={{ color: "red" }}>
                    <code>Do Not Include The header Labels. They are Just For reference</code>
                </div>

                <hr />
                <br />

                <Form.Item>
                    <Button htmlType='submit' type='primary' block loading={loading} >Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddInventoryFormCSV;