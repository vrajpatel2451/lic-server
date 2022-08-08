import { SchemaComposer } from "graphql-compose";
import { AddressMutation, AddressQuery } from "./address.resolver";
import { BranchMutation, BranchQuery } from "./branch.resolver";
import { ClientMutation, ClientQuery } from "./client.resolver";
import { CommentMutation, CommentQuery } from "./comment.resolver";
import { ContactMutation, ContactQuery } from "./contact.resolver";
import { DepartmentMutation, DepartmentQuery } from "./department.resolver";
import { DocumentClientMutation, DocumentClientQuery } from "./document.resolver";
import { TaskMutation, TaskQuery } from "./task.resolver";
import { UserMutation, UserQuery } from "./user.resolver";

const cmp = new SchemaComposer();

cmp.Query.addFields({
    ...AddressQuery,
    ...BranchQuery,
    ...ClientQuery,
    ...CommentQuery,
    ...ContactQuery,
    ...DepartmentQuery,
    ...DocumentClientQuery,
    ...TaskQuery,
    ...UserQuery,
});

cmp.Mutation.addFields({
    ...AddressMutation,
    ...BranchMutation,
    ...ClientMutation,
    ...CommentMutation,
    ...ContactMutation,
    ...DepartmentMutation,
    ...DocumentClientMutation,
    ...TaskMutation,
    ...UserMutation,
});

export const mainComposer = cmp.buildSchema();