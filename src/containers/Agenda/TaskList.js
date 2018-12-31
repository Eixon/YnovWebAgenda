import React from "react";
import { Button } from "antd";

export default class TaskList extends React.Component {
  state = {
    refreshing: false
  };

  remove = task => {
    this.props.removeTask(task);

    // Méthode malgache pour re-render après le connect
    this.setState({
      refreshing: !this.state.refreshing
    });
  };

  render() {
    return (
      <div>
        {this.props.tasks.map((task, index) => {
          return (
            <div key={index} className="task">
              <h2>{task.title}</h2>

              <h4>{task.date}</h4>
              <h5>
                {task.startHour} - {task.endHour}
              </h5>
              <Button onClick={() => this.remove(task)}>Retirer</Button>
            </div>
          );
        })}
      </div>
    );
  }
}
