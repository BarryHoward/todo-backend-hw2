'use strict'

const Task = use("App/Model/Task")

class TaskController {

	* create(request, response){
		let data = request.only('title', 'todo_list_id', 'due_date')
		let dueDate = new Date(data.due_date)
		data.due_date = dueDate

    	let task = yield Task.create(data)
    	response.status(201).json(task)
	}

	* delete(request, response){
		let userId = request.param('id')
		let task = yield Task.findBy('id', userId)
		yield task.delete()
		response.status(201).json(task)
	}

	* update(request, response){
		let userId = request.param('id')
		let task = yield Task.findBy('id', userId)
		let data = request.only('title', 'todo_list_id', 'due_date', 'done')
		let dueDate = new Date(data.due_date)
		data.due_date = dueDate

		task.fill(data)

		yield task.save()
		response.status(201).json(task)
	}

	* index(request, response){
		let listId = request.param('id')
    	let tasks = yield Task.query().where('todo_list_id', listId)
    	console.log(listId, tasks)

    	response.json(tasks)
	}

}

module.exports = TaskController
