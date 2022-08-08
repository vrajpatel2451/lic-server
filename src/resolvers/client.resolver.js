import {ClientTC} from '../models/client.model'

export const ClientQuery = {
    clientById: ClientTC.getResolver('findById'),
    clientByIds: ClientTC.getResolver('findByIds'),
    clientById: ClientTC.getResolver('findById'),
    clientOne: ClientTC.getResolver('findOne'),
    clientMany: ClientTC.getResolver('findMany'),
    clientCount: ClientTC.getResolver('count'),
    clientConnection: ClientTC.getResolver('connection'),
    clientPagination: ClientTC.getResolver('pagination'),
};

export const ClientMutation = {
    clientCreateOne: ClientTC.getResolver('createOne'),
    clientCreateMany: ClientTC.getResolver('createMany'),
    clientUpdateById: ClientTC.getResolver('updateById'),
    clientUpdateOne: ClientTC.getResolver('updateOne'),
    clientUpdateMany: ClientTC.getResolver('updateMany'),
    clientRemoveById: ClientTC.getResolver('removeById'),
    clientRemoveOne: ClientTC.getResolver('removeOne'),
    clientRemoveMany: ClientTC.getResolver('removeMany'),
    // fakeData: ClientTC.getResolver('Client'),
};
