import {AddressTC} from '../models/address.model'

export const AddressQuery = {
    addressById: AddressTC.getResolver('findById'),
    addressByIds: AddressTC.getResolver('findByIds'),
    addressById: AddressTC.getResolver('findById'),
    addressOne: AddressTC.getResolver('findOne'),
    addressMany: AddressTC.getResolver('findMany'),
    addressCount: AddressTC.getResolver('count'),
    addressConnection: AddressTC.getResolver('connection'),
    addressPagination: AddressTC.getResolver('pagination'),
};

export const AddressMutation = {
    addressCreateOne: AddressTC.getResolver('createOne'),
    addressCreateMany: AddressTC.getResolver('createMany'),
    addressUpdateById: AddressTC.getResolver('updateById'),
    addressUpdateOne: AddressTC.getResolver('updateOne'),
    addressUpdateMany: AddressTC.getResolver('updateMany'),
    addressRemoveById: AddressTC.getResolver('removeById'),
    addressRemoveOne: AddressTC.getResolver('removeOne'),
    addressRemoveMany: AddressTC.getResolver('removeMany'),
    // fakeData: AddressTC.getResolver('Address'),
};
