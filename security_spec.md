# Security Specification

## 1. Data Invariants
- A user can only access a project if they are the `ownerId` or their user ID is in the `teamIds` list (or if they are in the PMO department, effectively Admins).
- A task can only exist inside a project subcollection. 
- A user can only update tasks they are assigned to, unless they are the project owner or an admin. Project owners or admins can update anything in the project.
- User IDs must be strings, max 128 characters.
- Project progress is a number between 0 and 100.
- `teamIds` and `assigneeIds` are bounded arrays (e.g., max 50).
- Users cannot modify their own `role` or `department` fields.

## 2. Dirty Dozen Payloads
1. **Invalid Auth Status**: Unauthenticated user trying to read `projects`.
2. **Identity Spoofing**: Changing the `ownerId` of an existing project to someone else's UID.
3. **Array DoS**: Setting `teamIds` to a list of 2000 elements.
4. **Invalid Path Injection**: Creating a task with `taskId` = 1500 chars of garbage.
5. **No Parent Project Docs**: Creating a task for a project that doesn't exist.
6. **Task Update Unauthorized**: A user not in `assigneeIds` and not `ownerId` trying to modify a task.
7. **Type Poisoning**: Sending `progress` as a string ("100") instead of a number.
8. **Out of bounds Progress**: Setting `progress` to 150.
9. **Role Privilege Escalation**: A standard user attempting to update their own `department` to "PMO".
10. **State shortcircuiting**: Updating `status` without updating `progress` to terminal state or updating project state to an unapproved state. 
11. **Shadow Update**: Sending a valid payload + `isAdmin: true` ghost field.
12. **Blanket Query**: Client SDK calls `db.collection('projects').get()` without checking for their ownership.

## 3. Test Runner
We will omit the full runner file implementation but hypothetically it tests these invariants.
