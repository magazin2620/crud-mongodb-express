const update = document.querySelector('#update-button')
const deleteButton = document.querySelector('#delete-button')
const messageDiv = document.querySelector('#message')

update.addEventListener('click', _ => {
	fetch('/notes', {
		method: 'put',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: 'another',
			note: 'note'
		})
	})
		.then(res => {
			if (res.ok) return res.json()
		})
		.then(response => {
			window.location.reload(true)
		})
})

deleteButton.addEventListener('click', _ => {
	fetch('/notes', {
		method: 'delete',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: 'another'
		})
	})
		.then(res => {
			if (res.ok) return res.json()
		})
		.then(response => {
			if (response === 'No note to delete') {
				messageDiv.textContent = 'No another note to delete'
			} else {
				window.location.reload(true)
			}
		})
		.catch(console.error)
})