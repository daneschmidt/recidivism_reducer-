import _ from 'lodash';
import React from 'react';
import { connect } from 'react-redux';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from '../ProgressionList/ProgressionList';
import { moveTask } from '../../../redux/reducers/actions';
import AddTask from '../Task/AddTask';
import mapStoreToProps from '../../../redux/mapStoreToProps';
import CreateNew from '../../CreateNewCompetition/CreateNewCompetition';

import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

class ProgressionTracker extends React.Component {
  constructor(props) {
    super(props);

    this.onDragEnd = this.onDragEnd.bind(this);
  }

  getTasks(list, tasks) {
    // return _.map(list.tasks, taskId => tasks[taskId]);
    let tasksArr = [];
    for (let item in tasks) {
      tasksArr.push(tasks[item]);
    }
    if (list.tasks.length <= 0) {
      return [];
    }
    return tasksArr.filter(task => list.tasks.includes(task.id));
  }

  onDragEnd({ source, destination, draggableId }) {
    // dropped outside the list
    if (!destination) {
      return;
    }

    if (source.droppableId !== destination.droppableId) {
      this.props.moveTask(
        source.droppableId,
        destination.droppableId,
        draggableId
      );
    }
  }

  render() {
    const lists = this.props.store.progress.lists;
    const tasks = this.props.store.progress.tasks;

    return (
      <div>
        <Card style={{ backgroundColor: 'steelblue' }}>
          <h2 style={{ margin: '10px', display: 'inline-block' }}>
            Competition Progression Tracker
          </h2>
          <span style={{ margin: '10px', display: 'inline-block' }}>
            <AddTask />
          </span>
          <span style={{ margin: '10px', display: 'inline-block' }}>
            <CreateNew />
          </span>
          <Grid container spacing={3}>
            <DragDropContext onDragEnd={this.onDragEnd}>
              {Object.keys(lists).map((key, index) => {
                let item = lists[key];
                return (
                  <Droppable droppableId={item.id} key={index}>
                    {(provided, snapshot) => (
                      <Grid item xs={2}>
                        <Paper style={{ margin: '10px', padding: '10px' }}>
                          <List
                            style={{ flex: '1' }}
                            list={item}
                            tasks={this.getTasks(item, tasks)}
                            innerRef={provided.innerRef}
                            provided={provided}
                          />
                        </Paper>
                      </Grid>
                    )}
                  </Droppable>
                );
              })}
            </DragDropContext>
          </Grid>
        </Card>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  moveTask: (fromListId, toListId, id) =>
    dispatch(moveTask(fromListId, toListId, id))
});

export default connect(mapStoreToProps, mapDispatchToProps)(ProgressionTracker);
