import React from "react";
import { connect } from "react-redux";
import { compose } from "recompose";
import { Modal, Form, Input, TimePicker } from "antd";
import PropTypes from "prop-types";
import { addTask } from "../../store/agenda/actions";

class PlanModal extends React.Component {
  // Facultatif. Agit comme une "interface" en donnant les props qu'il faut passer au composant (et les rendre obligatoire si on ajout "isRequired")
  static propTypes = {
    modalVisible: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired
  };

  state = {
    title: "",
    startHour: null,
    endHour: null
  };

  onSubmit = e => {
    e.preventDefault();

    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.addTask(
          Object.assign({}, this.state, {
            date: this.props.value.format("DD/MM/YYYY")
          })
        );

        this.props.closeModal();
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { modalVisible, closeModal } = this.props;
    return (
      <Modal onOk={this.onSubmit} visible={modalVisible} onCancel={closeModal}>
        <Form>
          <Form.Item label="Titre">
            {getFieldDecorator("title", {
              rules: [
                {
                  required: true,
                  message: "Veuillez entrer le titre."
                }
              ]
            })(
              <Input
                onChange={event =>
                  this.setState({
                    title: event.target.value
                  })
                }
              />
            )}
          </Form.Item>
          <Form.Item label="Heure de début">
            {getFieldDecorator("start-hour", {
              rules: [
                {
                  required: true,
                  message: "Veuillez sélectionner l'heure de début."
                }
              ]
            })(
              <TimePicker
                style={{ width: "100%" }}
                onChange={startHour =>
                  this.setState({
                    startHour: startHour.format("HH:mm")
                  })
                }
              />
            )}
          </Form.Item>
          <Form.Item label="heure de fin">
            {getFieldDecorator("end-hour", {
              rules: [
                {
                  required: true,
                  message: "Veuillez sélectionner l'heure de fin."
                }
              ]
            })(
              <TimePicker
                style={{ width: "100%" }}
                onChange={endHour =>
                  this.setState({
                    endHour: endHour.format("HH:mm")
                  })
                }
              />
            )}
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}

// Le create de Form agit comme un HOC (https://reactjs.org/docs/higher-order-components.html) sur la classe pour lui passer de nouvelles props
const enhance = compose(
  Form.create(),
  connect(
    null,
    {
      addTask
    }
  )
);

export default enhance(PlanModal);
