import {UserTC} from '../models/user.model'

export const UserQuery = {
    UserById: UserTC.getResolver('findById'),
    UserByIds: UserTC.getResolver('findByIds'),
    UserById: UserTC.getResolver('findById'),
    UserOne: UserTC.getResolver('findOne'),
    UserMany: UserTC.getResolver('findMany'),
    UserCount: UserTC.getResolver('count'),
    UserConnection: UserTC.getResolver('connection'),
    UserPagination: UserTC.getResolver('pagination'),
};

export const UserMutation = {
    UserCreateOne: UserTC.getResolver('createOne'),
    UserCreateMany: UserTC.getResolver('createMany'),
    UserUpdateById: UserTC.getResolver('updateById'),
    UserUpdateOne: UserTC.getResolver('updateOne'),
    UserUpdateMany: UserTC.getResolver('updateMany'),
    UserRemoveById: UserTC.getResolver('removeById'),
    UserRemoveOne: UserTC.getResolver('removeOne'),
    UserRemoveMany: UserTC.getResolver('removeMany'),
    // fakeData: UserTC.getResolver('User'),
};
