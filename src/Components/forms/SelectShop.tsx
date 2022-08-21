import { Modal, Button, Select, Form } from 'antd'
import { FC } from 'react';
import { DataProps, FormModalProps, ShopProps } from '../../Utils/types';

const { Option } = Select

interface SelectShopProps extends FormModalProps {
    shops: ShopProps[]
}

const SelectShop: FC<SelectShopProps> = ({
    isVisible = false,
    onSuccessCallBack,
    onClose,
    shops
}) => {

    const [form] = Form.useForm();

    const onSubmit = async (values: DataProps) => {
        onSuccessCallBack(values.shop_id)
        form.resetFields()
    }

    return (
        <Modal
            title="Select Sale Shop"
            visible={isVisible}
            onCancel={onClose}
            footer={false}
            maskClosable={false}
        >
            <Form layout='vertical' onFinish={onSubmit} form={form}>

                <Form.Item
                    label="Shop"
                    name="shop_id"
                >
                    <Select defaultValue="">
                        <Option value="">Select a Shop</Option>
                        {
                            shops.map(
                                (item, index) => <Option value={item.id} key={index}>{item.name}</Option>
                            )
                        }
                    </Select>
                </Form.Item>

                <Form.Item>
                    <Button htmlType='submit' type='primary' block >Submit</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default SelectShop;