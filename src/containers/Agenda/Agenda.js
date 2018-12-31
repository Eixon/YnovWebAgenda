import React from "react";
import { Calendar } from "antd";
import { connect } from "react-redux";

import PlanModal from "./PlanModal";
import TaskList from "./TaskList";
import { getAgenda } from "../../store/agenda/selectors";
import { removeTask } from "../../store/agenda/actions";

import "./Agenda.css";

class Agenda extends React.Component {
  state = {
    value: null,
    modalVisible: false
  };

  onSelect = value => {
    this.setState({
      value: value,
      modalVisible: true
    });
  };

  closeModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    const { value } = this.state;
    return (
      <React.Fragment>
        <Calendar value={value} onSelect={this.onSelect} />
        <PlanModal
          modalVisible={this.state.modalVisible}
          value={this.state.value}
          closeModal={this.closeModal}
        />
        <TaskList tasks={this.props.tasks} removeTask={this.props.removeTask} />
      </React.Fragment>
    );
  }
}

export default connect(
  state => ({
    tasks: getAgenda(state)
  }),
  {
    removeTask
  }
)(Agenda);
