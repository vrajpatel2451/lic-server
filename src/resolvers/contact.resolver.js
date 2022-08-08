import {ContactTC} from '../models/contact.model'

export const ContactQuery = {
    contactById: ContactTC.getResolver('findById'),
    contactByIds: ContactTC.getResolver('findByIds'),
    contactById: ContactTC.getResolver('findById'),
    contactOne: ContactTC.getResolver('findOne'),
    contactMany: ContactTC.getResolver('findMany'),
    contactCount: ContactTC.getResolver('count'),
    contactConnection: ContactTC.getResolver('connection'),
    contactPagination: ContactTC.getResolver('pagination'),
};

export const ContactMutation = {
    contactCreateOne: ContactTC.getResolver('createOne'),
    contactCreateMany: ContactTC.getResolver('createMany'),
    contactUpdateById: ContactTC.getResolver('updateById'),
    contactUpdateOne: ContactTC.getResolver('updateOne'),
    contactUpdateMany: ContactTC.getResolver('updateMany'),
    contactRemoveById: ContactTC.getResolver('removeById'),
    contactRemoveOne: ContactTC.getResolver('removeOne'),
    contactRemoveMany: ContactTC.getResolver('removeMany'),
    // fakeData: ContactTC.getResolver('Contact'),
};
