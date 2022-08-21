import { Modal, Button, notification } from 'antd'
import { FC, useState } from 'react';
import { DeleteGroupUrl } from '../../Utils/Config';
import { axiosRequest } from '../../Utils/functions';
import { DataProps, FormModalProps } from '../../Utils/types';

interface DeleteShopFormProps extends FormModalProps {
    record?: any
}

const DeleteShopForm: FC<DeleteShopFormProps> = ({
    isVisible = false,
    onSuccessCallBack,
    onClose,
    record
}) => {

    const [loading, setLoading] = useState(false)

    const [file, setFile] = useState(false)

    const onDelete = async (values: DataProps) => {
        setLoading(true)

        console.log(record.id)

        const response = await axiosRequest({
            method: "delete",
            url: DeleteGroupUrl + "/" + record["id"],
            hasAuth: true,
            file: file
        })

        setLoading(false)
        if (response) {
            console.log(response)
            notification.success({
                message: "Operation Successful",
                description: "Shop Deleted Successfully"
            })
            onSuccessCallBack()
            window.location.reload()
        }
    }

    return (
        <Modal
            title="Delete Group"
            visible={isVisible}
            onCancel={onClose}
            footer={false}
            maskClosable={false}
        >
            <div>
                <h2>Do You Want To Delete Group?</h2>
                <h2><b>Name:</b> <i>{record.name}</i></h2>
                <h3><b>Code:</b> <code><i>{record.code}</i></code></h3>
                <h3><b>ID:</b> {record.id}</h3>
            </div>

            <div>
                <Button
                    htmlType='submit'
                    type='primary'
                    loading={loading}
                    onClick={onDelete}
                >
                    Delete
                </Button>

                <Button
                    htmlType='submit'
                    type='default'
                    loading={loading}
                    onClick={onClose}
                >
                    Cancel
                </Button>
            </div>
        </Modal>
    )
}

export default DeleteShopForm;