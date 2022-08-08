import {BranchTC} from '../models/branch.model'

export const BranchQuery = {
    branchById: BranchTC.getResolver('findById'),
    branchByIds: BranchTC.getResolver('findByIds'),
    branchById: BranchTC.getResolver('findById'),
    branchOne: BranchTC.getResolver('findOne'),
    branchMany: BranchTC.getResolver('findMany'),
    branchCount: BranchTC.getResolver('count'),
    branchConnection: BranchTC.getResolver('connection'),
    branchPagination: BranchTC.getResolver('pagination'),
};

export const BranchMutation = {
    branchCreateOne: BranchTC.getResolver('createOne'),
    branchCreateMany: BranchTC.getResolver('createMany'),
    branchUpdateById: BranchTC.getResolver('updateById'),
    branchUpdateOne: BranchTC.getResolver('updateOne'),
    branchUpdateMany: BranchTC.getResolver('updateMany'),
    branchRemoveById: BranchTC.getResolver('removeById'),
    branchRemoveOne: BranchTC.getResolver('removeOne'),
    branchRemoveMany: BranchTC.getResolver('removeMany'),
    // fakeData: BranchTC.getResolver('Branch'),
};
