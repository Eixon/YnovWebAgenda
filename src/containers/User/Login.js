import React from "react";
import { connect } from "react-redux";
import { Input, Button, Form, notification } from "antd";
import Cookie from "js-cookie";

import api from "../lib/api";
import { userLoginSuccess } from "../store/user/actions";
import { compose } from "recompose";

class Login extends React.Component {
  openLoginNotification = error =>
    notification.error({
      message: error.message,
      description: error.description,
      style: {
        width: 600,
        marginLeft: 360 - 600
      }
    });

  submit = e => {
    e.preventDefault();

    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        try {
          const { email, password } = values;

          const response = await api.post("/auth/login", {
            email,
            password
          });

          if (
            typeof response.data.status !== "undefined" ||
            typeof response.data.statusCode !== "undefined"
          ) {
            this.openLoginNotification({
              message: "Identifiants erronés",
              description: "Identifiant et/ou mot de passe incorrects."
            });
          } else {
            Cookie.set("mobile-learning-me", response.data.access_token);
            this.props.userLoginSuccess(response.data.access_token);
          }
        } catch (e) {
          console.log(e);
        }
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      // <Page breadCrumbs={[]} menu={{ sub: null, key: null }}>
      <div className="login_container">
        <style jsx>{`
          .login {
            width: 320px;
            padding: 36px;
            box-shadow: 0 0 100px rgba(0, 0, 0, 0.08);
            background-color: white;
            justify-content: center;
            align-items: center;
            border-radius: 5px;
          }

          .login_container {
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
            background-color: #f0f2f5;
          }
        `}</style>
        <div className="login">
          <Form onSubmit={this.submit} className="login-form">
            <Form.Item>
              {getFieldDecorator("email", {
                rules: [
                  { required: true, message: "Veuillez entrer votre e-mail !" }
                ]
              })(<Input placeholder="E-mail" />)}
            </Form.Item>
            <Form.Item>
              {getFieldDecorator("password", {
                rules: [
                  {
                    required: true,
                    message: "Veuillez entrer votre mot de passe !"
                  }
                ]
              })(<Input placeholder="Mot de passe" type="password" />)}
            </Form.Item>
            <Form.Item>
              <Button
                block
                type="primary"
                htmlType="submit"
                // disabled={
                //   !validateEmail(this.state.email) ||
                //   this.state.password.length === 0
                // }
              >
                Valider
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>

      // </Page>
    );
  }
}

const enhance = compose(
  Form.create(),
  connect(
    null,
    {
      userLoginSuccess
    }
  )
);

export default enhance(Login);
