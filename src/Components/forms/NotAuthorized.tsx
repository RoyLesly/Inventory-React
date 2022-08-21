import { Modal, Button } from 'antd'
import { FC } from 'react';
import { DataProps } from '../../Utils/types';


const NotAuthorized: FC<DataProps> = ({
    isVisible = false,
    onClose,
}) => {

    return (
        <Modal
            title="Permission Denied !!!"
            visible={isVisible}
            onCancel={onClose}
            footer={false}
            maskClosable={false}
        >
            <h2>NOT AUTHORISED</h2>
            <h4>Please Contact Admin</h4>

        </Modal>
    )
}

export default NotAuthorized;