import {CommentTC} from '../models/comment.model'

export const CommentQuery = {
    commentById: CommentTC.getResolver('findById'),
    commentByIds: CommentTC.getResolver('findByIds'),
    commentById: CommentTC.getResolver('findById'),
    commentOne: CommentTC.getResolver('findOne'),
    commentMany: CommentTC.getResolver('findMany'),
    commentCount: CommentTC.getResolver('count'),
    commentConnection: CommentTC.getResolver('connection'),
    commentPagination: CommentTC.getResolver('pagination'),
};

export const CommentMutation = {
    commentCreateOne: CommentTC.getResolver('createOne'),
    commentCreateMany: CommentTC.getResolver('createMany'),
    commentUpdateById: CommentTC.getResolver('updateById'),
    commentUpdateOne: CommentTC.getResolver('updateOne'),
    commentUpdateMany: CommentTC.getResolver('updateMany'),
    commentRemoveById: CommentTC.getResolver('removeById'),
    commentRemoveOne: CommentTC.getResolver('removeOne'),
    commentRemoveMany: CommentTC.getResolver('removeMany'),
    // fakeData: CommentTC.getResolver('Comment'),
};