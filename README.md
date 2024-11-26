Backend:-
git clone https://github.com/Nihad-Abdulla/Drizzle-Hono
cd backend 
npm run dev


API Documentation
Create a Task:-
POST  http://localhost:3000/tasks
Remove Task:-
DELETE  http://localhost:3000/tasks
Edit Task:-
PUT  http://localhost:3000/tasks/id
All Task:-
GET  http://localhost:3000/tasks


Create a Tag:-
POST  http://localhost:3000/tag
Remove Tag:- 
DELETE  http://localhost:3000/tag
Edit Tag:-
PUT  http://localhost:3000/tag/id
All Tag:-
GET  http://localhost:3000/tag


Assign Tag to Task
POST http://localhost:3000/task-tags/:taskId/tag/:tagId
Delete
DELETE http://localhost:3000/task-tags//:taskId/tag/:tagId
GET ALL
GET http://localhost:3000/task-tags//tag/:tagId/tasks
