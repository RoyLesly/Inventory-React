import { FC } from 'react';
import { Button, Form, Input } from 'antd';
import { Link } from 'react-router-dom';
import { DataProps } from '../Utils/types';


interface AuthComponentProps {
    titleText: string
    buttonText: string
    isLogin?: boolean
    isCheckUser?: boolean
    linkPath: string
    linkName: string
    onSubmit: (values: DataProps) => void
    loading?: boolean
    isUpdatePassword?: boolean
}

const AuthComponent: FC<AuthComponentProps> = ({
    titleText, buttonText, linkPath, linkName,
    isLogin, isCheckUser, onSubmit, loading, isUpdatePassword,
}) => {

    return <div className='login'>
        <div className='inner'>
            <div className='header'>
                <h3>{titleText}</h3>
                <h2>INVENTORY</h2>
            </div>


            <Form layout='vertical' onFinish={onSubmit}>

                {!isUpdatePassword && <Form.Item
                    label="USERNAME"
                    name="first_name"
                    rules={[{ required: true, message: "Please Insert Username or First Name!" }]}
                >
                    <Input placeholder='Username or First Name' type="first_name" />
                </Form.Item>}

                {isLogin && <Form.Item
                    label="PASSWORD"
                    name="password"
                    rules={[{ required: true, message: "Please Insert Password !" }]}
                >
                    <Input placeholder='Password' type="password" />
                </Form.Item>}

                {isUpdatePassword && <Form.Item
                    label="CONFIRM PASSWORD"
                    name="confirm_password"
                    rules={[{ required: true, message: "Please Insert Password Confirmation!" }]}
                >
                    <Input placeholder='Confirm Password' type="password" />
                </Form.Item>}

                <Form.Item>
                    <Button htmlType='submit' type='primary' block loading={loading}>{buttonText}</Button>
                </Form.Item>

            </Form>

            <Link to={linkPath}>{linkName}</Link>

        </div>
    </div>
}

export default AuthComponent;