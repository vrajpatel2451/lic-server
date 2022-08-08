import {TaskTC} from '../models/task.model'

export const TaskQuery = {
    taskById: TaskTC.getResolver('findById'),
    taskByIds: TaskTC.getResolver('findByIds'),
    taskById: TaskTC.getResolver('findById'),
    taskOne: TaskTC.getResolver('findOne'),
    taskMany: TaskTC.getResolver('findMany'),
    taskCount: TaskTC.getResolver('count'),
    taskConnection: TaskTC.getResolver('connection'),
    taskPagination: TaskTC.getResolver('pagination'),
};

export const TaskMutation = {
    taskCreateOne: TaskTC.getResolver('createOne'),
    taskCreateMany: TaskTC.getResolver('createMany'),
    taskUpdateById: TaskTC.getResolver('updateById'),
    taskUpdateOne: TaskTC.getResolver('updateOne'),
    taskUpdateMany: TaskTC.getResolver('updateMany'),
    taskRemoveById: TaskTC.getResolver('removeById'),
    taskRemoveOne: TaskTC.getResolver('removeOne'),
    taskRemoveMany: TaskTC.getResolver('removeMany'),
    // fakeData: TaskTC.getResolver('Task'),
};
