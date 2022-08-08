import {DocumentClientTC} from '../models/document.model'

export const DocumentClientQuery = {
    DocumentClientById: DocumentClientTC.getResolver('findById'),
    DocumentClientByIds: DocumentClientTC.getResolver('findByIds'),
    DocumentClientById: DocumentClientTC.getResolver('findById'),
    DocumentClientOne: DocumentClientTC.getResolver('findOne'),
    DocumentClientMany: DocumentClientTC.getResolver('findMany'),
    DocumentClientCount: DocumentClientTC.getResolver('count'),
    DocumentClientConnection: DocumentClientTC.getResolver('connection'),
    DocumentClientPagination: DocumentClientTC.getResolver('pagination'),
};

export const DocumentClientMutation = {
    DocumentClientCreateOne: DocumentClientTC.getResolver('createOne'),
    DocumentClientCreateMany: DocumentClientTC.getResolver('createMany'),
    DocumentClientUpdateById: DocumentClientTC.getResolver('updateById'),
    DocumentClientUpdateOne: DocumentClientTC.getResolver('updateOne'),
    DocumentClientUpdateMany: DocumentClientTC.getResolver('updateMany'),
    DocumentClientRemoveById: DocumentClientTC.getResolver('removeById'),
    DocumentClientRemoveOne: DocumentClientTC.getResolver('removeOne'),
    DocumentClientRemoveMany: DocumentClientTC.getResolver('removeMany'),
    // fakeData: DocumentClientTC.getResolver('DocumentClient'),
};
